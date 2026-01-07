// app/api/pricing/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // fast + can read geo-ish headers at the edge

type Billing = "weekly" | "monthly" | "yearly";
type Currency = "NGN" | "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "ZAR" | "KES" | "GHS" | "XOF" | "XAF";

const DEFAULT_CURRENCY: Currency = "USD";

const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
    NG: "NGN",
    US: "USD",
    GB: "GBP",
    CA: "CAD",
    AU: "AUD",
    ZA: "ZAR",
    KE: "KES",
    GH: "GHS",

    // Euro-zone examples
    FR: "EUR",
    DE: "EUR",
    ES: "EUR",
    IT: "EUR",
    NL: "EUR",
    BE: "EUR",
    IE: "EUR",
    PT: "EUR",

    // West Africa CFA
    SN: "XOF",
    CI: "XOF",
    BJ: "XOF",
    BF: "XOF",
    ML: "XOF",

    // Central Africa CFA
    CM: "XAF",
    GA: "XAF",
    TD: "XAF",
    CG: "XAF",
    CF: "XAF",
};

const ALLOWED_CURRENCIES: readonly Currency[] = [
    "NGN",
    "USD",
    "GBP",
    "EUR",
    "CAD",
    "AUD",
    "ZAR",
    "KES",
    "GHS",
    "XOF",
    "XAF",
] as const;

function isCurrency(v: string | null): v is Currency {
    if (!v) return false;
    return (ALLOWED_CURRENCIES as readonly string[]).includes(v.toUpperCase());
}

function getCountryFromHeaders(req: NextRequest): string | null {
    // Cloudflare
    const cf = req.headers.get("cf-ipcountry");
    if (cf && cf !== "XX") return cf.toUpperCase();

    // Vercel
    const vercel = req.headers.get("x-vercel-ip-country");
    if (vercel && vercel !== "XX") return vercel.toUpperCase();

    // Generic proxies sometimes
    const geo = req.headers.get("x-geo-country");
    if (geo && geo !== "XX") return geo.toUpperCase();

    return null;
}

function currencyFromCountry(country: string | null): Currency {
    if (!country) return DEFAULT_CURRENCY;
    return COUNTRY_TO_CURRENCY[country] ?? DEFAULT_CURRENCY;
}

/**
 * FX strategy:
 * - For real money conversion, use a reliable FX provider (server-side).
 * - For now, conservative static FX table to avoid breaking UI.
 * - Replace with live FX later (stored daily in KV/DB/Edge cache).
 */
const FX_FROM_NGN: Record<Currency, number> = {
    NGN: 1,
    USD: 1 / 1600,
    GBP: 1 / 2000,
    EUR: 1 / 1750,
    CAD: 1 / 1200,
    AUD: 1 / 1050,
    ZAR: 1 / 85,
    KES: 1 / 12,
    GHS: 1 / 130,
    XOF: 1 / 2.7,
    XAF: 1 / 2.7,
};

const PRICES_NGN = {
    personalFree: { weekly: 0, monthly: 0, yearly: 0 },
    personalPremium: { weekly: 2500, monthly: 9500, yearly: 99000 },

    businessUnverified: { weekly: 0, monthly: 0, yearly: 0 },
    businessGold: { weekly: 15000, monthly: 55000, yearly: 580000 },
    businessWhite: { weekly: 250000, monthly: 950000, yearly: 10000000 },
} as const;

function assertBilling(v: string | null): Billing {
    if (v === "weekly" || v === "monthly" || v === "yearly") return v;
    return "monthly";
}

function toMoney(n: number) {
    // keep raw numeric; client formats by Intl
    return Math.round(n * 100) / 100;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const billing = assertBilling(searchParams.get("billing"));

    // ✅ Optional manual currency override: /api/pricing?billing=monthly&currency=USD
    const currencyParam = searchParams.get("currency");
    const hasManualCurrency = isCurrency(currencyParam);

    const country = getCountryFromHeaders(req);
    const geoCurrency = currencyFromCountry(country);

    const currency: Currency = hasManualCurrency ? (currencyParam!.toUpperCase() as Currency) : geoCurrency;

    const fxRate = FX_FROM_NGN[currency] ?? 1;

    // Convert plan prices from NGN -> selected currency
    const prices = Object.fromEntries(
        Object.entries(PRICES_NGN).map(([planKey, byBilling]) => {
            const ngn = (byBilling as any)[billing] as number;
            const converted = currency === "NGN" ? ngn : ngn * fxRate;

            return [
                planKey,
                {
                    billing,
                    amount: toMoney(converted),
                    amountNGN: ngn,
                    currency,
                },
            ];
        })
    );

    const billingLabel = billing === "weekly" ? "per week" : billing === "monthly" ? "per month" : "per year";

    return NextResponse.json(
        {
            ok: true,
            billing,
            billingLabel,
            country: country ?? "unknown",

            // currency returned is what UI should display
            currency,
            currencySource: hasManualCurrency ? "manual" : "geo",

            // FX info (still static here)
            fxRate,

            prices,

            note:
                "FX is currently from a conservative static table. Replace with live FX for exact conversions. Geo/country derived from CF-IPCountry or Vercel headers.",
        },
        {
            headers: {
                // Edge caching (still safe because Vary splits by country headers)
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",

                // Important for correct caching between countries on edge/CDN
                Vary: "cf-ipcountry, x-vercel-ip-country, x-geo-country",
            },
        }
    );
}
