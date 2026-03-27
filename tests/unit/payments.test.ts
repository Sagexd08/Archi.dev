/**
 * Unit tests for the Razorpay payment system
 *
 * Strategy:
 *  - Import lib/razorpay.ts directly and test pure-crypto helpers with real
 *    Node.js crypto (no mocks needed — deterministic + fast).
 *  - Mock @/lib/prisma and @/lib/credit so provisionPayment runs without a DB.
 *  - Mock @/lib/supabase/server so route handlers run without Supabase.
 *  - Import route handlers directly — no HTTP server needed.
 *
 * Coverage map
 *  verifyPaymentSignature  ── 5 cases
 *  verifyWebhookSignature  ── 4 cases
 *  provisionPayment        ── 4 cases  (new, idempotent, plan upsert, subscription upsert)
 *  POST /api/payments/verify   ── 6 cases
 *  POST /api/payments/webhook  ── 7 cases
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "node:crypto";
import { NextRequest } from "next/server";

// ─── Hoisted mock fns ────────────────────────────────────────────────────────
// vi.hoisted() runs before vi.mock() factories — values are available inside them.
const {
  mockRpFindUnique,
  mockRpUpsert,
  mockPlanUpsert,
  mockSubUpsert,
  mockGetUser,
  mockEnsureUser,
  mockAddCredits,
} = vi.hoisted(() => ({
  mockRpFindUnique: vi.fn(),
  mockRpUpsert: vi.fn(),
  mockPlanUpsert: vi.fn(),
  mockSubUpsert: vi.fn(),
  mockGetUser: vi.fn(),
  mockEnsureUser: vi.fn(),
  mockAddCredits: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    razorpayPayment: {
      findUnique: mockRpFindUnique,
      upsert: mockRpUpsert,
    },
    plan: { upsert: mockPlanUpsert },
    subscription: { upsert: mockSubUpsert },
  },
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseServerClient: vi.fn().mockResolvedValue({
    auth: { getUser: mockGetUser },
  }),
}));

vi.mock("@/lib/credit", () => ({
  ensureUser: mockEnsureUser,
  addCredits: mockAddCredits,
  serializeBalance: (b: unknown) => b,
}));

// Import after mock registration
import {
  verifyPaymentSignature,
  verifyWebhookSignature,
  provisionPayment,
} from "@/lib/razorpay";

const { POST: verifyPOST } = await import("@/app/api/payments/verify/route");
const { POST: webhookPOST } = await import("@/app/api/payments/webhook/route");

// ─── Test helpers ────────────────────────────────────────────────────────────

const KEY_SECRET = "test_key_secret_32bytes_padding_x";
const WEBHOOK_SECRET = "test_webhook_secret_32bytes_pad_x";

/** Compute the client-side payment signature Razorpay would send. */
function makePaymentSig(orderId: string, paymentId: string, secret = KEY_SECRET) {
  return crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
}

/** Compute the webhook signature Razorpay would send. */
function makeWebhookSig(body: string, secret = WEBHOOK_SECRET) {
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}

function makeVerifyRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/payments/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeWebhookRequest(body: string, signature: string): NextRequest {
  return new NextRequest("http://localhost/api/payments/webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-razorpay-signature": signature,
    },
    body,
  });
}

function makeCapturePayload(paymentId: string, orderId: string, userId: string, plan = "pro") {
  return JSON.stringify({
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: paymentId,
          order_id: orderId,
          amount: 4900,
          notes: { userId, plan },
        },
      },
    },
  });
}

// ─── Saved env state ─────────────────────────────────────────────────────────

let savedKeySecret: string | undefined;
let savedWebhookSecret: string | undefined;

beforeEach(() => {
  vi.clearAllMocks();

  savedKeySecret = process.env.RAZORPAY_KEY_SECRET;
  savedWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  process.env.RAZORPAY_KEY_SECRET = KEY_SECRET;
  process.env.RAZORPAY_WEBHOOK_SECRET = WEBHOOK_SECRET;

  // Default happy-path Prisma stubs
  mockRpFindUnique.mockResolvedValue(null); // not yet processed
  mockRpUpsert.mockResolvedValue({ id: "rp1", status: "captured" });
  mockPlanUpsert.mockResolvedValue({ id: "plan1", name: "pro" });
  mockSubUpsert.mockResolvedValue({ id: "sub1", userId: "user1" });
  mockEnsureUser.mockResolvedValue({ id: "user1" });
  mockAddCredits.mockResolvedValue({ availableCredits: BigInt(5000) });
});

