// app/api/blog/[slug]/route.ts
import { NextResponse } from "next/server";
import { supabasePublic } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
    const sb = supabasePublic();

    const { data, error } = await sb
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .eq("slug", params.slug)
        .maybeSingle();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    if (!data) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, post: data }, { status: 200 });
}
