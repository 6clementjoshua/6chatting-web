// app/blog/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BLOG_LAUNCH_DATE, BLOG_POSTS, BlogPost, BlogCategory } from "./_data";

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
        </svg>
    );
}

function useNow(tickMs = 30_000) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), tickMs);
        return () => clearInterval(id);
    }, [tickMs]);
    return now;
}

function formatDate(iso: string, locale?: string) {
    const d = new Date(iso);
    try {
        return new Intl.DateTimeFormat(locale || undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
    } catch {
        return d.toDateString();
    }
}

function timeAgo(fromIso: string, nowMs: number) {
    const from = new Date(fromIso).getTime();
    const diff = Math.max(0, nowMs - from);
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    const week = Math.floor(day / 7);

    if (sec < 15) return "just now";
    if (sec < 60) return `${sec}s ago`;
    if (min < 60) return `${min}m ago`;
    if (hr < 24) return `${hr}h ago`;
    if (day < 7) return `${day}d ago`;
    return `${week}w ago`;
}

const CATEGORY_FILTERS: Array<"All" | BlogCategory> = [
    "All",
    "Launch",
    "Translation",
    "Trust",
    "Calls",
    "Business",
    "Safety",
    "Social",
    "Stories",
    "Music",
    "6TV",
];

function sortPostsNewest(a: BlogPost, b: BlogPost) {
    const aTime = new Date(a.updatedAt || a.publishedAt).getTime();
    const bTime = new Date(b.updatedAt || b.publishedAt).getTime();
    return bTime - aTime;
}

export default function BlogPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const now = useNow(30_000);

    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

    const posts = useMemo(() => [...BLOG_POSTS].sort(sortPostsNewest), []);
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((p) => {
            const matchesFilter = filter === "All" ? true : p.category === filter;
            const hay = (p.title + " " + p.subtitle + " " + p.bullets.join(" ")).toLowerCase();
            const matchesQuery = !q || hay.includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [posts, query, filter]);

    const launchLabel = useMemo(() => {
        const launchMs = new Date(BLOG_LAUNCH_DATE).getTime();
        const diff = launchMs - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        if (days > 1) return `${days} days to launch`;
        if (days === 1) return "1 day to launch";
        if (days === 0) return "Launch day";
        return "Launched";
    }, [now]);

    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            {/* HERO (wide horizontal) */}
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
                                <Pill>Launch: 06/06/2026</Pill>
                                <Pill>{launchLabel}</Pill>
                                <Pill>Real-time updates</Pill>
                            </div>

                            <h1
                                className="mt-4 text-[clamp(26px,4.8vw,44px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Updates, features, and what users should expect next.
                            </h1>

                            <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] font-medium leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                This blog is wired so each post opens on “Read more” and the timestamps update in real time. Later, we can connect this to a CMS/DB
                                without changing the UI.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                <Button href="#posts" variant="primary">
                                    Read the updates <IconArrow />
                                </Button>
                                <Button href="/pricing">View pricing</Button>
                                <Button href="/help">Help Center</Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)] lg:w-[380px]">
                            <div className="min-w-0">
                                <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Coming soon highlights
                                </div>
                                <div className="mt-2 grid gap-2">
                                    {[
                                        "Posts (content sharing)",
                                        "Stories (24-hour memories)",
                                        "Music Together (mutual listening while chatting)",
                                        "6TV (watch together: community / mutual / solo)",
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

            {/* FILTERS */}
            <section className="pt-6" id="posts">
                <BevelCard className="p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Latest posts
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-600">
                                {visible.length} post{visible.length === 1 ? "" : "s"} shown • timestamps update live
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

            {/* POSTS GRID */}
            <section className="pt-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {visible.map((p) => {
                        const whenIso = p.updatedAt || p.publishedAt;
                        const isUpdated = Boolean(p.updatedAt);
                        const rel = timeAgo(whenIso, now);
                        const abs = formatDate(whenIso);

                        return (
                            <BevelCard key={p.slug} className="p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">
                                                {p.category}
                                            </span>

                                            <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                                {p.coverLabel || "Update"}
                                            </span>

                                            <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                                {p.readMins} min read
                                            </span>

                                            <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                                {isUpdated ? "Updated" : "Published"} {rel} • {abs}
                                            </span>
                                        </div>

                                        <h2
                                            className="mt-3 text-[18px] font-extrabold leading-[1.25] tracking-[-0.02em]"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
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
                                        Read more <IconArrow />
                                    </Button>
                                </div>
                            </BevelCard>
                        );
                    })}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-10 text-neutral-700">
                <div className="border-t border-black/10 pt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
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
