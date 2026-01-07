// app/api/admin/blog/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabase-admin";

export const dynamic = "force-dynamic";

async function requireAdmin() {
    const ok = (await cookies()).get("blog_admin")?.value === "1";
    if (!ok) throw new Error("Unauthorized");
}

export async function GET() {
    try {
        await requireAdmin();
        const sb = supabaseAdmin();

        const { data, error } = await sb
            .from("blog_posts")
            .select("id, slug, category, title, subtitle, cover_label, read_mins, bullets, status, published_at, created_at, updated_at")
            .order("updated_at", { ascending: false });

        if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
        return NextResponse.json({ ok: true, posts: data ?? [] }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Unauthorized" }, { status: 401 });
    }
}

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const sb = supabaseAdmin();
        const body = await req.json();

        const payload = {
            slug: body.slug,
            category: body.category,
            title: body.title,
            subtitle: body.subtitle,
            cover_label: body.cover_label ?? null,
            read_mins: Number(body.read_mins ?? 5),
            bullets: body.bullets ?? [],
            content: body.content ?? [],
            status: body.status ?? "draft",
            published_at: body.status === "published" ? (body.published_at ?? new Date().toISOString()) : null,
        };

        const { data, error } = await sb.from("blog_posts").insert(payload).select("*").single();
        if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

        return NextResponse.json({ ok: true, post: data }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Unauthorized" }, { status: 401 });
    }
}

export async function PUT(req: Request) {
    try {
        await requireAdmin();
        const sb = supabaseAdmin();
        const body = await req.json();

        const id = body.id as string;
        if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

        const nextStatus = body.status ?? "draft";
        const publishedAt =
            nextStatus === "published"
                ? (body.published_at ?? new Date().toISOString())
                : null;

        const payload: any = {
            slug: body.slug,
            category: body.category,
            title: body.title,
            subtitle: body.subtitle,
            cover_label: body.cover_label ?? null,
            read_mins: Number(body.read_mins ?? 5),
            bullets: body.bullets ?? [],
            content: body.content ?? [],
            status: nextStatus,
            published_at: publishedAt,
        };

        const { data, error } = await sb.from("blog_posts").update(payload).eq("id", id).select("*").single();
        if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

        return NextResponse.json({ ok: true, post: data }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Unauthorized" }, { status: 401 });
    }
}

export async function DELETE(req: Request) {
    try {
        await requireAdmin();
        const sb = supabaseAdmin();
        const body = await req.json();

        const id = body.id as string;
        if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

        const { error } = await sb.from("blog_posts").delete().eq("id", id);
        if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e?.message ?? "Unauthorized" }, { status: 401 });
    }
}
