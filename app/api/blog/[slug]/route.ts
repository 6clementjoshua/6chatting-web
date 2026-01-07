// app/api/blog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
    const sb = supabasePublic();

    const { data, error } = await sb
        .from("blog_posts")
        .select(
            "id, slug, category, title, subtitle, cover_label, read_mins, bullets, status, published_at, created_at, updated_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, posts: data ?? [] }, { status: 200 });
}
