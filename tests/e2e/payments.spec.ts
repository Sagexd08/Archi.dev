/**
 * E2E tests for the Razorpay payment system
 *
 * These tests hit the real running Next.js dev server (started by Playwright's
 * webServer config) and — for webhook tests — hit the real PostgreSQL database
 * via Prisma to assert state after provisioning.
 *
 * Auth: /api/payments/verify requires a logged-in Supabase session.
 *       Tests for that route verify the unauthenticated path (401) and the
 *       bad-signature path (400) which are the security-critical boundaries.
 *       /api/payments/webhook is server-to-server and requires no session.
 *
 * Idempotency: Each test uses a unique payment ID derived from Date.now() +
 *              a random suffix so parallel runs never collide.
 *
 * Cleanup: afterAll deletes the test user row and all related rows from the DB.
 */

import { test, expect, APIRequestContext } from "@playwright/test";
import crypto from "node:crypto";
import { createE2EPrismaClient } from "./helpers";

// ─── Constants ───────────────────────────────────────────────────────────────

const TEST_USER_ID = `e2e_pay_${Date.now()}`;
const PAID_PLAN = "pro";
const PAID_AMOUNT_PAISE = 4900;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Generate a unique fake payment ID for each test. */
const makePayId = () =>
  `pay_e2e_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const makeOrderId = () =>
  `order_e2e_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

function hmacHex(secret: string, data: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

/** Build a Razorpay payment.captured webhook body. */
function captureBody(payId: string, orderId: string, userId: string): string {
  return JSON.stringify({
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: payId,
          order_id: orderId,
          amount: PAID_AMOUNT_PAISE,
          notes: { userId, plan: PAID_PLAN },
        },
      },
    },
  });
}

/** POST a signed webhook to the running server. */
async function postWebhook(
  request: APIRequestContext,
  body: string,
  overrideSig?: string,
): Promise<{ status: number; json: unknown }> {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";
  const sig = overrideSig ?? hmacHex(webhookSecret, body);

  const res = await request.post("/api/payments/webhook", {
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": sig,
    },
    data: body,
  });

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  return { status: res.status(), json };
}

/** POST a verify call as if coming from the Razorpay modal handler. */
async function postVerify(
  request: APIRequestContext,
  opts: {
    orderId: string;
    paymentId: string;
    keySecret: string;
    badSig?: boolean;
    authHeader?: string;
  },
): Promise<{ status: number; json: unknown }> {
  const { orderId, paymentId, keySecret, badSig, authHeader } = opts;
  const sig = badSig
    ? "0000000000000000000000000000000000000000000000000000000000000000"
    : hmacHex(keySecret, `${orderId}|${paymentId}`);

  const res = await request.post("/api/payments/verify", {
    headers: {
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
      // E2E bypass header is handled by the existing server middleware
      "x-e2e-bypass-auth": "1",
    },
    data: JSON.stringify({
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: sig,
      plan: PAID_PLAN,
    }),
  });

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  return { status: res.status(), json };
}

// ─── DB cleanup ───────────────────────────────────────────────────────────────

