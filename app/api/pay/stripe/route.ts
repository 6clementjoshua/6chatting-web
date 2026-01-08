import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
});

function getClientMeta(req: Request) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "";
    const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";
    const ua = req.headers.get("user-agent") || "";
    return { ip, country, ua };
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const currency = String(body.currency || "USD").toUpperCase();
        const amount = Number(body.amount);
        const name = body.name ? String(body.name).slice(0, 120) : null;
        const email = body.email ? String(body.email).slice(0, 180) : null;
        const note = body.note ? String(body.note).slice(0, 800) : null;

        // Minimal validation
        if (!Number.isFinite(amount) || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // IMPORTANT:
        // Stripe expects "minor units" (cents) for most currencies.
        // Your UI currently sends whole numbers (e.g., 25 USD).
        // We'll treat USD/NGN as whole units and convert to minor units here:
        const toMinor = (cur: string, whole: number) => {
            // Most currencies: 2 decimals.
            // If you later add zero-decimal currencies, handle them explicitly.
            return Math.round(whole * 100);
        };

        const amountMinor = toMinor(currency, amount);

        const site = process.env.NEXT_PUBLIC_SITE_URL!;
        if (!site) throw new Error("Missing NEXT_PUBLIC_SITE_URL");

        const meta = getClientMeta(req);

        // Create DB record (initiated)
        const sb = supabaseAdmin();
        const { data: row, error: insErr } = await sb
            .from("support_contributions")
            .insert({
                supporter_name: name,
                supporter_email: email,
                supporter_note: note,
                amount: amountMinor,
                currency,
                provider: "stripe",
                status: "initiated",
                country: meta.country,
                ip: meta.ip,
                user_agent: meta.ua,
            })
            .select("id")
            .single();

        if (insErr) throw insErr;

        // Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "donate",
            success_url: `${site}/support/success?provider=stripe&sid={CHECKOUT_SESSION_ID}`,
            cancel_url: `${site}/support/cancel?provider=stripe`,
            customer_email: email || undefined,
            metadata: {
                contribution_id: row.id,
                supporter_name: name || "",
            },
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: currency.toLowerCase(),
                        unit_amount: amountMinor,
                        product_data: {
                            name: "6chatting — Founding Support (Optional)",
                            description: "Optional contribution to support infrastructure and launch readiness.",
                        },
                    },
                },
            ],
            // You can add additional payment method options by enabling them in Stripe Dashboard.
        });

        // Update record with session id
        await sb
            .from("support_contributions")
            .update({
                provider_session_id: session.id,
                status: "pending",
            })
            .eq("id", row.id);

        return NextResponse.json({ url: session.url });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
