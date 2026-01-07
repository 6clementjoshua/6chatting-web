// app/pricing/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

type Billing = "weekly" | "monthly" | "yearly";

type Currency = "NGN" | "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "ZAR" | "KES" | "GHS" | "XOF" | "XAF";

type PricingApi = {
    ok: boolean;
    billing: Billing;
    billingLabel: string;
    country: string; // "NG" etc or "unknown"
    currency: Currency;
    currencySource?: "geo" | "manual";
    fxRate: number;
    prices: Record<string, { billing: Billing; amount: number; amountNGN: number; currency: Currency }>;
    note?: string;
};

function formatByCurrency(amount: number, currency: string) {
    try {
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency,
            maximumFractionDigits: currency === "NGN" || currency === "XOF" || currency === "XAF" ? 0 : 2,
        }).format(amount);
    } catch {
        return `${currency} ${amount}`;
    }
}

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

/** ✅ Always logo (never “6”) */
function LogoBadge({ size = 36, className = "" }: { size?: number; className?: string }) {
    return (
        <div
            className={cx(
                "relative shrink-0 rounded-2xl border border-black/10 bg-white p-1",
                "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
                className
            )}
            style={{ width: size, height: size }}
        >
            <Image src="/6logo.PNG" alt="6chatting" fill sizes={`${size}px`} className="object-contain" />
        </div>
    );
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex max-w-full items-center justify-center rounded-full",
            "border border-black/10 bg-white/95 px-3 py-2",
            "text-xs font-semibold text-black/90 text-center leading-snug",
            "whitespace-normal break-words",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            className
        )}
    >
        {children}
    </span>
);

const Button = ({
    children,
    onClick,
    href,
    variant = "default",
    className = "",
    ariaLabel,
    type,
    disabled,
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    ariaLabel?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}) => {
    const base = "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    const cls = cx(base, variant === "primary" && primary, className);

    if (href) {
        return (
            <Link className={cls} href={href} aria-label={ariaLabel}>
                {children}
            </Link>
        );
    }

    return (
        <button className={cls} type={type ?? "button"} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
            {children}
        </button>
    );
};

