import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, provisionPayment } from "@/lib/razorpay";

// Razorpay requires the raw body for signature verification — disable body parsing
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[/api/payments/webhook] RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "config_missing" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature, webhookSecret)) {
    console.warn("[/api/payments/webhook] invalid webhook signature");
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Only handle payment.captured — ignore everything else gracefully
  if (event.event !== "payment.captured") {
    return NextResponse.json({ status: "ignored" });
  }

  const payload = event.payload as Record<string, unknown> | undefined;
  const paymentEntity = (payload?.payment as Record<string, unknown> | undefined)
    ?.entity as Record<string, unknown> | undefined;

  if (!paymentEntity) {
    return NextResponse.json({ error: "missing_payload" }, { status: 400 });
  }

  const razorpayPaymentId = paymentEntity.id as string | undefined;
  const razorpayOrderId = paymentEntity.order_id as string | undefined;
  const amountPaise = paymentEntity.amount as number | undefined;
  const notes = paymentEntity.notes as Record<string, string> | undefined;

  const userId = notes?.userId;
  const plan = notes?.plan;

  if (!razorpayPaymentId || !razorpayOrderId || !userId || !plan) {
    console.error("[/api/payments/webhook] missing required fields in event", {
      razorpayPaymentId,
      razorpayOrderId,
      userId,
      plan,
    });
    // Return 200 so Razorpay doesn't retry endlessly for a malformed event
    return NextResponse.json({ status: "skipped_incomplete_data" });
  }

  try {
    const result = await provisionPayment({
      razorpayPaymentId,
      razorpayOrderId,
      userId,
      plan,
      amountPaise: amountPaise ?? 0,
    });

    return NextResponse.json({ status: result.status });
  } catch (err) {
    console.error("[/api/payments/webhook] provisioning failed", err);
    // Return 500 so Razorpay retries
    return NextResponse.json({ error: "provisioning_failed" }, { status: 500 });
  }
}
