"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex items-center justify-center rounded-full",
            "border border-black/10 bg-white/95 px-3 py-2",
            "text-xs font-medium text-black/90",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            "max-w-full",
            className
        )}
    >
        <span className="truncate">{children}</span>
    </span>
);

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
    children,
    href,
    onClick,
    variant = "default",
    className = "",
    ariaLabel,
    disabled,
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    ariaLabel?: string;
    disabled?: boolean;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    const cls = cx(
        base,
        variant === "primary" && primary,
        className,
        disabled && "opacity-60 pointer-events-none cursor-not-allowed"
    );

    if (href) {
        return (
            <Link className={cls} href={href} aria-label={ariaLabel}>
                {children}
            </Link>
        );
    }

    return (
        <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
            {children}
        </button>
    );
};

type Currency = "USD" | "NGN";

const PRESETS_USD = [10, 25, 50, 100, 250];
const PRESETS_NGN = [2000, 5000, 10000, 25000, 50000];

function formatMoney(amount: number, currency: Currency) {
    try {
        return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
    } catch {
        return `${currency} ${amount.toLocaleString()}`;
    }
}

function isPositiveIntString(s: string) {
    if (!s) return false;
    if (!/^\d+$/.test(s)) return false;
    const n = Number(s);
    return Number.isFinite(n) && n > 0;
}

