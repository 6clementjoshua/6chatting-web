"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

/**
 * ✅ FIX: Removed truncate so mobile text NEVER cuts off.
 * Forces wrap + breaks long words.
 */
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
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    ariaLabel?: string;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
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
        <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel}>
            {children}
        </button>
    );
};

function MiniVisual({
    title,
    subtitle,
    lines,
    icon = "6",
}: {
    title: string;
    subtitle: string;
    lines: string[];
    icon?: string;
}) {
    return (
        <div
            className={cx(
                "rounded-3xl border border-black/10 bg-white/80 p-4",
                "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                        {title}
                    </div>

                    {/* ✅ FIX: Ensure subtitle wraps on mobile */}
                    <div className="mt-0.5 text-[12px] font-medium text-neutral-600 whitespace-normal break-words">
                        {subtitle}
                    </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-black/10 bg-white px-3 py-1.5 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]">
                    <span className="text-xs font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                        {icon}
                    </span>
                </div>
            </div>

            <div className="mt-3 grid gap-2">
                {lines.map((t, i) => (
                    <div
                        key={i}
                        className={cx(
                            "rounded-2xl border border-black/10 bg-white/90 px-3 py-2",
                            "text-[12.5px] font-semibold text-neutral-900",
                            "whitespace-normal break-words",
                            "shadow-[8px_8px_18px_rgba(0,0,0,0.07),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                        )}
                    >
                        {t}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function PersonalPage() {
    const [waitlistOpen, setWaitlistOpen] = useState(false);
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            {/* HERO */}
            <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
                <BevelCard className="p-5 sm:p-7">
                    {/* ✅ FIX: No truncate so it wraps fully on mobile */}
                    <Pill>6chatting Personal • Private conversations with real-time translation</Pill>

                    <h1
                        className="mt-4 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Personal account.
                        <br />
                        Premium chat, made effortless.
                    </h1>

                    <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700">
                        6chatting Personal is built for the people closest to you—family, friends, and trusted circles. It keeps the
                        experience clean and premium while removing language barriers across text, voice notes, and calling.
                    </p>

                    <div className="mt-6 grid gap-2">
                        {/* ✅ FIX: Removed “(Waitlist)” from the label */}
                        <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full max-w-[680px]">
                            Download 6chatting Personal
                        </Button>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button href="/compatibility" className="w-full">
                                Check compatibility
                            </Button>
                            <Button href="/pricing" className="w-full">
                                See plans
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Pill>Instant emoji & stickers</Pill>
                        <Pill>Translation built-in</Pill>
                        <Pill>Voice notes</Pill>
                        <Pill>Calling translation</Pill>
                        <Pill>Media sharing</Pill>
                        <Pill>Privacy-first controls</Pill>
                    </div>

                    {/* Added: premium micro section (more “visual” without clutter) */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="water-inset rounded-3xl p-4">
                            <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Personal spaces
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words">
                                1:1 chats and small groups that feel calm, private, and premium.
                            </div>
                        </div>
                        <div className="water-inset rounded-3xl p-4">
                            <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Smart sharing
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words">
                                Photos, videos, documents—clean previews and fast sending.
                            </div>
                        </div>
                        <div className="water-inset rounded-3xl p-4">
                            <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                Comfort by default
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words">
                                Designed for readability, speed, and everyday connection.
                            </div>
                        </div>
                    </div>
                </BevelCard>

                {/* VISUALS */}
                <div className="grid gap-4">
                    <BevelCard className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                    What you will see inside Personal
                                </div>

                                {/* ✅ FIX: Removed “Visual previews (UI concept blocks…)” hint text */}
                                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                    Everything you need for daily conversations—simple, fast, and private.
                                </div>
                            </div>

                            {/* ✅ FIX: Removed “Premium UI” badge */}
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <MiniVisual
                                title="Chats"
                                subtitle="Clean threads with rich previews."
                                lines={["Pinned chats", "Unread indicators", "Smart search", "Media previews"]}
                            />
                            <MiniVisual
                                title="Live Translation"
                                subtitle="Type once. They receive it in their language."
                                lines={["Auto-detect", "Manual toggle", "Inline translate", "Phrase suggestions"]}
                            />
                            <MiniVisual
                                title="Voice Notes"
                                subtitle="Speak naturally. Send instantly."
                                lines={["One-tap record", "Noise reduction", "Auto-caption", "Translate playback"]}
                            />
                            <MiniVisual
                                title="Calls"
                                subtitle="Translation support during calls."
                                lines={["Call captions", "Language pairing", "Low-latency mode", "Call summary"]}
                            />
                            {/* Added more visuals (premium but not “hints”) */}
                            <MiniVisual
                                title="Reactions"
                                subtitle="Express fast without typing."
                                lines={["Emoji reactions", "Sticker packs", "Quick reply tray", "Favorites"]}
                            />
                            <MiniVisual
                                title="Privacy"
                                subtitle="Control what you share."
                                lines={["Read receipts", "Last-seen controls", "Block/report", "Safe contacts"]}
                            />
                        </div>
                    </BevelCard>

                    <BevelCard className="p-5 sm:p-6">
                        <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                            Personal is designed for comfort
                        </div>

                        <p className="mt-2 text-[13.5px] leading-[1.75] text-neutral-700 whitespace-normal break-words">
                            Personal prioritizes readability, speed, and privacy. The interface stays minimal and premium: water-bevel
                            cards, soft depth, and clear hierarchy—so messages remain the focus.
                        </p>

                        <div className="mt-4 grid gap-2">
                            {[
                                { k: "Privacy controls", v: "Last-seen, read receipts, block/report, and safe contact tools." },
                                { k: "Media sharing", v: "Photos, videos, documents—organized previews with fast sending." },
                                { k: "Emoji & stickers", v: "Expressive packs with quick reactions and a frequently used tray." },
                                { k: "Reliable delivery", v: "Optimized for low-bandwidth conditions and stable messaging." },
                            ].map((row) => (
                                <div
                                    key={row.k}
                                    className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                                >
                                    <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        {row.k}
                                    </div>
                                    <div className="mt-1 text-[13px] font-medium leading-[1.7] text-neutral-700 whitespace-normal break-words">
                                        {row.v}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BevelCard>
                </div>
            </section>

            {/* FEATURE SECTIONS */}
            <section className="pt-8 sm:pt-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Everyday chat, elevated",
                            body: "Fast threads, rich previews, emoji reactions, stickers, and a premium feel that stays out of your way.",
                        },
                        {
                            title: "Translation that feels natural",
                            body: "Inline translation, language pairing, and smooth switching between original and translated message views.",
                        },
                        {
                            title: "Personal safety & trust",
                            body: "User-friendly privacy settings, reporting, block tools, and guardrails for safer communication.",
                        },
                    ].map((f) => (
                        <BevelCard key={f.title} className="p-5 sm:p-6">
                            <div className="text-[14px] font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                {f.title}
                            </div>
                            <p className="mt-2 text-[13.5px] leading-[1.75] text-neutral-700 whitespace-normal break-words">
                                {f.body}
                            </p>
                        </BevelCard>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                        <div>
                            {/* ✅ FIX: Removed “Waitlist download for now” */}
                            <Pill>Personal • Early access</Pill>

                            <h2
                                className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Get early access to 6chatting Personal.
                            </h2>

                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                Start with Personal for family and friends—fast messaging, translation built-in, and a premium interface
                                designed for everyday connection.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            {/* ✅ FIX: Removed “(Waitlist)” */}
                            <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                Download Personal
                            </Button>
                            <Button href="/compatibility" className="w-full">
                                Compatibility first
                            </Button>
                        </div>
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
        </main>
    );
}
