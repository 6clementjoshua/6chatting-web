import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    if (!sig || !webhookSecret) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const sb = supabaseAdmin();

    try {
        // Focus on Checkout completion
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const contributionId = session.metadata?.contribution_id;

            // Retrieve expanded session to access payment intent + charges
            const full = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ["payment_intent", "payment_intent.latest_charge"],
            });

            const pi = full.payment_intent as Stripe.PaymentIntent | null;
            const charge = (pi?.latest_charge as Stripe.Charge | null) || null;

            const receiptUrl = charge?.receipt_url || null;

            // Card metadata (safe)
            const cardBrand = (charge as any)?.payment_method_details?.card?.brand || null;
            const last4 = (charge as any)?.payment_method_details?.card?.last4 || null;
            const expMonth = (charge as any)?.payment_method_details?.card?.exp_month || null;
            const expYear = (charge as any)?.payment_method_details?.card?.exp_year || null;

            if (contributionId) {
                await sb
                    .from("support_contributions")
                    .update({
                        status: "succeeded",
                        provider_payment_id: pi?.id || null,
                        receipt_url: receiptUrl,
                        card_brand: cardBrand,
                        card_last4: last4,
                        card_exp_month: expMonth,
                        card_exp_year: expYear,
                        raw_event: event as any,
                    })
                    .eq("id", contributionId);
            }
        }

        // Optional: handle refunds
        if (event.type === "charge.refunded") {
            const charge = event.data.object as Stripe.Charge;
            // If you store provider_payment_id = PaymentIntent id, you may need mapping.
            // For now, store raw event for audit.
            await sb.from("support_contributions").update({ raw_event: event as any }).eq("provider_payment_id", charge.payment_intent as string);
        }

        return NextResponse.json({ received: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Webhook error" }, { status: 500 });
    }
}