function IconBadge({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2.9 20 6.6v6.4c0 5-3.4 8.3-8 10.5C7.4 21.3 4 18 4 13V6.6L12 2.9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M9.4 12.2 11.2 14l3.9-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconHandshake({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7.5 12.5 5 10l3-3 3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.5 12.5 19 10l-3-3-3.2 3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.2 13.2 10 15c.9.9 2.3.9 3.2 0l2.6-2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M7.8 13.6 9.2 15c1.6 1.6 4 1.6 5.6 0l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.55"
            />
        </svg>
    );
}

function IconBriefcase({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M5 9h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M3 13h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function IconGov({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 10 12 5l8 5v9H4v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 19v-6h8v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function IconBolt({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
    );
}

function IconGlobe({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M2 12h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path
                d="M12 2c3 2.8 5 6.8 5 10s-2 7.2-5 10c-3-2.8-5-6.8-5-10S9 4.8 12 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

type Tab = "personal" | "business";
type VerifyCategory = "personal" | "sole" | "elite" | "government";

const CURRENCY_LABELS: Record<Currency, string> = {
    NGN: "Nigerian Naira (₦)",
    USD: "US Dollar ($)",
    GBP: "British Pound (£)",
    EUR: "Euro (€)",
    CAD: "Canadian Dollar (C$)",
    AUD: "Australian Dollar (A$)",
    ZAR: "South African Rand (R)",
    KES: "Kenyan Shilling (KSh)",
    GHS: "Ghana Cedi (GH₵)",
    XOF: "CFA Franc (West) (CFA)",
    XAF: "CFA Franc (Central) (FCFA)",
};

type PlanKey = "personalFree" | "personalPremium" | "businessUnverified" | "businessGold" | "businessWhite";

export default function PricingPage() {
    const [waitlistOpen, setWaitlistOpen] = useState(false);

    const [tab, setTab] = useState<Tab>("personal");
    const [billing, setBilling] = useState<Billing>("monthly");
    const [verifyCategory, setVerifyCategory] = useState<VerifyCategory>("personal");

    // Server pricing response (IP-based country/currency)
    const [pricing, setPricing] = useState<PricingApi | null>(null);
    const [pricingLoading, setPricingLoading] = useState(false);
    const [pricingError, setPricingError] = useState<string | null>(null);

    // Currency UI (now driven by API)
    const [currency, setCurrency] = useState<Currency>("USD");
    const [autoCurrency, setAutoCurrency] = useState(true); // Auto = IP/Geo; Off = Manual override

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setPricingLoading(true);
            setPricingError(null);

            try {
                const qs = new URLSearchParams();
                qs.set("billing", billing);

                // If Auto is OFF, we send manual currency override to the API
                if (!autoCurrency) qs.set("currency", currency);

                const res = await fetch(`/api/pricing?${qs.toString()}`, { cache: "no-store" });
                const data = (await res.json()) as PricingApi;

                if (cancelled) return;

                setPricing(data);

                // When Auto is ON, always sync UI currency to whatever server detected
                if (autoCurrency && data?.currency) {
                    setCurrency(data.currency);
                }
            } catch {
                if (!cancelled) setPricingError("Failed to load regional pricing.");
            } finally {
                if (!cancelled) setPricingLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [billing, autoCurrency, currency]);

    const year = useMemo(() => new Date().getFullYear(), []);

    const billingLabel = billing === "weekly" ? "per week" : billing === "monthly" ? "per month" : "per year";

    function getPlanPrice(plan: PlanKey) {
        const p = pricing?.prices?.[plan];
        if (!p) return null;
        return p;
    }

    function displayPrice(plan: PlanKey) {
        const p = getPlanPrice(plan);
        if (!p) return pricingLoading ? "…" : "—";
        return formatByCurrency(p.amount, p.currency);
    }

    function displayPriceBoth(plan: PlanKey) {
        const p = getPlanPrice(plan);
        if (!p) return { primary: pricingLoading ? "…" : "—", secondary: "" };

        const primary = formatByCurrency(p.amount, p.currency);

        // If not NGN, show NGN base as reference (from API)
        const secondary =
            p.currency === "NGN" ? "" : `(${formatByCurrency(p.amountNGN, "NGN")} base)`;

        return { primary, secondary };
    }

    const detectedCountryLabel =
        pricing?.country && pricing.country !== "unknown" ? pricing.country : "Unknown";

    const countryNote = pricingLoading
        ? "Detecting your country from IP…"
        : pricingError
            ? pricingError
            : `Detected country: ${detectedCountryLabel}${autoCurrency ? " • Auto currency from IP" : " • Manual currency selected"}`;

    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            {/* HERO */}
            <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
                <BevelCard className="p-5 sm:p-7">
                    <Pill>Pricing • Premium translation, verified trust, and safe infrastructure</Pill>

                    <h1
                        className="mt-4 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Choose your level.
                        <br />
                        Pay for translation and trust.
                    </h1>

                    <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700 whitespace-normal break-words">
                        6chatting is built for real-time communication across languages—text, voice notes, and calls—while protecting users from
                        impersonation and unverified identities. Premium plans fund translation costs, call infrastructure, and trust protections.
                    </p>

                    {/* Tabs */}
                    <div className="mt-6 grid gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setTab("personal")}
                                className={cx(
                                    "rounded-2xl border border-black/10 bg-white/90 px-4 py-3",
                                    "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                                    "text-sm font-extrabold tracking-[-0.02em] whitespace-normal break-words",
                                    tab === "personal" && "ring-2 ring-black/10"
                                )}
                                style={{ fontFamily: "var(--font-display)" }}
                                aria-pressed={tab === "personal"}
                            >
                                Personal
                            </button>

                            <button
                                type="button"
                                onClick={() => setTab("business")}
                                className={cx(
                                    "rounded-2xl border border-black/10 bg-white/90 px-4 py-3",
                                    "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                                    "text-sm font-extrabold tracking-[-0.02em] whitespace-normal break-words",
                                    tab === "business" && "ring-2 ring-black/10"
                                )}
                                style={{ fontFamily: "var(--font-display)" }}
                                aria-pressed={tab === "business"}
                            >
                                Business
                            </button>
                        </div>

                        {/* Billing toggle */}
                        <div className="grid grid-cols-3 gap-2">
                            {(["weekly", "monthly", "yearly"] as Billing[]).map((b) => (
                                <button
                                    key={b}
                                    type="button"
                                    onClick={() => setBilling(b)}
                                    className={cx(
                                        "rounded-2xl border border-black/10 bg-white/90 px-3 py-2",
                                        "shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                                        "text-[13px] font-extrabold tracking-[-0.02em] whitespace-normal break-words",
                                        billing === b && "ring-2 ring-black/10"
                                    )}
                                    style={{ fontFamily: "var(--font-display)" }}
                                    aria-pressed={billing === b}
                                >
                                    {b === "weekly" ? "Weekly" : b === "monthly" ? "Monthly" : "Yearly"}
                                    {b === "yearly" ? (
                                        <span className="ml-2 inline-flex rounded-full border border-black/10 bg-white px-2 py-0.5 text-[11px] font-bold">
                                            Discount
                                        </span>
                                    ) : null}
                                </button>
                            ))}
                        </div>

                        {/* Currency controls (IP-based country detection) */}
                        <div className="mt-1 grid gap-2">
                            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                                <div className="rounded-2xl border border-black/10 bg-white/90 p-3 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <div className="text-[12.5px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                                Regional pricing
                                            </div>
                                            <div className="mt-1 text-[12px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                                                {countryNote}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] font-semibold text-neutral-700">Auto</span>
                                            <button
                                                type="button"
                                                onClick={() => setAutoCurrency((v) => !v)}
                                                className={cx(
                                                    "rounded-full border border-black/10 bg-white px-3 py-2 text-[12px] font-extrabold",
                                                    "shadow-[6px_6px_14px_rgba(0,0,0,0.08),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
                                                    autoCurrency && "ring-2 ring-black/10"
                                                )}
                                                aria-pressed={autoCurrency}
                                            >
                                                {autoCurrency ? "On" : "Off"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                                            <span className="text-neutral-600">Detected country:</span>{" "}
                                            <span className="font-extrabold">{detectedCountryLabel}</span>
                                            {pricing?.currencySource ? (
                                                <span className="ml-2 text-[12px] font-semibold text-neutral-500">
                                                    ({pricing.currencySource === "geo" ? "IP" : "Manual"})
                                                </span>
                                            ) : null}
                                        </div>

                                        <label className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                                            <span className="text-neutral-600">Currency:</span>{" "}
                                            <select
                                                className={cx("ml-2 bg-transparent font-extrabold outline-none", autoCurrency && "opacity-60")}
                                                value={currency}
                                                disabled={autoCurrency} // Auto mode = lock to detected currency
                                                onChange={(e) => {
                                                    const next = e.target.value as Currency;
                                                    setCurrency(next);
                                                    setAutoCurrency(false); // switching dropdown implies manual override
                                                }}
                                                aria-label="Select currency"
                                            >
                                                {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
                                                    <option key={c} value={c}>
                                                        {CURRENCY_LABELS[c]}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                </div>

                                <BevelCard className="p-4 sm:p-5">
                                    <div className="flex items-start gap-2">
                                        <span className="text-black">
                                            <IconGlobe />
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                                Why premium is “safe priced”
                                            </div>
                                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.7]">
                                                Translation (text + voice + calls) has real infrastructure costs. These plans are priced to protect 6chatting from losses
                                                while delivering a luxury experience: quality translation, low latency calls, and faster trust enforcement.
                                            </div>
                                        </div>
                                    </div>
                                </BevelCard>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Pill>
                                    <span className="mr-2 text-black">
                                        <IconBolt />
                                    </span>
                                    Real-time translation funding
                                </Pill>
                                <Pill>Verified reputation</Pill>
                                <Pill>Anti-impersonation protection</Pill>
                                <Pill>Priority support</Pill>
                            </div>
                        </div>
                    </div>
                </BevelCard>

                {/* Right: Trust + “what you pay for” */}
                <div className="grid gap-4">
                    <BevelCard className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                    What premium pays for
                                </div>
                                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                                    Users should understand the value clearly: translation quality, call stability, and trust enforcement.
                                </div>
                            </div>
                            <LogoBadge />
                        </div>

                        <div className="mt-4 grid gap-2">
                            {[
                                {
                                    title: "Translation engine cost",
                                    desc: "Text translation, voice-note translation, and live call translation. High usage requires paid allocation.",
                                    icon: <IconGlobe />,
                                },
                                {
                                    title: "Call infrastructure",
                                    desc: "Low-latency routing, bandwidth, and session security for voice/video calling and realtime audio translation.",
                                    icon: <IconBolt />,
                                },
                                {
                                    title: "Trust & safety operations",
                                    desc: "Identity checks, anti-impersonation monitoring, and priority takedown workflows for verified accounts.",
                                    icon: <IconBadge />,
                                },
                                {
                                    title: "Business reliability",
                                    desc: "Better rate limits, higher translation allocation for customer chats, and priority support escalation.",
                                    icon: <IconBriefcase />,
                                },
                            ].map((x) => (
                                <div
                                    key={x.title}
                                    className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-black">{x.icon}</span>
                                        <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                            {x.title}
                                        </div>
                                    </div>
                                    <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">{x.desc}</div>
                                </div>
                            ))}
                        </div>
                    </BevelCard>

                    <BevelCard className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                    Verification & reputation (live)
                                </div>
                                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                                    Badges on 6chatting are not decoration. They communicate trust and unlock protections.
                                </div>
                            </div>
                            <LogoBadge />
                        </div>

                        <div className="mt-4 grid gap-2">
                            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="flex items-center gap-2">
                                    <IconBadge />
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        🔵 Blue Tick (Personal only)
                                    </div>
                                </div>
                                <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">
                                    Verified identity for individuals. Builds trust and reduces impersonation.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="flex items-center gap-2">
                                    <IconHandshake />
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        🟡 Gold Tick (Business – verified sole proprietor)
                                    </div>
                                </div>
                                <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">
                                    For small businesses and individual operators. Verified business identity + customer trust tools.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="flex items-center gap-2">
                                    <IconBriefcase />
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        ⚪ White Tick (Business – elite brands)
                                    </div>
                                </div>
                                <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">
                                    Highest level on 6chatting. Reserved for major reputable brands and approved elite businesses.
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="flex items-center gap-2">
                                    <IconGov />
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        Government / Public Office
                                    </div>
                                </div>
                                <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">
                                    A special verification classification (not a paid badge). Approved accounts carry an affiliation notice.
                                </div>
                            </div>
                        </div>
                    </BevelCard>
                </div>
            </section>

            {/* PRICING CARDS */}
            <section className="pt-8 sm:pt-10">
                {tab === "personal" ? (
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Personal Free */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Personal — Free
                                    </div>
                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">For everyday chat with limited translation.</div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4">
                                <div className="text-[30px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                    {displayPrice("personalFree")}
                                </div>
                                <div className="mt-1 text-[12.5px] font-semibold text-neutral-600">Always free</div>
                            </div>

                            <div className="mt-4 grid gap-2">
                                {["Standard messaging", "Limited text translation (fair use)", "Basic media sharing", "Standard support", "No verified badge"].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button href="/personal" className="w-full">
                                    Learn more
                                </Button>
                            </div>
                        </BevelCard>

                        {/* Personal Premium (Blue Tick) */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">Most chosen</span>
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">🔵 Blue Tick</span>
                                    </div>

                                    <div className="mt-2 text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Personal — Premium
                                    </div>

                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                        Family and friends, global conversation, and verified identity.
                                    </div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4">
                                {(() => {
                                    const p = displayPriceBoth("personalPremium");
                                    return (
                                        <>
                                            <div className="text-[30px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                                {p.primary}
                                            </div>
                                            <div className="mt-1 text-[12.5px] font-semibold text-neutral-600">
                                                {billingLabel} {billing === "yearly" ? "• discounted" : ""}
                                                {p.secondary ? <span className="ml-2 text-[12px] font-semibold text-neutral-500">{p.secondary}</span> : null}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="mt-4 grid gap-2">
                                {[
                                    "🔵 Blue Tick (verified identity)",
                                    "High-quality real-time text translation (higher allocation)",
                                    "Voice-note translation (higher allocation)",
                                    "Call translation (fair-use allocation)",
                                    "Spam + impersonation protection boost",
                                    "Multi-device sync",
                                    "Advanced privacy controls",
                                    "Priority support",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                    Subscribe to Personal Premium
                                </Button>
                                <Button href="#verification" className="w-full">
                                    Apply for verification
                                </Button>
                            </div>

                            <div className="mt-3 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                Fair-use note: translation allocation is designed to cover normal personal usage. Extremely heavy usage may be rate-limited to protect platform stability.
                            </div>
                        </BevelCard>

                        {/* Personal: Government note card */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Government / Public Office
                                    </div>
                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                        A special classification for approved public officials and institutional accounts.
                                    </div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4 grid gap-2">
                                {[
                                    "Uses Personal account foundation",
                                    "Carries a government affiliation notice when approved",
                                    "Not purchasable — approval after strict review",
                                    "Added protections against impersonation",
                                    "Clear badge description when users tap the badge",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button href="#verification" className="w-full">
                                    See requirements
                                </Button>
                            </div>
                        </BevelCard>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Business Unverified */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Business — Unverified
                                    </div>
                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                        Chat normally, but business protections and reputation are locked until verified.
                                    </div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4">
                                <div className="text-[30px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                    {displayPrice("businessUnverified")}
                                </div>
                                <div className="mt-1 text-[12.5px] font-semibold text-neutral-600">Chat access only</div>
                            </div>

                            <div className="mt-4 grid gap-2">
                                {[
                                    "Standard chatting (no business badge)",
                                    "Limited reputation visibility",
                                    "No verified search/visibility boost",
                                    "No business protection tools",
                                    "Apply for verification to unlock business features",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button href="#verification" className="w-full">
                                    Apply for business verification
                                </Button>
                                <Button href="/business" className="w-full">
                                    Business overview
                                </Button>
                            </div>
                        </BevelCard>

                        {/* Business Gold */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">🟡 Gold Tick</span>
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">Best for SMEs</span>
                                    </div>

                                    <div className="mt-2 text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Business — Verified Sole Proprietor
                                    </div>

                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                        Verified small businesses, freelancers, vendors, and operators.
                                    </div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4">
                                {(() => {
                                    const p = displayPriceBoth("businessGold");
                                    return (
                                        <>
                                            <div className="text-[30px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                                {p.primary}
                                            </div>
                                            <div className="mt-1 text-[12.5px] font-semibold text-neutral-600">
                                                {billingLabel} {billing === "yearly" ? "• discounted" : ""}
                                                {p.secondary ? <span className="ml-2 text-[12px] font-semibold text-neutral-500">{p.secondary}</span> : null}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="mt-4 grid gap-2">
                                {[
                                    "🟡 Gold Tick (verified business identity)",
                                    "Business profile: category, description, contact, hours",
                                    "Higher translation allocation for customer conversations",
                                    "Voice-note translation for customer orders/support",
                                    "Call translation allocation for sales/support calls",
                                    "Business anti-impersonation monitoring + faster takedown review",
                                    "Invoice/contact quick-actions inside chat",
                                    "Priority support",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                    Subscribe to Gold Tick
                                </Button>
                                <Button href="#verification" className="w-full">
                                    See requirements
                                </Button>
                            </div>

                            <div className="mt-3 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                Gold is designed to keep you safe from translation + call costs while you scale. It is priced for serious business usage (customer support, orders, cross-border clients).
                            </div>
                        </BevelCard>

                        {/* Business White */}
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">⚪ White Tick</span>
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">Elite</span>
                                    </div>

                                    <div className="mt-2 text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        Business — Elite Brand Verification
                                    </div>

                                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                        Reserved for reputable top brands and approved elite businesses.
                                    </div>
                                </div>
                                <LogoBadge />
                            </div>

                            <div className="mt-4">
                                {(() => {
                                    const p = displayPriceBoth("businessWhite");
                                    return (
                                        <>
                                            <div className="text-[30px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                                {p.primary}
                                            </div>
                                            <div className="mt-1 text-[12.5px] font-semibold text-neutral-600">
                                                {billingLabel} {billing === "yearly" ? "• discounted" : ""}
                                                {p.secondary ? <span className="ml-2 text-[12px] font-semibold text-neutral-500">{p.secondary}</span> : null}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="mt-4 grid gap-2">
                                {[
                                    "⚪ White Tick (elite trust + reputation protection)",
                                    "Maximum translation quality tier + highest allocation",
                                    "Higher concurrency: more customer chats at once",
                                    "Priority routing for calls + improved stability",
                                    "Faster impersonation takedown escalation",
                                    "Dedicated escalation support channel",
                                    "Brand protection: verified name enforcement + reserved identity checks",
                                    "Exclusive business trust visibility across the platform",
                                ].map((t) => (
                                    <div
                                        key={t}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                    Request White Tick Review
                                </Button>
                                <Button href="#verification" className="w-full">
                                    See requirements
                                </Button>
                            </div>

                            <div className="mt-3 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                White Tick is intentionally “luxury priced” to protect 6chatting against heavy enterprise translation and call usage. It is not meant for small businesses.
                            </div>
                        </BevelCard>
                    </div>
                )}
            </section>

            {/* “EXPLANATION” SECTION — make it personal + business explanatory */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Pill>What you’re paying for • Clear breakdown</Pill>
                            <h2 className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                Transparent value, not confusion.
                            </h2>
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                Premium on 6chatting is designed around a simple truth: translation and calls cost money. Your subscription pays for translation allocation, call infrastructure, and reputation protection—so the platform stays stable, safe, and high quality.
                            </p>
                        </div>
                        <LogoBadge />
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                        {[
                            {
                                title: "Personal plans",
                                desc: "Best for individuals who want verified identity, better translation quality, and safer conversations. You pay to unlock higher translation allocation, voice-note translation, and call translation.",
                                bullets: ["Verified identity (Blue Tick)", "Better translation allocation", "Call translation allocation", "Priority support & safety"],
                                icon: <IconBadge />,
                            },
                            {
                                title: "Business plans",
                                desc: "Best for sellers and brands who chat with customers across languages. You pay to unlock business trust features, higher translation allocation, and faster protection against impersonation.",
                                bullets: ["Verified business identity (Gold/White)", "Higher customer translation allocation", "Call translation allocation for sales/support", "Business protections + escalation"],
                                icon: <IconBriefcase />,
                            },
                            {
                                title: "Why prices are premium",
                                desc: "Luxury pricing ensures 6chatting can pay for translation and calls without running at a loss—especially when users use voice and call translation heavily.",
                                bullets: ["Sustains infrastructure", "Avoids quality drop", "Funds trust review", "Protects reliability"],
                                icon: <IconBolt />,
                            },
                        ].map((c) => (
                            <div key={c.title} className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-black">{c.icon}</span>
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        {c.title}
                                    </div>
                                </div>
                                <div className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">{c.desc}</div>
                                <div className="mt-3 grid gap-2">
                                    {c.bullets.map((b) => (
                                        <div
                                            key={b}
                                            className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                        >
                                            {b}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                        <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                            Billing policy (simple)
                        </div>
                        <div className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">
                            Translation and call translation are offered as allocations inside each plan. This keeps pricing predictable and protects the platform. If usage becomes extreme, 6chatting may apply fair-use limits to maintain quality for everyone. Verified business accounts receive higher allocations and priority handling.
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* VERIFICATION FLOW (CATEGORY SELECTOR + REQUIREMENTS) */}
            <section id="verification" className="pt-8 sm:pt-10 scroll-mt-24">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Pill>Verification flow • Category-based requirements</Pill>
                            <h2 className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                Apply for verification.
                            </h2>
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                Verification on 6chatting is structured by category. You can chat normally without verification, but verified reputation unlocks protections, visibility, and advanced experience levels. Select your category to see what you are expected to provide.
                            </p>
                        </div>
                        <LogoBadge />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_.9fr]">
                        {/* Category selector */}
                        <div className="grid gap-3">
                            <div className="water-inset rounded-3xl p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        Choose verification category
                                    </div>
                                    <LogoBadge size={34} />
                                </div>

                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {[
                                        { key: "personal", label: "Personal (Blue Tick)", icon: <IconBadge /> },
                                        { key: "government", label: "Government / Public Office", icon: <IconGov /> },
                                        { key: "sole", label: "Business — Sole Proprietor (Gold)", icon: <IconHandshake /> },
                                        { key: "elite", label: "Business — Elite Brand (White)", icon: <IconBriefcase /> },
                                    ].map((c) => (
                                        <button
                                            key={c.key}
                                            type="button"
                                            onClick={() => setVerifyCategory(c.key as VerifyCategory)}
                                            className={cx(
                                                "rounded-2xl border border-black/10 bg-white/90 p-4 text-left",
                                                "shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                                                "transition-transform duration-200 active:scale-[0.99]",
                                                verifyCategory === (c.key as VerifyCategory) && "ring-2 ring-black/10"
                                            )}
                                            aria-pressed={verifyCategory === (c.key as VerifyCategory)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-black">{c.icon}</span>
                                                <div className="text-[13px] font-extrabold whitespace-normal break-words" style={{ fontFamily: "var(--font-display)" }}>
                                                    {c.label}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                                                {c.key === "personal" && "Verified identity for individuals. Personal accounts only."}
                                                {c.key === "government" && "Strict affiliation review. Not purchasable. Adds a government notice."}
                                                {c.key === "sole" && "For sole operators. Unlocks verified business tools and protections."}
                                                {c.key === "elite" && "Highest business tier. Reserved for reputable top brands."}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                    <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                        Start application
                                    </Button>
                                    <Button href="/help" className="w-full">
                                        Need help?
                                    </Button>
                                </div>

                                <div className="mt-3 text-[12px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.7]">
                                    Safety: we never ask for passwords or OTP codes. Verification requires documents and secure identity checks.
                                </div>
                            </div>
                        </div>

                        {/* Requirements panel */}
                        <div className="grid gap-3">
                            <BevelCard className="p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                            Requirements for:{" "}
                                            {verifyCategory === "personal"
                                                ? "Personal (Blue Tick)"
                                                : verifyCategory === "government"
                                                    ? "Government / Public Office"
                                                    : verifyCategory === "sole"
                                                        ? "Business — Sole Proprietor (Gold)"
                                                        : "Business — Elite Brand (White)"}
                                        </div>
                                        <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                                            Provide only official documents. Submissions are reviewed to protect users from impersonation and fraud.
                                        </div>
                                    </div>
                                    <LogoBadge size={34} />
                                </div>

                                <div className="mt-4 grid gap-2">
                                    {verifyCategory === "personal" && (
                                        <>
                                            {[
                                                "Government-issued ID (Passport / National ID / Driver’s License)",
                                                "Live identity check (selfie / liveness)",
                                                "Full legal name matching ID",
                                                "Country and basic profile details",
                                            ].map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                            <div className="mt-2 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                                🔵 Blue Tick confirms your identity and reduces impersonation.
                                            </div>
                                        </>
                                    )}

                                    {verifyCategory === "sole" && (
                                        <>
                                            {[
                                                "Government-issued ID for the owner/admin",
                                                "Business name and category",
                                                "Proof of business activity (optional but recommended)",
                                                "Contact info and business description",
                                                "Additional review for safety and authenticity",
                                            ].map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                            <div className="mt-2 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                                🟡 Gold Tick unlocks business tools and protections. Business accounts can chat without verification, but reputation and business protections remain locked until approved.
                                            </div>
                                        </>
                                    )}

                                    {verifyCategory === "elite" && (
                                        <>
                                            {[
                                                "Company registration documents (official)",
                                                "Government-issued ID for the authorized representative",
                                                "Brand ownership proof (where applicable)",
                                                "Official website and domain email (recommended)",
                                                "Enhanced review for reputation and authenticity",
                                                "Approval is selective (elite level)",
                                            ].map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                                >
                                                    {t}
                                                </div>
                                            ))}
                                            <div className="mt-2 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                                ⚪ White Tick is the highest business level on 6chatting. It is reserved for reputable top brands and comes with exclusive protections, visibility advantages, and priority handling.
                                            </div>
                                        </>
                                    )}

                                    {verifyCategory === "government" && (
                                        <>
                                            {[
                                                "Government-issued ID (Passport / National ID / Driver’s License)",
                                                "Official appointment or employment letter",
                                                "Office / department name",
                                                "Role / title held",
                                                "Official government email (if available)",
                                                "Supporting government document (where applicable)",
                                            ].map((t) => (
                                                <div
                                                    key={t}
                                                    className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                                >
                                                    {t}
                                                </div>
                                            ))}

                                            <div className="mt-2 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                                Government / Public Office verification is a classification (not a purchasable badge). Approved accounts carry a visible affiliation notice for transparency and safety.
                                            </div>

                                            <div className="rounded-2xl border border-black/10 bg-white/90 p-4 text-[12px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.75] shadow-[10px_10px_22px_rgba(0,0,0,0.05),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                                Disclaimer: 6chatting does not represent or speak for any government. Statements remain the responsibility of the account holder. Affiliation labels are used for transparency and safety.
                                            </div>
                                        </>
                                    )}
                                </div>
                            </BevelCard>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* FAQ */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Pill>FAQ</Pill>
                            <h3 className="mt-3 text-xl font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                                Common questions
                            </h3>
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                Clear answers on pricing, currency display, verification, and why premium exists.
                            </p>
                        </div>
                        <LogoBadge />
                    </div>

                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {[
                            {
                                q: "Can you show currency automatically based on IP address?",
                                a: "Yes. This page calls a server endpoint that reads geo headers (Cloudflare/Vercel) to detect country and select currency.",
                            },
                            {
                                q: "Why is Premium required for high translation usage?",
                                a: "Real-time translation (especially voice and call translation) has ongoing infrastructure costs. Premium funds that cost so quality stays high and stable.",
                            },
                            {
                                q: "Can an unverified business account still chat?",
                                a: "Yes. Unverified business accounts can chat normally, but verification protections, trust visibility, and business tools remain locked until approved.",
                            },
                            {
                                q: "Can personal accounts get Gold or White ticks?",
                                a: "No. Gold and White ticks are for Business accounts only. Personal accounts can obtain the Blue tick through verified identity.",
                            },
                        ].map((item) => (
                            <div
                                key={item.q}
                                className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                            >
                                <div className="text-[13.5px] font-extrabold whitespace-normal break-words" style={{ fontFamily: "var(--font-display)" }}>
                                    {item.q}
                                </div>
                                <div className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">{item.a}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Button href="/policies/subscription-billing" className="px-5">
                            Subscription & Billing
                        </Button>
                        <Button href="/policies/refunds" className="px-5">
                            Refund & Cancellation
                        </Button>
                        <Button href="/help" className="px-5">
                            Help Center
                        </Button>
                    </div>
                </BevelCard>
            </section>

            <footer className="pt-10 text-neutral-700">
                <div className="border-t border-black/10 pt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </Link>
                        <Link href="/policies/subscription-billing" target="_blank" rel="noopener noreferrer">
                            Subscription & Billing
                        </Link>
                        <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer">
                            Refund & Cancellation
                        </Link>
                        <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                            Acceptable Use
                        </Link>
                        <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">
                            Contact
                        </Link>
                    </div>

                    <div className="mt-5 text-center text-xs font-normal text-neutral-600">
                        © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span> All rights reserved.
                    </div>
                </div>
            </footer>

            <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

            <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .water-bevel {
            transform: translateZ(0);
          }
        }
      `}</style>
        </main>
    );
}
