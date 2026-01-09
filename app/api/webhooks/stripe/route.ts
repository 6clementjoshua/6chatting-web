import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    return new Stripe(key, { apiVersion: "2025-12-15.clover" as any });
}

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) return NextResponse.json({ error: "Missing signature/secret" }, { status: 400 });

    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
        const stripe = getStripe();
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const sb = supabaseAdmin();

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const contributionId = session.metadata?.contribution_id;

            // If no contribution id, still acknowledge
            if (!contributionId) return NextResponse.json({ received: true });

            // Retrieve charge metadata safely
            const stripe = getStripe();
            const full = await stripe.checkout.sessions.retrieve(session.id, {
                expand: ["payment_intent", "payment_intent.latest_charge"],
            });

            const pi = full.payment_intent as Stripe.PaymentIntent | null;
            const charge = (pi?.latest_charge as Stripe.Charge | null) || null;

            const receiptUrl = charge?.receipt_url || null;
            const cardBrand = (charge as any)?.payment_method_details?.card?.brand || null;
            const last4 = (charge as any)?.payment_method_details?.card?.last4 || null;
            const expMonth = (charge as any)?.payment_method_details?.card?.exp_month || null;
            const expYear = (charge as any)?.payment_method_details?.card?.exp_year || null;

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

            // ✅ If supporter opted-in, publish to Founding Supporters list (public read table)
            const { data: contrib, error: contribErr } = await sb
                .from("support_contributions")
                .select("id, recognize, display_name, amount, currency, provider")
                .eq("id", contributionId)
                .single();

            if (!contribErr && contrib?.recognize && contrib?.display_name) {
                await sb.from("founding_supporters").upsert({
                    contribution_id: contrib.id,
                    display_name: contrib.display_name,
                    amount: contrib.amount,
                    currency: contrib.currency,
                    provider: contrib.provider,
                });
            }

        }

        return NextResponse.json({ received: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Webhook error" }, { status: 500 });
    }
}
