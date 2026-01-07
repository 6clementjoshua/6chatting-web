"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getPostBySlug, BlogBlock, BlogMedia } from "../data";

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

function renderMedia(items: BlogMedia[]) {
    return (
        <div className="grid gap-3">
            {items.map((m, i) => {
                if (m.type === "image") {
                    return (
                        <div key={i} className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-white">
                                <Image src={m.src} alt={m.alt || "blog image"} fill className="object-cover" />
                            </div>
                            {m.caption ? <div className="mt-2 text-[12.5px] font-medium text-neutral-700">{m.caption}</div> : null}
                        </div>
                    );
                }
                if (m.type === "video") {
                    return (
                        <div key={i} className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <video className="w-full rounded-2xl border border-black/10" controls playsInline preload="metadata" poster={m.poster}>
                                <source src={m.src} />
                            </video>
                            {m.caption ? <div className="mt-2 text-[12.5px] font-medium text-neutral-700">{m.caption}</div> : null}
                        </div>
                    );
                }
                if (m.type === "audio") {
                    return (
                        <div key={i} className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <audio className="w-full" controls preload="metadata">
                                <source src={m.src} />
                            </audio>
                            {m.caption ? <div className="mt-2 text-[12.5px] font-medium text-neutral-700">{m.caption}</div> : null}
                        </div>
                    );
                }
                return (
                    <div key={i} className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                        <Link className="water-btn water-btn-primary inline-flex px-4 py-3 text-sm font-semibold" href={m.href} target="_blank" rel="noopener noreferrer">
                            {m.label}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

function renderBlock(b: BlogBlock, idx: number) {
    if (b.type === "heading") {
        return (
            <h2 key={idx} className="text-[16px] sm:text-[17px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                {b.text}
            </h2>
        );
    }
    if (b.type === "paragraph") {
        return (
            <p key={idx} className="text-[13.5px] sm:text-[14px] font-medium leading-[1.9] text-neutral-700 whitespace-normal break-words">
                {b.text}
            </p>
        );
    }
    if (b.type === "bullets") {
        return (
            <div key={idx} className="grid gap-2">
                {b.items.map((t) => (
                    <div
                        key={t}
                        className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                    >
                        {t}
                    </div>
                ))}
            </div>
        );
    }
    if (b.type === "note") {
        return (
            <div
                key={idx}
                className="rounded-3xl border border-black/10 bg-white/85 p-5 text-[13px] font-medium leading-[1.85] text-neutral-700 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
            >
                {b.text}
            </div>
        );
    }
    return <div key={idx}>{renderMedia(b.items)}</div>;
}

export default function BlogPostPage() {
    const params = useParams<{ slug: string }>();
    const year = useMemo(() => new Date().getFullYear(), []);

    const slug = params?.slug || "";
    const post = getPostBySlug(slug);

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
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700">
                                This post doesn’t exist yet. Go back to Blog.
                            </p>
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

    return (
        <main className="mx-auto w-[min(960px,calc(100%-24px))] pb-14">
            <section className="pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>6chatting Blog</Pill>
                                <Pill>{post.category}</Pill>
                                <Pill>{post.dateLabel}</Pill>
                                <Pill>{post.readMins} min read</Pill>
                            </div>

                            <h1
                                className="mt-4 text-[clamp(24px,4.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.04em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {post.title}
                            </h1>

                            <p className="mt-3 text-[14px] leading-[1.85] text-neutral-700 whitespace-normal break-words">
                                {post.subtitle}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/blog" className="water-btn inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none">
                                    Back to Blog
                                </Link>
                                <Link href="/pricing" className="water-btn water-btn-primary inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none">
                                    View Pricing
                                </Link>
                            </div>
                        </div>

                        <LogoBadge />
                    </div>

                    <div className="mt-7 grid gap-4">
                        {post.content.map((b, idx) => renderBlock(b, idx))}
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
          .water-bevel { transform: translateZ(0); }
        }
      `}</style>
        </main>
    );
}
