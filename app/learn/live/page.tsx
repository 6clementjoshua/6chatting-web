// app/learn/live/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import { useMemo, useState } from "react";

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
    variant = "default",
    className = "",
    ariaLabel,
}: {
    children: React.ReactNode;
    href?: string;
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
        <button className={cls} type="button" aria-label={ariaLabel}>
            {children}
        </button>
    );
};

const SectionTitle = ({
    title,
    desc,
    id,
}: {
    title: string;
    desc?: string;
    id?: string;
}) => (
    <div className="flex flex-col gap-2">
        {id ? <div id={id} className="scroll-mt-28" /> : null}
        <h2
            className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
            style={{ fontFamily: "var(--font-display)" }}
        >
            {title}
        </h2>
        {desc ? (
            <p className="max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">{desc}</p>
        ) : null}
    </div>
);

const GlassNote = ({
    title,
    body,
    tone = "neutral",
}: {
    title: string;
    body: string;
    tone?: "neutral" | "warn" | "good";
}) => {
    const toneCls =
        tone === "warn"
            ? "border-black/15 bg-white/70"
            : tone === "good"
                ? "border-black/10 bg-white/75"
                : "border-black/10 bg-white/70";

    return (
        <div
            className={cx(
                "rounded-2xl border p-4",
                "backdrop-blur-[10px] bg-white/70",
                "shadow-[14px_14px_28px_rgba(0,0,0,0.08),_-14px_-14px_28px_rgba(255,255,255,0.80)]",
                toneCls
            )}
        >
            <div
                className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
            >
                {title}
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.7] text-neutral-700">{body}</p>
        </div>
    );
};

const List = ({ items }: { items: string[] }) => (
    <ul className="grid gap-2.5 p-0 m-0 list-none">
        {items.map((b) => (
            <li key={b} className="grid grid-cols-[10px_1fr] gap-2.5 items-start text-[13.5px] leading-[1.7] text-neutral-700">
                <span className="mt-2 h-[6px] w-[6px] rounded-full bg-black/55 shadow-[4px_4px_10px_rgba(0,0,0,0.10)]" />
                <span>{b}</span>
            </li>
        ))}
    </ul>
);

const FAQ = ({
    q,
    a,
}: {
    q: string;
    a: string;
}) => (
    <div className="rounded-2xl border border-black/10 bg-white/75 backdrop-blur-[10px] p-4 shadow-[12px_12px_24px_rgba(0,0,0,0.08),_-12px_-12px_24px_rgba(255,255,255,0.80)]">
        <div className="text-[13px] font-extrabold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
            {q}
        </div>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-neutral-700">{a}</p>
    </div>
);

