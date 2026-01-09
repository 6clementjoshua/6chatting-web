// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    return new Stripe(key, { apiVersion: "2025-12-15.clover" as any });
}

function formatMoneyMinor(amountMinor: number, currency: string) {
    const cur = String(currency || "USD").toUpperCase();
    const major = Number(amountMinor || 0) / 100;
    try {
        return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(major);
    } catch {
        return `${cur} ${major.toLocaleString()}`;
    }
}

// Branded email (optional, failsafe)
async function sendThankYouEmail(args: {
    to: string;
    displayName?: string | null;
    amountMinor: number;
    currency: string;
    provider: "stripe";
    receiptUrl?: string | null;
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.SUPPORT_FROM_EMAIL;
    const replyTo = process.env.SUPPORT_REPLY_TO || undefined;
    const site = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "";

    if (!apiKey || !from) return;

    const name = (args.displayName || "").trim() || "there";
    const amountFormatted = formatMoneyMinor(args.amountMinor, args.currency);

    const subject = "Thank you for supporting the build of 6chatting";
    const text = [
        `Hi ${name},`,
        ``,
        `Thank you for supporting the build of 6chatting.`,
        `We’ve confirmed your contribution of ${amountFormatted} via STRIPE.`,
        ``,
        `Your support helps infrastructure, reliability, and launch readiness for premium real-time translation.`,
        args.receiptUrl ? `Receipt: ${args.receiptUrl}` : "",
        site ? `Founding Supporters: ${site}/founding-supporters` : "",
        ``,
        `— 6chatting`,
        `A 6clement Joshua Service`,
    ]
        .filter(Boolean)
        .join("\n");

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [args.to],
            subject,
            text,
            reply_to: replyTo,
        }),
    });
}

export async function POST(req: Request) {
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
        return NextResponse.json({ error: "Missing signature/secret" }, { status: 400 });
    }

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

            // Update contribution record
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

            // Publish supporter (opt-in) + send branded thank-you email
            const { data: contrib, error: contribErr } = await sb
                .from("support_contributions")
                .select("id, recognize, display_name, amount, currency, provider, supporter_email, receipt_url")
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

            if (!contribErr && contrib?.supporter_email) {
                await sendThankYouEmail({
                    to: contrib.supporter_email,
                    displayName: contrib.display_name,
                    amountMinor: contrib.amount,
                    currency: contrib.currency,
                    provider: "stripe",
                    receiptUrl: contrib.receipt_url || null,
                });
            }
        }

        return NextResponse.json({ received: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Webhook error" }, { status: 500 });
    }
}