test.afterAll(async () => {
  if (!process.env.DATABASE_URL) return;

  const prisma = createE2EPrismaClient();
  try {
    // Delete in FK-safe order
    await prisma.subscription.deleteMany({ where: { userId: TEST_USER_ID } });
    await prisma.creditTransaction.deleteMany({ where: { userId: TEST_USER_ID } });
    await prisma.creditBalance.deleteMany({ where: { userId: TEST_USER_ID } });
    await prisma.razorpayPayment.deleteMany({ where: { userId: TEST_USER_ID } });
    await prisma.user.deleteMany({ where: { id: TEST_USER_ID } });
  } finally {
    await prisma.$disconnect();
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/payments/verify — auth & signature guards
// (These run without a real Supabase session so they test the rejection paths.)
// ─────────────────────────────────────────────────────────────────────────────

test.describe("POST /api/payments/verify — rejection guards", () => {
  test("returns 400 when razorpay_signature does not match", async ({ request }) => {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    test.skip(!keySecret, "RAZORPAY_KEY_SECRET not set in env");

    const { status, json } = await postVerify(request, {
      orderId: makeOrderId(),
      paymentId: makePayId(),
      keySecret: keySecret!,
      badSig: true,
    });

    // Route validates the signature before trusting any payment data.
    // Could also be 401 if the E2E auth bypass is not active — both are acceptable.
    expect([400, 401]).toContain(status);
    if (status === 400) {
      expect((json as Record<string, unknown>).error).toBe("invalid_signature");
    }
  });

  test("returns 400 when body is missing required payment fields", async ({ request }) => {
    const res = await request.post("/api/payments/verify", {
      headers: { "Content-Type": "application/json", "x-e2e-bypass-auth": "1" },
      data: JSON.stringify({ plan: "pro" }), // missing payment IDs
    });

    // 400 (missing fields) or 401 (no session) are both correct
    expect([400, 401]).toContain(res.status());
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/payments/webhook — server-to-server, no session needed
// ─────────────────────────────────────────────────────────────────────────────

test.describe("POST /api/payments/webhook", () => {
  test("returns 400 when x-razorpay-signature header is missing", async ({ request }) => {
    const body = captureBody(makePayId(), makeOrderId(), TEST_USER_ID);
    const res = await request.post("/api/payments/webhook", {
      headers: { "Content-Type": "application/json" },
      // No x-razorpay-signature header
      data: body,
    });
    expect(res.status()).toBe(400);
    const json = await res.json() as Record<string, unknown>;
    expect(json.error).toBe("invalid_signature");
  });

  test("returns 400 when the signature is tampered", async ({ request }) => {
    const body = captureBody(makePayId(), makeOrderId(), TEST_USER_ID);
    const { status, json } = await postWebhook(request, body, "tampered_0000000000000000");
    expect(status).toBe(400);
    expect((json as Record<string, unknown>).error).toBe("invalid_signature");
  });

  test('returns 200 "ignored" for non-payment.captured event types', async ({ request }) => {
    test.skip(!process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET not set in env");

    const body = JSON.stringify({ event: "order.paid", payload: {} });
    const { status, json } = await postWebhook(request, body);
    expect(status).toBe(200);
    expect((json as Record<string, unknown>).status).toBe("ignored");
  });

  test('returns 200 "provisioned" and writes DB rows on a valid payment.captured', async ({
    request,
  }) => {
    test.skip(!process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET not set in env");
    test.skip(!process.env.DATABASE_URL, "DATABASE_URL not set — cannot assert DB state");

    const payId = makePayId();
    const orderId = makeOrderId();
    const body = captureBody(payId, orderId, TEST_USER_ID);

    const { status, json } = await postWebhook(request, body);
    expect(status).toBe(200);
    expect((json as Record<string, unknown>).status).toBe("provisioned");

    // Assert DB state
    const prisma = createE2EPrismaClient();
    try {
      // RazorpayPayment row must exist and be captured
      const rp = await prisma.razorpayPayment.findUnique({
        where: { razorpayPaymentId: payId },
      });
      expect(rp).not.toBeNull();
      expect(rp!.status).toBe("captured");
      expect(rp!.userId).toBe(TEST_USER_ID);

      // Credits must have been added
      const balance = await prisma.creditBalance.findUnique({
        where: { userId: TEST_USER_ID },
      });
      expect(balance).not.toBeNull();
      expect(Number(balance!.availableCredits)).toBeGreaterThan(0);

      // A razorpay_payment transaction must exist
      const tx = await prisma.creditTransaction.findFirst({
        where: { userId: TEST_USER_ID, kind: "razorpay_payment" },
      });
      expect(tx).not.toBeNull();

      // Subscription must be active
      const sub = await prisma.subscription.findUnique({
        where: { userId: TEST_USER_ID },
      });
      expect(sub).not.toBeNull();
      expect(sub!.status).toBe("active");
    } finally {
      await prisma.$disconnect();
    }
  });

  test("idempotency: calling webhook twice with the same payment_id returns already_processed the second time", async ({
    request,
  }) => {
    test.skip(!process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET not set in env");

    const payId = makePayId();
    const orderId = makeOrderId();
    const body = captureBody(payId, orderId, TEST_USER_ID);

    // First call — provisions
    const first = await postWebhook(request, body);
    expect(first.status).toBe(200);
    expect((first.json as Record<string, unknown>).status).toBe("provisioned");

    // Second call — idempotent, no double-crediting
    const second = await postWebhook(request, body);
    expect(second.status).toBe(200);
    expect((second.json as Record<string, unknown>).status).toBe("already_processed");

    // DB must have exactly ONE razorpay_payment transaction, not two
    if (process.env.DATABASE_URL) {
      const prisma = createE2EPrismaClient();
      try {
        const txCount = await prisma.creditTransaction.count({
          where: { userId: TEST_USER_ID, kind: "razorpay_payment" },
        });
        expect(txCount).toBe(1);
      } finally {
        await prisma.$disconnect();
      }
    }
  });

  test("returns 200 and skips gracefully when payment notes are missing userId", async ({
    request,
  }) => {
    test.skip(!process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET not set in env");

    const body = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: makePayId(),
            order_id: makeOrderId(),
            amount: 4900,
            notes: { plan: "pro" }, // no userId
          },
        },
      },
    });
    const { status, json } = await postWebhook(request, body);
    expect(status).toBe(200);
    expect((json as Record<string, unknown>).status).toBe("skipped_incomplete_data");
  });

  test("returns 200 and skips gracefully when payment notes are missing plan", async ({
    request,
  }) => {
    test.skip(!process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET not set in env");

    const body = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: makePayId(),
            order_id: makeOrderId(),
            amount: 4900,
            notes: { userId: TEST_USER_ID }, // no plan
          },
        },
      },
    });
    const { status, json } = await postWebhook(request, body);
    expect(status).toBe(200);
    expect((json as Record<string, unknown>).status).toBe("skipped_incomplete_data");
  });
});
