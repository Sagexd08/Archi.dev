import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { verifyPaymentSignature, provisionPayment } from "@/lib/razorpay";

const bodySchema = z.object({
  razorpay_payment_id: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  plan: z.enum(["pro"]),
});

const planAmounts: Record<string, number> = {
  pro: 4900,
};

export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "payment_config_missing" }, { status: 500 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan } = parsed.data;

  const valid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    keySecret,
  );

  if (!valid) {
    console.warn("[/api/payments/verify] invalid signature for payment", razorpay_payment_id);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  const result = await provisionPayment({
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    userId: user.id,
    plan,
    amountPaise: planAmounts[plan] ?? 0,
  });

  return NextResponse.json({ status: result.status });
}
