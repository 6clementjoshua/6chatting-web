"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

function formatMoney(amountMinor: number, currency: string) {
    const cur = (currency || "USD").toUpperCase();
    const major = amountMinor / 100;
    try {
        return new Intl.NumberFormat(undefined, { style: "currency", currency: cur }).format(major);
    } catch {
        return `${cur} ${major.toLocaleString()}`;
    }
}

type Item = {
    id: string;
    display_name: string;
    amount: number; // minor
    currency: string;
    provider: string;
    created_at: string;
};

export default function FoundingSupportersPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setErr("");
                const res = await fetch("/api/founding-supporters", { method: "GET" });
                const data = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(data?.error || "Failed to load supporters.");
                if (!alive) return;
                setItems(Array.isArray(data?.items) ? data.items : []);
            } catch (e: any) {
                if (!alive) return;
                setErr(e?.message || "Failed to load.");
            } finally {
                if (!alive) return;
                setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    const totalCount = items.length;

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
                                <Pill>Founding Supporters</Pill>
                                <Pill>Opt-in recognition</Pill>
                                <Pill>Public list</Pill>
                            </div>

                            <h1
                                className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Founding Supporters
                            </h1>

                            <p className="max-w-3xl text-[14.5px] sm:text-[15px] leading-[1.75] text-neutral-700">
                                This page recognizes supporters who opted in during checkout. Thank you for helping build a premium
                                real-time translation experience for global communication.
                            </p>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-neutral-700">
                                <span className="font-semibold">Total supporters shown:</span>
                                <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 font-semibold">
                                    {loading ? "Loading…" : totalCount}
                                </span>
                                <span className="text-neutral-500">•</span>
                                <Link className="font-semibold underline" href="/support">
                                    Support the build
                                </Link>
                            </div>
                        </div>
                    </BevelCard>
                </section>

                {/* List */}
                <section className="pt-7 sm:pt-8">
                    <BevelCard className="p-5 sm:p-7">
                        <div className="flex items-center justify-between gap-3">
                            <h2
                                className="text-[clamp(18px,2.6vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Supporters list
                            </h2>

                            <span className="text-[12px] font-semibold text-neutral-600">
                                Updated after payment confirmation
                            </span>
                        </div>

                        {err ? (
                            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                                {err}
                            </div>
                        ) : null}

                        {loading ? (
                            <div className="mt-4 grid gap-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="rounded-2xl border border-black/10 bg-white p-4">
                                        <div className="h-3 w-[220px] rounded bg-black/10" />
                                        <div className="mt-2 h-3 w-[160px] rounded bg-black/10" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 grid gap-2">
                                {items.length === 0 ? (
                                    <div className="rounded-2xl border border-black/10 bg-white/95 px-4 py-5 text-[13.5px] text-neutral-700">
                                        No supporters are displayed yet. Supporters appear here only if they opt in during checkout.
                                    </div>
                                ) : (
                                    items.map((it) => (
                                        <div
                                            key={it.id}
                                            className="rounded-2xl border border-black/10 bg-white p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.9)]"
                                        >
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <div
                                                        className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                                        style={{ fontFamily: "var(--font-display)" }}
                                                    >
                                                        {it.display_name || "Anonymous"}
                                                    </div>
                                                    <div className="mt-1 text-[12.5px] text-neutral-600">
                                                        {new Date(it.created_at).toLocaleDateString(undefined, {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div
                                                        className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                                        style={{ fontFamily: "var(--font-display)" }}
                                                    >
                                                        {formatMoney(it.amount, it.currency)}
                                                    </div>
                                                    <div className="mt-1 text-[12.5px] text-neutral-600">
                                                        via {String(it.provider || "").toUpperCase()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        <div className="mt-5 text-[12px] leading-[1.6] text-neutral-600">
                            Only supporters who opt in to recognition are shown. If you supported and want to be listed, submit again
                            with recognition enabled, or contact support.
                        </div>
                    </BevelCard>
                </section>

                <footer className="pt-10 text-neutral-700">
                    <div className="border-t border-black/10 pt-6">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                            <Link href="/support">Support</Link>
                            <Link href="/partners">Partners</Link>
                            <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms</Link>
                            <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy</Link>
                            <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">Contact</Link>
                        </div>

                        <div className="mt-5 text-center text-xs font-normal text-neutral-600">
                            © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span> All rights reserved.
                        </div>
                    </div>
                </footer>

                <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
            </main>
        </div>
    );
}