afterEach(() => {
  if (savedKeySecret !== undefined) process.env.RAZORPAY_KEY_SECRET = savedKeySecret;
  else delete process.env.RAZORPAY_KEY_SECRET;

  if (savedWebhookSecret !== undefined) process.env.RAZORPAY_WEBHOOK_SECRET = savedWebhookSecret;
  else delete process.env.RAZORPAY_WEBHOOK_SECRET;
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. verifyPaymentSignature
// ─────────────────────────────────────────────────────────────────────────────

describe("verifyPaymentSignature", () => {
  const orderId = "order_ABC123";
  const paymentId = "pay_XYZ789";

  it("returns true for a correct signature", () => {
    const sig = makePaymentSig(orderId, paymentId);
    expect(verifyPaymentSignature(orderId, paymentId, sig, KEY_SECRET)).toBe(true);
  });

  it("returns false when the payment_id is tampered", () => {
    const sig = makePaymentSig(orderId, paymentId);
    expect(verifyPaymentSignature(orderId, "pay_TAMPERED", sig, KEY_SECRET)).toBe(false);
  });

  it("returns false when the order_id is tampered", () => {
    const sig = makePaymentSig(orderId, paymentId);
    expect(verifyPaymentSignature("order_TAMPERED", paymentId, sig, KEY_SECRET)).toBe(false);
  });

  it("returns false when the wrong key secret is used", () => {
    const sig = makePaymentSig(orderId, paymentId, "wrong_secret");
    expect(verifyPaymentSignature(orderId, paymentId, sig, KEY_SECRET)).toBe(false);
  });

  it("returns false for an all-zeros signature (timing-safe path)", () => {
    const zeros = "0".repeat(64);
    expect(verifyPaymentSignature(orderId, paymentId, zeros, KEY_SECRET)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. verifyWebhookSignature
// ─────────────────────────────────────────────────────────────────────────────

describe("verifyWebhookSignature", () => {
  const body = '{"event":"payment.captured"}';

  it("returns true for a correct webhook signature", () => {
    const sig = makeWebhookSig(body);
    expect(verifyWebhookSignature(body, sig, WEBHOOK_SECRET)).toBe(true);
  });

  it("returns false when the body is tampered after signing", () => {
    const sig = makeWebhookSig(body);
    expect(verifyWebhookSignature('{"event":"payment.failed"}', sig, WEBHOOK_SECRET)).toBe(false);
  });

  it("returns false when the wrong webhook secret is used", () => {
    const sig = makeWebhookSig(body, "wrong_webhook_secret");
    expect(verifyWebhookSignature(body, sig, WEBHOOK_SECRET)).toBe(false);
  });

  it("returns false for an empty signature", () => {
    expect(verifyWebhookSignature(body, "", WEBHOOK_SECRET)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. provisionPayment
// ─────────────────────────────────────────────────────────────────────────────

describe("provisionPayment", () => {
  const baseOpts = {
    razorpayPaymentId: "pay_provision_001",
    razorpayOrderId: "order_provision_001",
    userId: "user_provision_001",
    plan: "pro",
    amountPaise: 4900,
  };

  it('returns "provisioned" and calls addCredits on first payment', async () => {
    const result = await provisionPayment(baseOpts);

    expect(result.status).toBe("provisioned");
    expect(mockEnsureUser).toHaveBeenCalledWith("user_provision_001");
    expect(mockAddCredits).toHaveBeenCalledWith(
      "user_provision_001",
      expect.any(Number),
      "razorpay_payment",
      expect.stringContaining("pay_provision_001"),
    );
    expect(mockPlanUpsert).toHaveBeenCalledTimes(1);
    expect(mockSubUpsert).toHaveBeenCalledTimes(1);
  });

  it('returns "already_processed" and skips addCredits when payment was captured before', async () => {
    mockRpFindUnique.mockResolvedValue({ id: "rp1", status: "captured" });

    const result = await provisionPayment(baseOpts);

    expect(result.status).toBe("already_processed");
    expect(mockAddCredits).not.toHaveBeenCalled();
    expect(mockSubUpsert).not.toHaveBeenCalled();
  });

  it("upserts the subscription with currentPeriodEnd ~30 days from now", async () => {
    await provisionPayment(baseOpts);

    const call = mockSubUpsert.mock.calls[0][0] as {
      create: { currentPeriodEnd: Date };
    };
    const end = call.create.currentPeriodEnd;
    const diffDays = (end.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    expect(diffDays).toBeGreaterThan(28);
    expect(diffDays).toBeLessThan(32);
  });

  it("stores the plan name and amount in the plan upsert", async () => {
    await provisionPayment({ ...baseOpts, plan: "pro", amountPaise: 4900 });

    const call = mockPlanUpsert.mock.calls[0][0] as {
      where: { name: string };
      create: { priceMonthly: number };
    };
    expect(call.where.name).toBe("pro");
    expect(call.create.priceMonthly).toBeCloseTo(49);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. POST /api/payments/verify
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/payments/verify", () => {
  const orderId = "order_verify_001";
  const paymentId = "pay_verify_001";

  function validBody() {
    return {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: makePaymentSig(orderId, paymentId),
      plan: "pro",
    };
  }

  it("returns 401 when user is not authenticated", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const res = await verifyPOST(makeVerifyRequest(validBody()));
    expect(res.status).toBe(401);
    const body = await res.json() as { error: string };
    expect(body.error).toBe("unauthorized");
  });

  it("returns 400 when required fields are missing from the body", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user1", email: "u@test.com" } } });

    const res = await verifyPOST(makeVerifyRequest({ plan: "pro" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when the signature is invalid", async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user1", email: "u@test.com" } } });

    const res = await verifyPOST(
      makeVerifyRequest({
        ...validBody(),
        razorpay_signature: "bad_signature_hex_value_here",
      }),
    );
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe("invalid_signature");
  });

  it('returns 200 with status "provisioned" on a valid first payment', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user1", email: "u@test.com" } } });

    const res = await verifyPOST(makeVerifyRequest(validBody()));
    expect(res.status).toBe(200);
    const body = await res.json() as { status: string };
    expect(body.status).toBe("provisioned");
  });

  it('returns 200 with status "already_processed" on a duplicate call', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: "user1", email: "u@test.com" } } });
    mockRpFindUnique.mockResolvedValue({ id: "rp1", status: "captured" });

    const res = await verifyPOST(makeVerifyRequest(validBody()));
    expect(res.status).toBe(200);
    const body = await res.json() as { status: string };
    expect(body.status).toBe("already_processed");
  });

  it("returns 500 when RAZORPAY_KEY_SECRET is not configured", async () => {
    delete process.env.RAZORPAY_KEY_SECRET;
    mockGetUser.mockResolvedValue({ data: { user: { id: "user1", email: "u@test.com" } } });

    const res = await verifyPOST(makeVerifyRequest(validBody()));
    expect(res.status).toBe(500);
    const body = await res.json() as { error: string };
    expect(body.error).toBe("payment_config_missing");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. POST /api/payments/webhook
// ─────────────────────────────────────────────────────────────────────────────

describe("POST /api/payments/webhook", () => {
  const userId = "user_webhook_001";

  function makeValidWebhookReq(paymentId: string, orderId: string) {
    const body = makeCapturePayload(paymentId, orderId, userId);
    return makeWebhookRequest(body, makeWebhookSig(body));
  }

  it("returns 500 when RAZORPAY_WEBHOOK_SECRET is not set", async () => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;

    const body = makeCapturePayload("pay_w1", "order_w1", userId);
    const res = await webhookPOST(makeWebhookRequest(body, "any_sig"));
    expect(res.status).toBe(500);
    const json = await res.json() as { error: string };
    expect(json.error).toBe("config_missing");
  });

  it("returns 400 when the webhook signature is invalid", async () => {
    const body = makeCapturePayload("pay_w2", "order_w2", userId);
    const res = await webhookPOST(makeWebhookRequest(body, "tampered_signature"));
    expect(res.status).toBe(400);
    const json = await res.json() as { error: string };
    expect(json.error).toBe("invalid_signature");
  });

  it('returns 200 with status "ignored" for non-payment.captured events', async () => {
    const body = JSON.stringify({ event: "order.paid", payload: {} });
    const res = await webhookPOST(makeWebhookRequest(body, makeWebhookSig(body)));
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string };
    expect(json.status).toBe("ignored");
  });

  it('returns 200 with status "provisioned" on a valid payment.captured event', async () => {
    const res = await webhookPOST(makeValidWebhookReq("pay_w3", "order_w3"));
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string };
    expect(json.status).toBe("provisioned");
    expect(mockAddCredits).toHaveBeenCalledTimes(1);
  });

  it('returns 200 with status "already_processed" when the same payment fires twice', async () => {
    mockRpFindUnique.mockResolvedValue({ id: "rp1", status: "captured" });

    const res = await webhookPOST(makeValidWebhookReq("pay_w4", "order_w4"));
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string };
    expect(json.status).toBe("already_processed");
    expect(mockAddCredits).not.toHaveBeenCalled();
  });

  it('returns 200 with status "skipped_incomplete_data" when notes are missing userId', async () => {
    const body = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: "pay_w5",
            order_id: "order_w5",
            amount: 4900,
            notes: { plan: "pro" }, // userId is absent
          },
        },
      },
    });
    const res = await webhookPOST(makeWebhookRequest(body, makeWebhookSig(body)));
    expect(res.status).toBe(200);
    const json = await res.json() as { status: string };
    expect(json.status).toBe("skipped_incomplete_data");
  });

  it("returns 500 so Razorpay retries when provisioning throws an unexpected error", async () => {
    mockEnsureUser.mockRejectedValue(new Error("DB connection lost"));

    const res = await webhookPOST(makeValidWebhookReq("pay_w6", "order_w6"));
    expect(res.status).toBe(500);
    const json = await res.json() as { error: string };
    expect(json.error).toBe("provisioning_failed");
  });
});
