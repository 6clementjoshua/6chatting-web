import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function GET() {
    try {
        const sb = supabaseAdmin();

        // Public read is allowed via RLS, but we still use admin for stability/ordering
        const { data, error } = await sb
            .from("founding_supporters")
            .select("id, display_name, amount, currency, provider, created_at")
            .order("created_at", { ascending: false })
            .limit(200);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ items: data || [] });
    } catch (e: any) {
        return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
    }
}
