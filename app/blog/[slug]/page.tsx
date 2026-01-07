// app/blog/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const year = useMemo(() => new Date().getFullYear(), []);
    const title = useMemo(() => params.slug.replace(/-/g, " "), [params.slug]);

    return (
        <main className="mx-auto w-[min(960px,calc(100%-24px))] pb-14">
            <section className="pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>6chatting Blog</Pill>
                                <Pill>Launch 06/06/2026</Pill>
                                <Pill>Placeholder post</Pill>
                            </div>

                            <h1
                                className="mt-4 text-[clamp(24px,4.6vw,40px)] font-extrabold leading-[1.1] tracking-[-0.04em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {title}
                            </h1>

                            <p className="mt-3 text-[14px] leading-[1.85] text-neutral-700 whitespace-normal break-words">
                                This is a placeholder blog post page wired for routing. Later, you can replace this with real content from your CMS/database.
                                For now, it ensures your blog feels live and premium immediately.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href="/blog"
                                    className="water-btn inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none"
                                >
                                    Back to Blog
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="water-btn water-btn-primary inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none"
                                >
                                    View Pricing
                                </Link>
                            </div>
                        </div>

                        <LogoBadge />
                    </div>

                    <div className="mt-6 grid gap-3">
                        {[
                            "Section heading placeholder — Overview",
                            "Section heading placeholder — Key benefits",
                            "Section heading placeholder — What users should expect next",
                            "Section heading placeholder — Launch checklist",
                        ].map((h) => (
                            <div
                                key={h}
                                className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                            >
                                <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    {h}
                                </div>
                                <div className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700">
                                    Placeholder paragraph content. Replace this with your final copy when you are ready. This layout is designed to feel premium,
                                    readable, and consistent with your pricing page style.
                                </div>
                            </div>
                        ))}
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