export default function LiveLearnPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [tab, setTab] = useState<"creators" | "business">("creators");

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
                style={{ paddingTop: "calc(var(--header-h, 64px) + 14px)" }}
            >
                {/* Hero */}
                <section>
                    <BevelCard className="p-5 sm:p-7">
                        <div className="grid gap-6 md:grid-cols-[1.05fr_.95fr] md:items-center">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Pill>Live</Pill>
                                    <Pill>Creators</Pill>
                                    <Pill>Business</Pill>
                                    <Pill>Real-time translation</Pill>
                                </div>

                                <h1
                                    className="text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Go live. Engage instantly.
                                    <br />
                                    Reach across languages.
                                </h1>

                                <p className="max-w-2xl text-[15px] sm:text-[15.5px] leading-[1.75] text-neutral-700">
                                    Live on 6chatting is designed for high-trust creators and businesses—interactive sessions with comments,
                                    moderation tools, reporting, gifting (where enabled), and a premium safety-first experience.
                                </p>

                                <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center">
                                    <Button href="#eligibility" ariaLabel="Jump to eligibility" className="w-full sm:w-fit">
                                        Eligibility
                                    </Button>
                                    <Button href="#experience" ariaLabel="Jump to the live experience" className="w-full sm:w-fit">
                                        Live experience
                                    </Button>
                                    <Button href="#safety" ariaLabel="Jump to safety and reporting" className="w-full sm:w-fit">
                                        Safety & reporting
                                    </Button>
                                    <Button href="#faq" ariaLabel="Jump to FAQ" className="w-full sm:w-fit">
                                        FAQ
                                    </Button>
                                </div>

                                <p className="text-[12.5px] leading-[1.6] text-neutral-600">
                                    Note: Some Live capabilities (e.g., gifting, ticketing, payouts) may vary by region and rollout phase.
                                    Policy compliance is required at all times.
                                </p>
                            </div>

                            <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[320px] sm:h-[420px] md:h-[520px]">
                                <Image
                                    src="/images/live/live-creator-business.png"
                                    alt="Live streaming for creators and businesses on 6chatting"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 640px"
                                    priority
                                />
                            </div>

                        </div>
                    </BevelCard>
                </section>

                {/* Quick navigation chips */}
                <section className="pt-6">
                    <BevelCard className="p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                                <Pill>Host</Pill>
                                <Pill>Co-host</Pill>
                                <Pill>Comments</Pill>
                                <Pill>Gifts</Pill>
                                <Pill>Reports</Pill>
                                <Pill>Moderation</Pill>
                            </div>
                            <Button href="/#live" ariaLabel="Back to the main page live section" className="w-full sm:w-fit">
                                Back to main page
                            </Button>
                        </div>
                    </BevelCard>
                </section>

                {/* Eligibility */}
                <section id="eligibility" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="Who can go Live"
                        desc="Live is a higher-trust surface. Access is designed to protect viewers, hosts, brands, and the platform."
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote
                            title="Verified accounts"
                            body="Live hosting is available for verified personal creators and verified business accounts. Verification signals help viewers trust who is hosting."
                        />
                        <GlassNote
                            title="Good standing required"
                            body="Accounts must follow Safety, Acceptable Use, and Community standards. Repeated violations may remove Live access—even if verified."
                            tone="warn"
                        />
                        <GlassNote
                            title="Premium access (recommended)"
                            body="Live is optimized for premium users and high-quality sessions. Some Live capabilities may be restricted for free accounts depending on region and rollout."
                        />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div
                                    className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Minimum requirements (typical)
                                </div>
                                <Pill className="!bg-white">Eligibility</Pill>
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Verified profile (personal or business)",
                                        "Confirmed email + security checks enabled",
                                        "No recent severe enforcement actions",
                                        "Complies with Live policies and regional rules",
                                        "Host identity must match the verified account category",
                                    ]}
                                />
                            </div>
                            <p className="mt-3 text-[12.5px] leading-[1.6] text-neutral-600">
                                Requirements may evolve as the platform scales and as we expand safety tooling.
                            </p>
                        </BevelCard>

                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div
                                    className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Who cannot host Live
                                </div>
                                <Pill className="!bg-white">Restrictions</Pill>
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Accounts that are suspended, restricted, or under enforcement review",
                                        "Impersonation, fraud, or deceptive identity behavior",
                                        "Repeated harassment/hate, illegal activity, or explicit content violations",
                                        "Copyright/piracy repeat offenses",
                                        "Accounts attempting to bypass safety systems or evade enforcement",
                                    ]}
                                />
                            </div>
                        </BevelCard>
                    </div>
                </section>

                {/* Live experience */}
                <section id="experience" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="The Live experience"
                        desc="Live is built for interaction: hosts, co-hosts, real-time comments, translations, and safety-first discovery."
                    />

                    <div className="mt-4">
                        <BevelCard className="p-4 sm:p-5">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Pill>Creators</Pill>
                                    <Pill>Businesses</Pill>
                                    <Pill>Moderation</Pill>
                                    <Pill>Reporting</Pill>
                                </div>

                                <div className="inline-flex rounded-full border border-black/10 bg-white/90 p-1 shadow-[10px_10px_20px_rgba(0,0,0,0.08),_-10px_-10px_20px_rgba(255,255,255,0.80)]">
                                    <button
                                        type="button"
                                        onClick={() => setTab("creators")}
                                        className={cx(
                                            "px-4 py-2 text-xs font-extrabold rounded-full transition",
                                            tab === "creators" ? "bg-black/80 text-white" : "text-black/70 hover:bg-black/5"
                                        )}
                                        aria-label="Show creator live"
                                    >
                                        Creator Live
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTab("business")}
                                        className={cx(
                                            "px-4 py-2 text-xs font-extrabold rounded-full transition",
                                            tab === "business" ? "bg-black/80 text-white" : "text-black/70 hover:bg-black/5"
                                        )}
                                        aria-label="Show business live"
                                    >
                                        Business Live
                                    </button>
                                </div>
                            </div>
                        </BevelCard>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {tab === "creators" ? "Creator Live — what viewers can do" : "Business Live — what customers can do"}
                            </div>
                            <div className="mt-3">
                                <List
                                    items={
                                        tab === "creators"
                                            ? [
                                                "Join Live and comment in real time",
                                                "React and engage without interrupting the host",
                                                "Use translations to follow along across languages",
                                                "Follow the host and get notified for future Lives",
                                                "Report harmful content instantly (safety-first)",
                                            ]
                                            : [
                                                "Ask questions live and get instant responses",
                                                "Request product details, pricing, or availability",
                                                "Engage through translated comments across languages",
                                                "Save the business profile for follow-up chat",
                                                "Report scams or misleading claims instantly",
                                            ]
                                    }
                                />
                            </div>
                        </BevelCard>

                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                {tab === "creators" ? "Creator Live — what hosts can do" : "Business Live — what hosts can do"}
                            </div>
                            <div className="mt-3">
                                <List
                                    items={
                                        tab === "creators"
                                            ? [
                                                "Go live with clear host identity and verification signals",
                                                "Pin important messages and links (where enabled)",
                                                "Invite a co-host for interviews or collaborations",
                                                "Filter comments and mute/block abusive viewers",
                                                "Use Live insights to understand reach and engagement",
                                            ]
                                            : [
                                                "Run product demos, launches, and announcements",
                                                "Add moderators for busy sessions (where enabled)",
                                                "Pin key information (hours, links, offers) where enabled",
                                                "Handle support questions at scale with moderation tools",
                                                "Drive viewers into chat, bookings, or follow-up actions",
                                            ]
                                    }
                                />
                            </div>
                        </BevelCard>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote
                            title="Comments & translation"
                            body="Comments are built for speed, clarity, and moderation. Translation can help viewers participate across languages—availability may depend on account type, region, and rollout."
                        />
                        <GlassNote
                            title="Gifting & support (where enabled)"
                            body="Eligible creators may receive gifts or tips during Live. Gifting is subject to anti-fraud checks, age/region rules, and creator eligibility."
                        />
                        <GlassNote
                            title="Discovery"
                            body="Live sessions may appear in recommended areas when they meet quality and safety standards. Misleading or unsafe sessions are downranked or removed."
                            tone="warn"
                        />
                    </div>
                </section>

                {/* Safety */}
                <section id="safety" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="Safety, moderation, and reporting"
                        desc="Live is protected by fast enforcement, reporting workflows, and tools for hosts and viewers."
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div
                                    className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Viewer protections
                                </div>
                                <Pill className="!bg-white">Reports</Pill>
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Report a Live instantly (spam, harassment, scams, illegal content, impersonation)",
                                        "Block/mute accounts without leaving the Live",
                                        "Safety review systems can pause or remove Live sessions quickly",
                                        "Repeat offenders lose Live access or get suspended",
                                        "High-risk sessions may be restricted from discovery",
                                    ]}
                                />
                            </div>
                        </BevelCard>

                        <BevelCard className="p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div
                                    className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Host controls
                                </div>
                                <Pill className="!bg-white">Moderation</Pill>
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Mute, block, or remove disruptive viewers",
                                        "Limit comments or enable stricter comment filters (where supported)",
                                        "Assign a moderator/co-host for large sessions (where enabled)",
                                        "End Live instantly if anything goes wrong",
                                        "Safety-first policies apply even when Live is private or niche",
                                    ]}
                                />
                            </div>
                        </BevelCard>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote
                            title="Zero tolerance categories"
                            body="Live does not allow illegal activity, explicit sexual content, child exploitation, extreme violence, hate/harassment, or instructions facilitating wrongdoing. Violations can lead to immediate removal and account enforcement."
                            tone="warn"
                        />
                        <GlassNote
                            title="Copyright and originality"
                            body="Streaming content you don’t own or have rights to may be removed. Repeat infringement can lead to Live restrictions or account suspension."
                            tone="warn"
                        />
                        <GlassNote
                            title="Integrity and scams"
                            body="Deceptive claims, impersonation, fake giveaways, phishing, and fraud attempts are not allowed. We enforce to protect users and businesses."
                            tone="warn"
                        />
                    </div>

                    <div className="mt-4">
                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Enforcement outcomes (what can happen)
                            </div>
                            <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                When Live violates policy, we may act immediately to keep users safe. Enforcement depends on severity,
                                history, and context.
                            </p>

                            <div className="mt-3 grid gap-4 md:grid-cols-2">
                                <GlassNote
                                    title="Lower severity (first-time, fixable)"
                                    body="Live warning, content removal, limited discovery, temporary comment restrictions, or temporary Live suspension."
                                />
                                <GlassNote
                                    title="Higher severity (harmful, repeated, or illegal)"
                                    body="Immediate Live termination, longer Live bans, account suspension, account removal, and referrals where legally required."
                                    tone="warn"
                                />
                            </div>

                            <p className="mt-3 text-[12.5px] leading-[1.6] text-neutral-600">
                                We may also restrict monetization (e.g., gifting/earnings) if content quality, originality, or policy
                                compliance is not met.
                            </p>
                        </BevelCard>
                    </div>
                </section>

                {/* Monetization and gifting */}
                <section id="monetization" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="Gifting, monetization, and payouts"
                        desc="When enabled and eligible, Live can be a growth and earnings surface—while staying compliant and brand-safe."
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                What can generate earnings (typical)
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Original, high-quality live content with genuine engagement",
                                        "Eligible creator gifting/tips (where enabled)",
                                        "Brand-safe sessions (education, entertainment, culture, business demos)",
                                        "Value-driven topics: lessons, workshops, Q&A, announcements",
                                        "Consistent, policy-compliant hosting over time",
                                    ]}
                                />
                            </div>
                        </BevelCard>

                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                What cannot generate earnings
                            </div>
                            <div className="mt-3">
                                <List
                                    items={[
                                        "Re-uploaded or stolen content (copyright abuse)",
                                        "Misleading, scam-like, or deceptive sessions",
                                        "Hate/harassment, explicit content, illegal activity, or policy violations",
                                        "Spam Lives designed only to farm views or gifts",
                                        "Low-effort sessions that fail quality and safety checks",
                                    ]}
                                />
                            </div>
                        </BevelCard>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote
                            title="Eligibility matters"
                            body="Gifting and monetization typically require verification, good standing, and anti-fraud checks. Some regions may have additional requirements."
                        />
                        <GlassNote
                            title="Payouts"
                            body="Where supported, payouts are made to local bank accounts and approved payout rails. Timing depends on verification and regional banking systems."
                        />
                        <GlassNote
                            title="Fairness and integrity"
                            body="We may review earnings patterns for fraud, manipulation, or policy risk. Violations can remove earnings eligibility."
                            tone="warn"
                        />
                    </div>

                    <div className="mt-4">
                        <BevelCard className="p-5 sm:p-6">
                            <div
                                className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Transparency: your controls and your responsibility
                            </div>

                            <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                You control the tone of your Live. Good hosts build trust by being consistent, accurate, and respectful. If
                                you’re promoting a product or service, disclose clearly. If you’re collecting gifts, do not mislead viewers.
                            </p>

                            <div className="mt-3 grid gap-4 md:grid-cols-2">
                                <GlassNote
                                    title="Best practices for hosts"
                                    body="Use clear titles, deliver what you promised, moderate comments, avoid clickbait, and keep sessions respectful. Trust increases repeat viewership."
                                    tone="good"
                                />
                                <GlassNote
                                    title="Risk areas to avoid"
                                    body="Fake giveaways, false claims, medical/financial impersonation, or aggressive harassment triggers enforcement quickly."
                                    tone="warn"
                                />
                            </div>
                        </BevelCard>
                    </div>
                </section>

                {/* Future */}
                <section id="future" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="What’s coming to Live"
                        desc="We will continue expanding Live capabilities over time—without compromising safety."
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote title="Scheduled Lives" body="Create upcoming Lives, reminders, and calendar-ready announcements." />
                        <GlassNote title="Multi-host sessions" body="Add co-hosts, guests, and structured interviews (where enabled)." />
                        <GlassNote title="Ticketed events" body="Premium Lives and paid events may roll out depending on region." />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <GlassNote title="Live highlights & replay" body="Publish highlights and replays with strong policy controls." />
                        <GlassNote title="Business conversion tools" body="Buttons for booking, catalog links, offers, and follow-up chat." />
                        <GlassNote title="More safety tooling" body="Better filters, stronger enforcement speed, and viewer protection upgrades." />
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="pt-10 sm:pt-12 scroll-mt-24">
                    <SectionTitle
                        title="FAQ"
                        desc="Quick answers to the most common Live questions."
                    />

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <FAQ
                            q="Is Live available for both creators and businesses?"
                            a="Yes. Live supports creator sessions (community engagement) and business sessions (demos, launches, Q&A). Access may require verification and good standing."
                        />
                        <FAQ
                            q="Can viewers comment in different languages?"
                            a="Yes. Live is designed for global participation. Translation may help viewers engage across languages, but availability can vary by account type, region, and rollout."
                        />
                        <FAQ
                            q="How do I report something harmful during a Live?"
                            a="Use the report option from the Live interface. Reports are reviewed using safety workflows designed for speed. Severe violations can trigger immediate Live termination."
                        />
                        <FAQ
                            q="Do gifts and tips always work everywhere?"
                            a="Not always. Gifting and monetization are subject to region rules, anti-fraud checks, and eligibility. Some areas may have limited features during early rollout."
                        />
                        <FAQ
                            q="Can a host get banned from going Live?"
                            a="Yes. Policy violations, repeated reports, fraud signals, or unsafe behavior can remove Live privileges temporarily or permanently—even if the account is verified."
                        />
                        <FAQ
                            q="What content is most likely to succeed on Live?"
                            a="Original, consistent, respectful sessions that deliver clear value. Education, entertainment, community engagement, and business demos typically perform well when they remain brand-safe."
                        />
                    </div>
                </section>


                {/* CTA */}
                <section className="pt-10 sm:pt-12">
                    <BevelCard className="p-5 sm:p-7">
                        <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                            <div>
                                <h2
                                    className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Ready to go Live on 6chatting?
                                </h2>
                                <p className="mt-2 max-w-2xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    Build trust, grow globally, and host premium sessions. Verify your account, stay compliant, and create
                                    high-quality Live experiences your community will return to.
                                </p>
                                <p className="mt-2 text-[12.5px] leading-[1.6] text-neutral-600">
                                    Live availability depends on eligibility, region, and rollout phase. Safety rules apply at all times.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Button href="/#live" ariaLabel="Back to Live section" className="w-full">
                                    Back to Live summary
                                </Button>
                                <Button href="/pricing" ariaLabel="See premium plans" variant="primary" className="w-full">
                                    See Premium Plans
                                </Button>
                            </div>
                        </div>
                    </BevelCard>
                </section>

                <div className="mt-8 text-[13px] leading-[1.7] text-neutral-600">
                    Live sessions on 6chatting are governed by our platform policies to protect users, creators, and businesses.
                    By hosting or participating in Live, you agree to comply with the
                    <Link href="/policies/live" className="font-semibold underline mx-1">Live Streaming Policy</Link>,
                    <Link href="/policies/safety" className="font-semibold underline mx-1">Safety Policy</Link>,
                    and
                    <Link href="/policies/acceptable-use" className="font-semibold underline mx-1">Acceptable Use Policy</Link>.
                </div>


                <footer className="pt-10 text-neutral-700">
                    <div className="border-t border-black/10 pt-6">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                            <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                                Terms of Service
                            </Link>
                            <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </Link>
                            <Link href="/policies/safety" target="_blank" rel="noopener noreferrer">
                                Safety
                            </Link>
                            <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                                Acceptable Use
                            </Link>
                            <Link href="/policies/ai-translation" target="_blank" rel="noopener noreferrer">
                                AI & Translation
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
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }

          /* If your app already defines these globally, keep them there; otherwise this page uses them. */
          .water-bevel {
            border-radius: 28px;
            border: 1px solid rgba(0, 0, 0, 0.10);
            background: rgba(255, 255, 255, 0.78);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 18px 18px 36px rgba(0, 0, 0, 0.10), -18px -18px 36px rgba(255, 255, 255, 0.90);
          }

          .water-btn {
            border-radius: 999px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            background: rgba(255, 255, 255, 0.88);
            box-shadow: 12px 12px 26px rgba(0, 0, 0, 0.10), -12px -12px 26px rgba(255, 255, 255, 0.88);
            transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
          }
          .water-btn:hover {
            transform: translateY(-1px);
            box-shadow: 14px 14px 28px rgba(0, 0, 0, 0.12), -14px -14px 28px rgba(255, 255, 255, 0.90);
          }
          .water-btn:active {
            transform: translateY(0px);
          }

          .water-btn-primary {
            background: rgba(0, 0, 0, 0.86);
            color: white;
            border-color: rgba(0, 0, 0, 0.30);
            box-shadow: 14px 14px 30px rgba(0, 0, 0, 0.18), -14px -14px 30px rgba(255, 255, 255, 0.75);
          }
          .water-btn-primary:hover {
            background: rgba(0, 0, 0, 0.92);
          }
        `}</style>
            </main>
        </div>
    );
}
