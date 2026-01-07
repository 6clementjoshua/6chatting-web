// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
    _req: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;

    const supabase = supabaseAdmin();

    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

    if (error || !data) {
        return NextResponse.json(
            { ok: false, error: "Post not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ ok: true, post: data });
}
