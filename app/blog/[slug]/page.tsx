// app/blog/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type BlogSection =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
    | { type: "note"; text: string };

type BlogPost = {
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    cover_label: string | null;
    read_mins: number;
    content: BlogSection[];
    bullets: string[];
    published_at: string | null;
    updated_at: string;
    created_at: string;
};

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

function useNow(tickMs = 30_000) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), tickMs);
        return () => clearInterval(id);
    }, [tickMs]);
    return now;
}

function formatDateTime(iso: string) {
    const d = new Date(iso);
    try {
        return new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);
    } catch {
        return d.toString();
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

function renderSection(s: BlogSection, idx: number) {
    if (s.type === "heading") {
        return (
            <h2 key={idx} className="text-[16px] sm:text-[17px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                {s.text}
            </h2>
        );
    }
    if (s.type === "paragraph") {
        return (
            <p key={idx} className="text-[13.5px] sm:text-[14px] font-medium leading-[1.9] text-neutral-700 whitespace-normal break-words">
                {s.text}
            </p>
        );
    }
    if (s.type === "bullets") {
        return (
            <div key={idx} className="grid gap-2">
                {s.items.map((b) => (
                    <div
                        key={b}
                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                    >
                        {b}
                    </div>
                ))}
            </div>
        );
    }
    return (
        <div
            key={idx}
            className="rounded-3xl border border-black/10 bg-white/85 p-5 text-[13px] font-medium leading-[1.85] text-neutral-700 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
        >
            {s.text}
        </div>
    );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const year = useMemo(() => new Date().getFullYear(), []);
    const now = useNow(30_000);

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`/api/blog/${params.slug}`, { cache: "no-store" });
                const data = await res.json();
                if (!cancelled) setPost(data.ok ? (data.post as BlogPost) : null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [params.slug]);

    if (loading) {
        return (
            <main className="mx-auto w-[min(960px,calc(100%-24px))] pb-14 pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="text-[13.5px] font-semibold text-neutral-700">Loading article…</div>
                </BevelCard>
            </main>
        );
    }

    if (!post) {
        return (
            <main className="mx-auto w-[min(960px,calc(100%-24px))] pb-14 pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Pill>6chatting Blog</Pill>
                            <h1 className="mt-4 text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Post not found
                            </h1>
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700">This article may not be published yet.</p>
                            <div className="mt-5">
                                <Link className="water-btn water-btn-primary inline-flex px-4 py-3 text-sm font-semibold" href="/blog">
                                    Back to Blog
                                </Link>
                            </div>
                        </div>
                        <LogoBadge />
                    </div>
                </BevelCard>
            </main>
        );
    }

    const whenIso = post.published_at || post.updated_at || post.created_at;

    return (
        <main className="mx-auto w-[min(960px,calc(100%-24px))] pb-14">
            <section className="pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>6chatting Blog</Pill>
                                <Pill>{post.category}</Pill>
                                <Pill>{post.cover_label || "Update"}</Pill>
                                <Pill>Published {timeAgo(whenIso, now)} • {formatDateTime(whenIso)}</Pill>
                                <Pill>{post.read_mins} min read</Pill>
                            </div>

                            <h1 className="mt-4 text-[clamp(24px,4.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.04em]" style={{ fontFamily: "var(--font-display)" }}>
                                {post.title}
                            </h1>

                            <p className="mt-3 text-[14px] leading-[1.85] text-neutral-700 whitespace-normal break-words">
                                {post.subtitle}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link className="water-btn inline-flex px-4 py-3 text-sm font-semibold" href="/blog">Back to Blog</Link>
                                <Link className="water-btn water-btn-primary inline-flex px-4 py-3 text-sm font-semibold" href="/pricing">View pricing</Link>
                            </div>
                        </div>

                        <LogoBadge />
                    </div>

                    <div className="mt-7 grid gap-4">
                        {(post.content || []).map((s, idx) => renderSection(s, idx))}
                    </div>
                </BevelCard>
            </section>

            <footer className="pt-10 text-neutral-700">
                <div className="border-t border-black/10 pt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                        <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">Contact</Link>
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
