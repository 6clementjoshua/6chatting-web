// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

const COUNTRY_TO_CURRENCY: Record<string, string> = {
    NG: "NGN",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    ZA: "ZAR",
    KE: "KES",
    GH: "GHS",
    FR: "EUR",
    DE: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
    BE: "EUR",
    IE: "EUR",
    PT: "EUR",
    SN: "XOF",
    CI: "XOF",
    BJ: "XOF",
    BF: "XOF",
    ML: "XOF",
    CM: "XAF",
    GA: "XAF",
    TD: "XAF",
    CG: "XAF",
    CF: "XAF",
};

function getCountry(req: NextRequest): string | null {
    const cf = req.headers.get("cf-ipcountry");
    if (cf && cf !== "XX") return cf.toUpperCase();

    const vercel = req.headers.get("x-vercel-ip-country");
    if (vercel) return vercel.toUpperCase();

    return null;
}

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // =========================
    // ADMIN-ONLY BLOG FLOW
    // =========================
    // Protect /admin/blog/* except /admin/blog/login
    if (pathname.startsWith("/admin/blog") && !pathname.startsWith("/admin/blog/login")) {
        const ok = req.cookies.get("blog_admin")?.value === "1";
        if (!ok) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/blog/login";
            url.searchParams.set("next", pathname);
            return NextResponse.redirect(url);
        }
    }

    // Continue request
    const res = NextResponse.next();

    // =========================
    // CURRENCY (IP/COUNTRY COOKIE)
    // =========================
    // If user already chose a currency, respect it.
    const existing = req.cookies.get("currency")?.value;
    if (existing) return res;

    const country = getCountry(req);
    const currency = (country && COUNTRY_TO_CURRENCY[country]) || "USD";

    res.cookies.set("currency", currency, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return res;
}
