import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  plan: z.enum(["pro"]),
});

const planCatalog = {
  pro: {
    amount: 4900,
    currency: "INR",
    name: "Archi.dev",
    description: "Pro plan",
  },
} as const;

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

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!razorpayKeyId || !razorpayKeySecret) {
    return NextResponse.json(
      {
        error: "payment_config_missing",
        message: "Missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
      },
      { status: 500 },
    );
  }

  const plan = planCatalog[parsed.data.plan];
  const origin = req.nextUrl.origin;
  const authHeader = `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64")}`;
  const receipt = `${parsed.data.plan}_${user.id.slice(0, 8)}_${Date.now()}`;

  const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: plan.amount,
      currency: plan.currency,
      receipt,
      notes: {
        plan: parsed.data.plan,
        userId: user.id,
        email: user.email ?? "",
      },
    }),
    cache: "no-store",
  });

  if (!orderResponse.ok) {
    const errorText = await orderResponse.text();
    console.error("[/api/payments/checkout] Razorpay order error:", errorText);

    try {
      const razorpayError = JSON.parse(errorText) as {
        error?: { code?: string; description?: string };
      };

      if (razorpayError.error?.description === "Authentication failed") {
        return NextResponse.json(
          {
            error: "payment_auth_failed",
            message: "Razorpay authentication failed. Check that RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET belong to the same account and mode.",
          },
          { status: 500 },
        );
      }
    } catch {
      // Ignore JSON parsing errors and return a generic upstream failure below.
    }

    return NextResponse.json({ error: "checkout_unavailable" }, { status: 502 });
  }

  const order = await orderResponse.json() as { id: string; amount: number; currency: string };

  return NextResponse.json({
    key: razorpayKeyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    name: plan.name,
    description: plan.description,
    callbackUrl: `${origin}/pricing?checkout=success&plan=${parsed.data.plan}`,
    prefill: {
      email: user.email ?? undefined,
      name:
        typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name
            : undefined,
    },
    notes: {
      plan: parsed.data.plan,
      userId: user.id,
    },
  });
}