export default function SupportPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [currency, setCurrency] = useState<Currency>("USD");
    const presets = currency === "USD" ? PRESETS_USD : PRESETS_NGN;

    const [presetAmount, setPresetAmount] = useState<number>(presets[1] ?? presets[0] ?? 25);
    const [customAmount, setCustomAmount] = useState<string>("");

    const [supporterName, setSupporterName] = useState<string>("");
    const [supporterEmail, setSupporterEmail] = useState<string>("");
    const [note, setNote] = useState<string>("");

    // ✅ Founding Supporter recognition (optional)
    const [recognize, setRecognize] = useState<boolean>(false);
    const [displayName, setDisplayName] = useState<string>("Anonymous");


    const [paying, setPaying] = useState<null | "stripe" | "flutterwave">(null);
    const [error, setError] = useState<string>("");

    // Amount calculation
    const computedAmount = (() => {
        if (isPositiveIntString(customAmount.trim())) return Math.floor(Number(customAmount.trim()));
        return presetAmount;
    })();

    const minAmount = currency === "USD" ? 5 : 1000;
    const amountOk = computedAmount >= minAmount;

    const commonPayload = {
        currency,
        amount: computedAmount,
        name: supporterName.trim() || undefined,
        email: supporterEmail.trim() || undefined,
        note: note.trim() || undefined,

        // ✅ recognition
        recognize,
        displayName: recognize ? (displayName.trim() || "Anonymous") : undefined,

        source: "support_page",
    };


    async function postAndRedirect(path: string, provider: "stripe" | "flutterwave") {
        setError("");
        if (!amountOk) {
            setError(`Amount must be at least ${formatMoney(minAmount, currency)}.`);
            return;
        }

        try {
            setPaying(provider);

            const res = await fetch(path, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commonPayload),
            });

            let data: any = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok) {
                const msg = data?.error || `Payment request failed (${res.status}).`;
                setError(msg);
                setPaying(null);
                return;
            }

            if (!data?.url) {
                setError("Payment link was not returned. Please try again.");
                setPaying(null);
                return;
            }

            window.location.assign(data.url);
        } catch (e: any) {
            setError(e?.message || "Something went wrong. Please try again.");
            setPaying(null);
        }
    }


    return (
        <div
            className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-black antialiased")}
            style={{
                fontFamily:
                    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <main
                className={cx("mx-auto w-[min(1120px,calc(100%-24px))] pb-12", "pt-16 sm:pt-18 md:pt-20")}
                style={{ paddingTop: "calc(var(--header-h, 64px) + 10px)" }}
            >
                {/* Hero */}
                <section>
                    <BevelCard className="p-5 sm:p-7">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-2">
                                <Pill>Optional support</Pill>
                                <Pill>Founding Supporters</Pill>
                                <Pill>Receipts provided</Pill>
                            </div>

                            <h1
                                className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Support the build of 6chatting
                            </h1>

                            <p className="max-w-3xl text-[14.5px] sm:text-[15px] leading-[1.75] text-neutral-700">
                                6chatting is building a premium real-time translation experience for text, voice, and calls. If you
                                believe in global communication without language barriers, you can support the infrastructure and launch
                                readiness as a Founding Supporter.
                            </p>

                            <div className="rounded-2xl border border-black/10 bg-white/95 p-4">
                                <div className="text-[13px] font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Transparency
                                </div>
                                <ul className="mt-2 grid gap-1.5 text-[13.5px] leading-[1.65] text-neutral-700">
                                    <li>• Support is optional and does not purchase equity, ownership, or securities of any kind.</li>
                                    <li>• This page is not an investment offering. Do not contribute expecting profits or returns.</li>
                                    <li>• You will receive a payment receipt/confirmation from the processor.</li>
                                </ul>
                            </div>
                        </div>
                    </BevelCard>
                </section>

                {/* Support form */}
                <section className="pt-7 sm:pt-8">
                    <div className="grid gap-4 md:grid-cols-[1.05fr_.95fr] md:items-start">
                        {/* Left */}
                        <BevelCard className="p-5 sm:p-7">
                            <h2
                                className="text-[clamp(18px,2.6vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Choose your support amount
                            </h2>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-semibold text-neutral-700">Currency:</span>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrency("USD");
                                        setPresetAmount(PRESETS_USD[1] ?? 25);
                                        setCustomAmount("");
                                        setError("");
                                    }}
                                    className={cx(
                                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                                        currency === "USD" ? "border-black/20 bg-black/5" : "border-black/10 bg-white hover:bg-black/3"
                                    )}
                                >
                                    USD
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrency("NGN");
                                        setPresetAmount(PRESETS_NGN[1] ?? 5000);
                                        setCustomAmount("");
                                        setError("");
                                    }}
                                    className={cx(
                                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                                        currency === "NGN" ? "border-black/20 bg-black/5" : "border-black/10 bg-white hover:bg-black/3"
                                    )}
                                >
                                    NGN
                                </button>

                                <span className="ml-auto text-xs font-semibold text-neutral-600">
                                    Minimum: {formatMoney(minAmount, currency)}
                                </span>
                            </div>

                            {/* Presets: premium + never-squeeze layout */}
                            <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                                {presets.map((amt) => {
                                    const active = customAmount.trim() === "" && presetAmount === amt;
                                    return (
                                        <button
                                            key={amt}
                                            type="button"
                                            onClick={() => {
                                                setPresetAmount(amt);
                                                setCustomAmount("");
                                                setError("");
                                            }}
                                            className={cx(
                                                "support-amt-btn",
                                                "relative w-full rounded-2xl border px-3 py-3 text-center transition-all duration-200",
                                                "min-h-[58px]",
                                                active ? "border-black/25" : "border-black/10 hover:border-black/20"
                                            )}
                                            aria-pressed={active}
                                            aria-label={`Select ${formatMoney(amt, currency)}`}
                                        >
                                            <div className={cx("support-amt-glow", active && "support-amt-glow--on")} />

                                            <div className="flex flex-col items-center justify-center gap-1">
                                                <div className="text-[11.5px] font-semibold text-neutral-600 leading-none">Preset</div>

                                                <div
                                                    className="support-amt-value text-[15px] sm:text-[16px] font-extrabold tracking-[-0.02em] text-black leading-none"
                                                    style={{ fontFamily: "var(--font-display)" }}
                                                >
                                                    {formatMoney(amt, currency)}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Custom + Total */}
                            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr]">
                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Custom amount</label>
                                    <input
                                        value={customAmount}
                                        onChange={(e) => {
                                            setCustomAmount(e.target.value.replace(/[^\d]/g, ""));
                                            setError("");
                                        }}
                                        inputMode="numeric"
                                        placeholder={currency === "USD" ? "e.g. 75" : "e.g. 15000"}
                                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                    />
                                    <div className="mt-1 text-[12px] text-neutral-600">If filled, custom amount overrides presets.</div>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Total</label>
                                    <div
                                        className="mt-2 text-[22px] font-extrabold tracking-[-0.02em] text-black"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {formatMoney(computedAmount, currency)}
                                    </div>
                                    {!amountOk ? (
                                        <div className="mt-1 text-[12px] font-semibold text-red-600">
                                            Amount must be at least {formatMoney(minAmount, currency)}.
                                        </div>
                                    ) : (
                                        <div className="mt-1 text-[12px] text-neutral-600">Thank you for supporting the build.</div>
                                    )}
                                </div>
                            </div>

                            {/* Name/email */}
                            {/* ✅ Founding Supporter recognition */}
                            <div className="mt-2 rounded-2xl border border-black/10 bg-white p-3">
                                <label className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={recognize}
                                        onChange={(e) => {
                                            const next = e.target.checked;
                                            setRecognize(next);
                                            setError("");
                                            if (next && !displayName.trim()) setDisplayName("Anonymous");
                                        }}
                                        className="mt-1 h-4 w-4 rounded border-black/20"
                                    />

                                    <span className="flex-1">
                                        <span
                                            className="block text-[13px] font-extrabold text-black"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            Recognize me as a Founding Supporter (optional)
                                        </span>

                                        <span className="mt-0.5 block text-[12.5px] leading-[1.6] text-neutral-600">
                                            If enabled, your display name may appear on a Founding Supporters page after your payment succeeds.
                                            Default is <span className="font-semibold">Anonymous</span>.
                                        </span>
                                    </span>
                                </label>

                                {recognize ? (
                                    <div className="mt-3 rounded-2xl border border-black/10 bg-white p-3">
                                        <label className="text-xs font-bold text-neutral-700">Display name</label>
                                        <input
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="Anonymous"
                                            maxLength={40}
                                            className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                        />
                                        <div className="mt-1 text-[12px] text-neutral-600">
                                            Keep it simple (e.g., “Clement J.”, “Ada”, “6chatting Supporter”). No @handles.
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <div className="mt-2 rounded-2xl border border-black/10 bg-white p-3">
                                <label className="text-xs font-bold text-neutral-700">Message (optional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Share why you support the mission (optional)."
                                    rows={3}
                                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                />
                            </div>

                            {/* Error banner */}
                            {error ? (
                                <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                                    {error}
                                </div>
                            ) : null}

                            {/* Pay buttons */}
                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => postAndRedirect("/api/pay/stripe", "stripe")}
                                    ariaLabel="Pay with Stripe"
                                    disabled={!amountOk || paying !== null}
                                >
                                    {paying === "stripe" ? "Redirecting to Stripe…" : "Support with Card (Stripe)"}
                                </Button>

                                <Button
                                    className="w-full"
                                    onClick={() => postAndRedirect("/api/pay/flutterwave", "flutterwave")}
                                    ariaLabel="Pay with Flutterwave"
                                    disabled={!amountOk || paying !== null}
                                >
                                    {paying === "flutterwave" ? "Redirecting to Flutterwave…" : "Support with Flutterwave"}
                                </Button>
                            </div>

                            <div className="mt-3 text-[12px] leading-[1.6] text-neutral-600">
                                By continuing, you agree to the{" "}
                                <Link className="font-semibold underline" href="#support-terms">
                                    Support Terms
                                </Link>{" "}
                                and acknowledge this is an optional contribution (not an investment, and not a purchase of equity).
                            </div>
                        </BevelCard>

                        {/* Right */}
                        <div className="grid gap-4">
                            <BevelCard className="p-5 sm:p-7">
                                <h3
                                    className="text-[18px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    What your support funds
                                </h3>
                                <ul className="mt-3 grid gap-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    <li>• Infrastructure and scalability for real-time translation.</li>
                                    <li>• Security, verification, and anti-abuse controls to protect users.</li>
                                    <li>• Launch readiness: testing, reliability work, and store preparation.</li>
                                </ul>
                            </BevelCard>

                            <BevelCard className="p-5 sm:p-7">
                                <h3
                                    className="text-[18px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Supporters receive
                                </h3>
                                <ul className="mt-3 grid gap-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    <li>• Early access invitation when the first public build is ready.</li>
                                    <li>• Quarterly build updates and progress notes.</li>
                                    <li>• Optional recognition on a Founding Supporters page (opt-in later).</li>
                                </ul>
                            </BevelCard>

                            <BevelCard className="p-5 sm:p-7">
                                <h3
                                    className="text-[18px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Need investor information?
                                </h3>
                                <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    If you want to discuss partnerships or investment separately, use the business contact channel. This
                                    support page is strictly for optional contributions and does not represent an investment offer.
                                </p>
                                <div className="mt-3">
                                    <Button href="/policies/contact" ariaLabel="Contact">
                                        Contact
                                    </Button>
                                </div>
                            </BevelCard>
                        </div>
                    </div>
                </section>

                {/* Support Terms */}
                <section id="support-terms" className="pt-9 sm:pt-10 scroll-mt-24">
                    <BevelCard className="p-5 sm:p-7">
                        <h2
                            className="text-[clamp(18px,2.6vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Support Terms (Founding Supporters)
                        </h2>

                        <div className="mt-3 grid gap-3 text-[13.5px] sm:text-[14px] leading-[1.75] text-neutral-700">
                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    1) Nature of support
                                </div>
                                <p className="mt-1">
                                    Contributions on this page are optional support for building and operating 6chatting. They are not a
                                    purchase of equity, tokens, securities, profit-sharing, or ownership rights. This page is not an
                                    investment solicitation.
                                </p>
                            </div>

                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    2) No guarantee of timelines or features
                                </div>
                                <p className="mt-1">
                                    6chatting is under active development. While we aim to deliver a premium product, we do not guarantee
                                    specific launch dates, store availability timelines, or feature delivery schedules through this support
                                    program.
                                </p>
                            </div>

                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    3) Payments, receipts, and records
                                </div>
                                <p className="mt-1">
                                    Payments are processed by third-party providers (Stripe and/or Flutterwave). You will receive a
                                    confirmation from the processor. If you provide an email, we may send a support confirmation. We may
                                    retain transaction metadata for accounting, fraud prevention, and compliance.
                                </p>
                            </div>

                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    4) Refunds and disputes
                                </div>
                                <p className="mt-1">
                                    Unless required by applicable law, contributions are generally non-refundable. If you believe a payment
                                    was unauthorized or incorrect, contact us promptly and also contact your payment provider. We reserve
                                    the right to refuse or return contributions associated with fraud, abuse, or chargeback risk.
                                </p>
                            </div>

                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    5) Prohibited use
                                </div>
                                <p className="mt-1">
                                    You may not use the support program for money laundering, fraud, or any illegal purpose. We may
                                    restrict, cancel, or report suspicious transactions as required.
                                </p>
                            </div>

                            <div>
                                <div className="font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    6) Privacy
                                </div>
                                <p className="mt-1">
                                    Any personal information you provide here is handled under our Privacy Policy. Payment data is handled
                                    by the payment processor; we do not store full card details.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <Button href="/policies/privacy" ariaLabel="Privacy policy">
                                Privacy Policy
                            </Button>
                            <Button href="/policies/terms" ariaLabel="Terms of service">
                                Terms of Service
                            </Button>
                            <Button href="/policies/refunds" ariaLabel="Refunds policy">
                                Refund & Cancellation
                            </Button>
                            <Button href="/policies/acceptable-use" ariaLabel="Acceptable use">
                                Acceptable Use
                            </Button>
                        </div>
                    </BevelCard>
                </section>

                <footer className="pt-10 text-neutral-700">
                    <div className="border-t border-black/10 pt-6">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                            <Link href="/support">Support</Link>
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

                {/* Premium micro-styles for amount buttons */}
                <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }

          .support-amt-btn {
            background: rgba(255, 255, 255, 0.96);
            box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.08), -10px -10px 22px rgba(255, 255, 255, 0.9);
            overflow: hidden;
          }

          .support-amt-value {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

          .support-amt-btn:hover {
            transform: translateY(-1px);
          }

          .support-amt-glow {
            pointer-events: none;
            position: absolute;
            inset: -2px;
            opacity: 0;
            transition: opacity 180ms ease;
            background:
              radial-gradient(650px 220px at 30% 0%, rgba(0, 0, 0, 0.10), transparent 55%),
              radial-gradient(650px 220px at 70% 110%, rgba(0, 0, 0, 0.08), transparent 55%);
          }

          .support-amt-glow--on {
            opacity: 1;
          }

          /* Stronger selected state without adding color */
          .support-amt-btn[aria-pressed="true"] {
            border-color: rgba(0, 0, 0, 0.28);
            box-shadow:
              0 0 0 2px rgba(0, 0, 0, 0.08) inset,
              12px 12px 26px rgba(0, 0, 0, 0.10),
              -12px -12px 26px rgba(255, 255, 255, 0.95);
          }
        `}</style>
            </main>
        </div>
    );
}
