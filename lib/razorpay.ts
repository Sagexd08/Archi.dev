import crypto from "crypto";
import { prisma } from "./prisma";
import { addCredits, ensureUser } from "./credit";

// Credits granted per Pro plan payment
export const PRO_PLAN_CREDITS = Number(process.env.PRO_PLAN_CREDITS ?? 5000);

/**
 * Constant-time string comparison that returns false (instead of throwing)
 * when the two strings have different lengths — e.g. a truncated or
 * non-hex signature submitted by an attacker.
 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/** Verify client-side payment signature.
 *  HMAC-SHA256( razorpay_order_id + "|" + razorpay_payment_id , KEY_SECRET )
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  keySecret: string,
): boolean {
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeEqual(expected, signature);
}

/** Verify Razorpay webhook signature.
 *  HMAC-SHA256( rawBody , WEBHOOK_SECRET )
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string,
): boolean {
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");
  return safeEqual(expected, signature);
}

export type ProvisionResult =
  | { status: "already_processed" }
  | { status: "provisioned" };

/**
 * Idempotent provisioning: adds credits + upserts subscription.
 * Returns "already_processed" if this razorpay_payment_id was handled before.
 */
export async function provisionPayment(opts: {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  userId: string;
  plan: string;
  amountPaise: number;
}): Promise<ProvisionResult> {
  const { razorpayPaymentId, razorpayOrderId, userId, plan, amountPaise } = opts;

  // Idempotency: try to create the record; if it already exists, bail out
  const existing = await prisma.razorpayPayment.findUnique({
    where: { razorpayPaymentId },
  });
  if (existing?.status === "captured") {
    return { status: "already_processed" };
  }

  // Upsert idempotency record first (mark as captured atomically)
  await prisma.razorpayPayment.upsert({
    where: { razorpayPaymentId },
    create: {
      razorpayPaymentId,
      razorpayOrderId,
      userId,
      plan,
      amountPaise,
      status: "captured",
      processedAt: new Date(),
    },
    update: {
      status: "captured",
      processedAt: new Date(),
    },
  });

  // Ensure user row exists
  await ensureUser(userId);

  // Add credits
  await addCredits(
    userId,
    PRO_PLAN_CREDITS,
    "razorpay_payment",
    `Razorpay payment ${razorpayPaymentId} — plan: ${plan}`,
  );

  // Upsert Plan record
  const planRecord = await prisma.plan.upsert({
    where: { name: plan },
    create: {
      name: plan,
      displayName: plan.charAt(0).toUpperCase() + plan.slice(1),
      priceMonthly: amountPaise / 100,
      credits: BigInt(PRO_PLAN_CREDITS),
      maxProjects: 999,
      maxSeats: 10,
      features: [],
      isActive: true,
    },
    update: {},
  });

  // Upsert Subscription — one subscription per user
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setDate(periodEnd.getDate() + 30);

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      planId: planRecord.id,
      status: "active",
      billingInterval: "monthly",
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
    },
    update: {
      planId: planRecord.id,
      status: "active",
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
    },
  });

  return { status: "provisioned" };
}
