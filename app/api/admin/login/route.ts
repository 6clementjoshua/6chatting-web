// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const { password } = await req.json();
    const adminPw = process.env.BLOG_ADMIN_PASSWORD;

    if (!adminPw) return NextResponse.json({ ok: false, error: "Server missing BLOG_ADMIN_PASSWORD" }, { status: 500 });

    if (password !== adminPw) {
        return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set("blog_admin", "1", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
}
