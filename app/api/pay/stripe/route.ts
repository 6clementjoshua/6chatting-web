import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function getStripe() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("Missing STRIPE_SECRET_KEY");
    return new Stripe(key, { apiVersion: "2025-12-15.clover" as any });
}

function getClientMeta(req: Request) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        "";
    const country = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || "";
    const ua = req.headers.get("user-agent") || "";
    return { ip, country, ua };
}

function toMinor(cur: string, whole: number) {
    return Math.round(whole * 100);
}

export async function POST(req: Request) {
    try {
        console.log("[stripe] start");

        const site = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
        console.log("[stripe] site present:", Boolean(site));
        if (!site) return NextResponse.json({ error: "Missing SITE_URL" }, { status: 500 });

        const stripe = getStripe();
        console.log("[stripe] stripe client ok");

        const body = await req.json();
        const currency = String(body.currency || "USD").toUpperCase();
        const amountWhole = Number(body.amount);
        console.log("[stripe] payload:", { currency, amountWhole });

        if (!Number.isFinite(amountWhole) || amountWhole <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const amountMinor = toMinor(currency, amountWhole);

        const name = body.name ? String(body.name).slice(0, 120) : null;
        const email = body.email ? String(body.email).slice(0, 180) : null;
        const note = body.note ? String(body.note).slice(0, 800) : null;

        const meta = getClientMeta(req);

        console.log("[stripe] creating supabase admin");
        const sb = supabaseAdmin();
        console.log("[stripe] supabase admin ok");

        console.log("[stripe] inserting support_contributions");
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

        if (insErr) throw new Error(`Supabase insert failed: ${insErr.message}`);

        console.log("[stripe] insert ok:", row?.id);

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "donate",
            success_url: `${site}/support/success?provider=stripe&sid={CHECKOUT_SESSION_ID}`,
            cancel_url: `${site}/support/cancel?provider=stripe`,
            customer_email: email || undefined,
            metadata: { contribution_id: row.id },
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
        });

        console.log("[stripe] stripe session ok:", session.id);

        await sb
            .from("support_contributions")
            .update({ provider_session_id: session.id, status: "pending" })
            .eq("id", row.id);

        console.log("[stripe] update ok, redirecting");
        return NextResponse.json({ url: session.url });
    } catch (e: any) {
        console.error("[stripe] ERROR:", e?.message || e);
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}

