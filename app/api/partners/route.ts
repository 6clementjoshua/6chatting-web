// app/api/partners/route.ts
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

// Optional notification to you (not to the user) via Resend.
// If RESEND_API_KEY is missing, we still save the inquiry and return OK.
async function notifyOwner(payload: {
    name?: string | null;
    email?: string | null;
    organization?: string | null;
    country?: string | null;
    interest_type: string;
    message: string;
    id: string;
    created_at: string;
}) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.PARTNER_NOTIFY_EMAIL; // your email
    const FROM = process.env.PARTNER_FROM_EMAIL; // e.g. "6chatting <noreply@6chatting.com>"

    if (!RESEND_API_KEY || !TO || !FROM) return;

    const subject = `New ${payload.interest_type} inquiry — ${payload.name || "Unknown"}`;
    const text = [
        `New Partner/Investor Inquiry`,
        ``,
        `Type: ${payload.interest_type}`,
        `Name: ${payload.name || "-"}`,
        `Email: ${payload.email || "-"}`,
        `Organization: ${payload.organization || "-"}`,
        `Country: ${payload.country || "-"}`,
        ``,
        `Message:`,
        payload.message,
        ``,
        `ID: ${payload.id}`,
        `Created: ${payload.created_at}`,
    ].join("\n");

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: FROM,
            to: [TO],
            subject,
            text,
        }),
    });
}

export async function POST(req: Request) {
    try {
        const sb = supabaseAdmin();
        const meta = getClientMeta(req);

        const body = await req.json();

        const interest_type = String(body.interest_type || "").toLowerCase().trim();
        const allowed = new Set(["investor", "partner", "enterprise", "press", "other"]);
        if (!allowed.has(interest_type)) {
            return NextResponse.json({ error: "Invalid interest type" }, { status: 400 });
        }

        const name = body.name ? String(body.name).slice(0, 120).trim() : null;
        const email = body.email ? String(body.email).slice(0, 180).trim() : null;
        const organization = body.organization ? String(body.organization).slice(0, 180).trim() : null;
        const message = body.message ? String(body.message).slice(0, 2000).trim() : "";

        if (message.length < 20) {
            return NextResponse.json({ error: "Please provide a bit more detail (min 20 characters)." }, { status: 400 });
        }

        const { data, error } = await sb
            .from("partner_inquiries")
            .insert({
                name,
                email,
                organization,
                country: body.country ? String(body.country).slice(0, 80).trim() : meta.country || null,
                interest_type,
                message,
                ip: meta.ip,
                user_agent: meta.ua,
                source: "partners_page",
            })
            .select("id, created_at, name, email, organization, country, interest_type, message")
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        // Notification to you (optional)
        await notifyOwner({
            id: data.id,
            created_at: data.created_at,
            name: data.name,
            email: data.email,
            organization: data.organization,
            country: data.country,
            interest_type: data.interest_type,
            message: data.message,
        });

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
