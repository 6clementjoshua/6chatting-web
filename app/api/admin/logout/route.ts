// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set("blog_admin", "0", { path: "/", maxAge: 0 });
    return res;
}
