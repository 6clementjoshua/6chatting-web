import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

// Flutterwave may "ping" the URL when saving, sometimes via GET
export async function GET() {
    return NextResponse.json({ ok: true });
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

    // IMPORTANT:
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

            await sb
                .from("support_contributions")
                .update({
                    status: newStatus,
                    provider_payment_id: flwId,
                    raw_event: body,
                })
                .eq("provider_tx_ref", txRef);
        }

        return NextResponse.json({ ok: true });
    } catch (e: any) {
        // Still return 200 to avoid Flutterwave retry storms during transient issues,
        // but record failure server-side if you want later.
        return NextResponse.json({ ok: true });
    }
}
