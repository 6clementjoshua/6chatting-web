import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

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
        const site = process.env.NEXT_PUBLIC_SITE_URL;
        if (!site) return NextResponse.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });

        const flwKey = process.env.FLW_SECRET_KEY;
        if (!flwKey) return NextResponse.json({ error: "Missing FLW_SECRET_KEY" }, { status: 500 });

        const body = await req.json();
        const currency = String(body.currency || "NGN").toUpperCase();
        const amountWhole = Number(body.amount);

        if (!Number.isFinite(amountWhole) || amountWhole <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const amountMinor = Math.round(amountWhole * 100);

        const name = body.name ? String(body.name).slice(0, 120) : null;
        const email = body.email ? String(body.email).slice(0, 180) : null;
        const note = body.note ? String(body.note).slice(0, 800) : null;

        const meta = getClientMeta(req);
        const sb = supabaseAdmin();

        const tx_ref = `support_${Date.now()}_${Math.random().toString(16).slice(2)}`;

        const { data: row, error: insErr } = await sb
            .from("support_contributions")
            .insert({
                supporter_name: name,
                supporter_email: email,
                supporter_note: note,
                amount: amountMinor,
                currency,
                provider: "flutterwave",
                status: "initiated",
                provider_tx_ref: tx_ref,
                country: meta.country,
                ip: meta.ip,
                user_agent: meta.ua,
            })
            .select("id")
            .single();

        if (insErr) throw new Error(`Supabase insert failed: ${insErr.message}`);

        const payload = {
            tx_ref,
            amount: amountWhole,
            currency,
            redirect_url: `${site}/support/success?provider=flutterwave&tx_ref=${encodeURIComponent(tx_ref)}`,
            customer: {
                email: email || "supporter@6chatting.com",
                name: name || "Supporter",
            },
            customizations: {
                title: "6chatting — Founding Support",
                description: "Optional contribution to support infrastructure and launch readiness.",
                logo: `${site}/favicon.ico`,
            },
            meta: { contribution_id: row.id },
        };

        const res = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${flwKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok || !data?.data?.link) {
            await sb.from("support_contributions").update({ status: "failed", raw_event: data }).eq("id", row.id);
            return NextResponse.json(
                { error: data?.message || data?.error || "Failed to initialize Flutterwave payment" },
                { status: 500 }
            );
        }

        await sb.from("support_contributions").update({ status: "pending" }).eq("id", row.id);

        return NextResponse.json({ url: data.data.link });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
