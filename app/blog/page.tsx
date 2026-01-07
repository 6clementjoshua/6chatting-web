"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { POSTS, CATEGORY_FILTERS, BlogPost } from "./data";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

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
    href,
    onClick,
    variant = "default",
    className = "",
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    const cls = cx(base, variant === "primary" && primary, className);

    if (href) return <Link className={cls} href={href}>{children}</Link>;
    return (
        <button className={cls} type="button" onClick={onClick}>
            {children}
        </button>
    );
};

function IconArrow() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M10 7h7v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function IconSpark() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M12 2l1.2 6.1L19 10l-5.8 1.9L12 18l-1.2-6.1L5 10l5.8-1.9L12 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M5 14l.8 3.9L9 19l-3.2 1.1L5 24l-.8-3.9L1 19l3.2-1.1L5 14Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
                opacity=".5"
            />
        </svg>
    );
}

export default function BlogPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return POSTS.filter((p) => {
            const matchesFilter = filter === "All" ? true : p.category === filter;
            const matchesQuery =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.subtitle.toLowerCase().includes(q) ||
                p.bullets.join(" ").toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [query, filter]);

    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            <section className="pt-6 sm:pt-10">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>
                                    <span className="mr-2 text-black">
                                        <IconSpark />
                                    </span>
                                    6chatting Blog
                                </Pill>
                                <Pill>Launch date: 06/06/2026</Pill>
                                <Pill>Updates • Features • Verification</Pill>
                            </div>

                            <h1
                                className="mt-4 text-[clamp(26px,4.8vw,44px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                We’re launching 6chatting on 06/06/2026.
                                <br className="hidden sm:block" />
                                Here’s everything users should expect.
                            </h1>

                            <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] font-medium leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                This blog keeps your community informed: feature rollouts, verification tiers (Real/Gold/White),
                                safety improvements, translation quality updates, and call reliability upgrades.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                <Button href="#posts" variant="primary">
                                    Read the updates <IconArrow />
                                </Button>
                                <Button href="/pricing">View pricing</Button>
                                <Button href="/help">Help Center</Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)] lg:w-[360px]">
                            <div className="min-w-0">
                                <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    What to expect next
                                </div>
                                <div className="mt-2 grid gap-2">
                                    {[
                                        "Launch week onboarding + waitlist rollout",
                                        "Translation quality and allocation details",
                                        "Verification requirements and timelines",
                                        "Business trust + brand protection upgrades",
                                    ].map((t) => (
                                        <div
                                            key={t}
                                            className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <LogoBadge size={44} />
                        </div>
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6" id="posts">
                <BevelCard className="p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Latest posts
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-600">
                                {visible.length} post{visible.length === 1 ? "" : "s"} shown
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search posts…"
                                    className="w-full bg-transparent text-[13px] font-semibold outline-none"
                                    aria-label="Search posts"
                                />
                            </div>

                            <label className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[13px] font-semibold shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                                <span className="text-neutral-600">Category:</span>{" "}
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value as any)}
                                    className="ml-2 bg-transparent font-extrabold outline-none"
                                    aria-label="Filter category"
                                >
                                    {CATEGORY_FILTERS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                </BevelCard>
            </section>

            <section className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visible.map((p: BlogPost) => (
                        <BevelCard key={p.slug} className="p-5 sm:p-6">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">
                                            {p.category}
                                        </span>
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                            {p.dateLabel}
                                        </span>
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                            {p.readMins} min read
                                        </span>
                                    </div>

                                    <h2 className="mt-3 text-[18px] font-extrabold leading-[1.25] tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                        {p.title}
                                    </h2>
                                    <p className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">
                                        {p.subtitle}
                                    </p>
                                </div>
                                <LogoBadge size={34} />
                            </div>

                            <div className="mt-4 grid gap-2">
                                {p.bullets.map((b) => (
                                    <div
                                        key={b}
                                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                    >
                                        {b}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 grid gap-2">
                                <Button href={`/blog/${p.slug}`} variant="primary" className="w-full">
                                    Read post <IconArrow />
                                </Button>
                            </div>
                        </BevelCard>
                    ))}
                </div>
            </section>

            <footer className="pt-10 text-neutral-700">
                <div className="border-t border-black/10 pt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                        <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">Acceptable Use</Link>
                        <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">Contact</Link>
                    </div>

                    <div className="mt-5 text-center text-xs font-normal text-neutral-600">
                        © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span> All rights reserved.
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .water-bevel { transform: translateZ(0); }
        }
      `}</style>
        </main>
    );
}
