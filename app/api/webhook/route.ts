import { NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    await client.create({
      _type: "order",
      orderNumber: session.id,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId: session.customer,
      CustomerName: session.customer_details?.name,
      email: session.customer_details?.email,
      stringPaymentIntentId: session.payment_intent,
      status: session.payment_status,
      totalPrice: (session.amount_total || 0) / 100,
      currency: session.currency,
      OrderDate: new Date().toISOString(),
      products: [], // You must attach cart items — see below
    });
  }

  return NextResponse.json({ received: true });
}
