// app/api/webhooks/flutterwave/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// Flutterwave may "ping" the URL when saving, sometimes via GET
export async function GET() {
    return NextResponse.json({ ok: true });
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
    provider: "flutterwave";
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
        `We’ve confirmed your contribution of ${amountFormatted} via FLUTTERWAVE.`,
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
    const secretHash = process.env.FLW_WEBHOOK_HASH || "";
    const headerHash = req.headers.get("verif-hash") || "";

    // Read body safely (Flutterwave may send non-JSON during setup tests)
    const raw = await req.text();
    let body: any = null;
    try {
        body = raw ? JSON.parse(raw) : null;
    } catch {
        body = null;
    }

    // If Flutterwave is validating the URL (missing header / missing hash),
    // return 200 so they don't show "malformed response".
    // But do not process anything unless signature matches.
    if (!secretHash || !headerHash || headerHash !== secretHash) {
        return NextResponse.json({ ok: true });
    }

    const sb = supabaseAdmin();

    try {
        const data = body?.data || body;

        const txRef = data?.tx_ref || data?.txRef || null;
        const status = String(data?.status || "").toLowerCase();
        const flwId = data?.id ? String(data.id) : null;

        if (txRef) {
            const newStatus =
                status === "successful" || status === "completed"
                    ? "succeeded"
                    : status === "failed"
                        ? "failed"
                        : "pending";

            // Update contribution status
            await sb
                .from("support_contributions")
                .update({
                    status: newStatus,
                    provider_payment_id: flwId,
                    raw_event: body,
                })
                .eq("provider_tx_ref", txRef);

            // If succeeded: publish supporter (opt-in) + send branded thank-you email
            if (newStatus === "succeeded") {
                const { data: contrib, error: contribErr } = await sb
                    .from("support_contributions")
                    .select(
                        "id, recognize, display_name, amount, currency, provider, supporter_email, receipt_url"
                    )
                    .eq("provider_tx_ref", txRef)
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
                        provider: "flutterwave",
                        receiptUrl: contrib.receipt_url || null,
                    });
                }
            }
        }

        // Always 200 to avoid retry storms
        return NextResponse.json({ ok: true });
    } catch {
        // Still return 200 to avoid retry storms; you can inspect logs if needed.
        return NextResponse.json({ ok: true });
    }
}
