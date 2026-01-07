// app/business/page.tsx
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

function IconHandshake({ className = "" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path
                d="M7.5 12.5 5.2 10.2a2.6 2.6 0 0 1 0-3.7l.4-.4a2.6 2.6 0 0 1 3.7 0l1.5 1.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M16.5 12.5l2.3-2.3a2.6 2.6 0 0 0 0-3.7l-.4-.4a2.6 2.6 0 0 0-3.7 0l-3.2 3.2a2.3 2.3 0 0 0 3.2 3.2l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M9.8 12.7l1.1 1.1a2 2 0 0 0 2.8 0l.9-.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M8.6 13.8l1.6 1.6a2.4 2.4 0 0 0 3.4 0l1.9-1.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconBriefcase({ className = "" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path
                d="M9 7V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M4.5 10.3A2.8 2.8 0 0 1 7.2 8h9.6a2.8 2.8 0 0 1 2.7 2.3l.7 5A3 3 0 0 1 17.2 19H6.8a3 3 0 0 1-3-3.7l.7-5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M9.5 12.5h5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconShield({ className = "" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path
                d="M12 3.5 19 6.8v6.1c0 4.8-3.2 7.9-7 9.6-3.8-1.7-7-4.8-7-9.6V6.8L12 3.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9.2 12.2 11 14l3.9-4.1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconID({ className = "" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path
                d="M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path d="M8 9h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path
                d="M15.8 9.7a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function MiniVisual({
    title,
    subtitle,
    rows,
    icon,
}: {
    title: string;
    subtitle: string;
    rows: Array<{ k: string; v: string }>;
    icon: React.ReactNode;
}) {
    return (
        <div
            className={cx(
                "rounded-3xl border border-black/10 bg-white/80 p-4",
                "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                "mini-tilt"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                        {title}
                    </div>
                    <div className="mt-0.5 text-[12px] font-medium text-neutral-600 whitespace-normal break-words">
                        {subtitle}
                    </div>
                </div>

                <div className="shrink-0 rounded-2xl border border-black/10 bg-white p-2 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]">
                    <span className="text-black">{icon}</span>
                </div>
            </div>

            <div className="mt-3 grid gap-2">
                {rows.map((r) => (
                    <div
                        key={r.k}
                        className={cx(
                            "rounded-2xl border border-black/10 bg-white/90 p-3",
                            "shadow-[8px_8px_18px_rgba(0,0,0,0.07),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                        )}
                    >
                        <div className="text-[12.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                            {r.k}
                        </div>
                        <div className="mt-0.5 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                            {r.v}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StepRow({
    n,
    title,
    body,
}: {
    n: string;
    title: string;
    body: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
            <div className="h-10 w-10 shrink-0 rounded-2xl border border-black/10 bg-white grid place-items-center shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]">
                <span className="text-sm font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    {n}
                </span>
            </div>
            <div className="min-w-0">
                <div className="text-[13.5px] font-extrabold tracking-[-0.02em] whitespace-normal break-words" style={{ fontFamily: "var(--font-display)" }}>
                    {title}
                </div>
                <div className="mt-1 text-[13px] font-medium text-neutral-700 leading-[1.7] whitespace-normal break-words">
                    {body}
                </div>
            </div>
        </div>
    );
}

export default function BusinessPage() {
    const [waitlistOpen, setWaitlistOpen] = useState(false);
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            {/* HERO */}
            <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
                <BevelCard className="p-5 sm:p-7">
                    <Pill>6chatting Business • Verified profiles, safer deals, professional communication</Pill>

                    <h1
                        className="mt-4 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Business account.
                        <br />
                        Built for trust and growth.
                    </h1>

                    <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700 whitespace-normal break-words">
                        6chatting Business is for brands, sellers, services, teams, and cross-border trade. Create a professional
                        profile, add your business description, and chat with customers and partners in real time—with translation
                        built-in. Business accounts are designed to appear real, verified, and trustworthy.
                    </p>

                    <div className="mt-6 grid gap-2">
                        <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full max-w-[720px]">
                            Get 6chatting Business
                        </Button>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button href="/compatibility" className="w-full">
                                Check compatibility
                            </Button>
                            <Button href="/pricing" className="w-full">
                                See business plans
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <Pill>Business profile & bio</Pill>
                        <Pill>Verified badge</Pill>
                        <Pill>Customer chat tools</Pill>
                        <Pill>Team & roles</Pill>
                        <Pill>Translation for deals</Pill>
                        <Pill>Premium protections</Pill>
                    </div>

                    {/* Premium micro visuals */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="water-inset rounded-3xl p-4">
                            <div className="flex items-center gap-2">
                                <IconBriefcase />
                                <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Professional identity
                                </div>
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                                Set your business name, category, description, location, and verified details.
                            </div>
                        </div>

                        <div className="water-inset rounded-3xl p-4">
                            <div className="flex items-center gap-2">
                                <IconHandshake />
                                <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Trusted conversations
                                </div>
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                                Speak with customers and partners with confidence—clean UI, clear receipts, organized threads.
                            </div>
                        </div>

                        <div className="water-inset rounded-3xl p-4">
                            <div className="flex items-center gap-2">
                                <IconShield />
                                <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Premium protection
                                </div>
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                                Extra security checks, business-only protections, and safer transaction chat flows.
                            </div>
                        </div>
                    </div>
                </BevelCard>

                {/* RIGHT COLUMN: REALTIME VISUALS + VERIFICATION FLOW */}
                <div className="grid gap-4">
                    <BevelCard className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                    What Business includes
                                </div>
                                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                    Built to help customers recognize real businesses—and help businesses close confidently.
                                </div>
                            </div>
                            <div className="relative h-9 w-9 shrink-0 rounded-2xl border border-black/10 bg-white p-1 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]">
                                <Image src="/6logo.PNG" alt="6chatting" fill className="object-contain" sizes="36px" />
                            </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <MiniVisual
                                title="Business Profile"
                                subtitle="Look professional and credible."
                                icon={<IconBriefcase />}
                                rows={[
                                    { k: "Business name", v: "Your brand identity appears clearly in every chat." },
                                    { k: "Description", v: "Add what you do, pricing range, and service areas." },
                                    { k: "Category", v: "Help customers find you faster and understand your offer." },
                                ]}
                            />
                            <MiniVisual
                                title="Verified Business"
                                subtitle="Only verified businesses operate as Business accounts."
                                icon={<IconID />}
                                rows={[
                                    { k: "Government ID", v: "We require a valid government-issued ID for the owner/admin." },
                                    { k: "Business documents", v: "Business registration, CAC/permit, or equivalent documents." },
                                    { k: "Approval status", v: "Pending → Verified → Active. Unverified accounts are restricted." },
                                ]}
                            />
                            <MiniVisual
                                title="Customer Chat Tools"
                                subtitle="Organize and respond faster."
                                icon={<IconHandshake />}
                                rows={[
                                    { k: "Quick replies", v: "Save responses for common questions." },
                                    { k: "Order-ready threads", v: "Keep negotiations, addresses, and details in one place." },
                                    { k: "Media & documents", v: "Send invoices, catalogs, price lists, and receipts." },
                                ]}
                            />
                            <MiniVisual
                                title="Premium Protections"
                                subtitle="More safety for serious business."
                                icon={<IconShield />}
                                rows={[
                                    { k: "Account safeguards", v: "Stronger checks, anti-impersonation controls, safer recovery." },
                                    { k: "Business-only chat", v: "Exclusive business-to-business chat spaces for premium users." },
                                    { k: "Fraud reduction", v: "Verification + behavior controls to reduce scams and fake sellers." },
                                ]}
                            />
                        </div>
                    </BevelCard>

                    <BevelCard className="p-5 sm:p-6">
                        <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                            Verification before operation
                        </div>
                        <p className="mt-2 text-[13.5px] leading-[1.75] text-neutral-700 whitespace-normal break-words">
                            Every 6chatting Business account must pass verification before operating as a Business profile. This protects
                            customers from impersonation and helps real businesses earn trust faster.
                        </p>

                        <div className="mt-4 grid gap-2">
                            <StepRow
                                n="1"
                                title="Create your business profile"
                                body="Add business name, category, description, and contact details to build a professional identity."
                            />
                            <StepRow
                                n="2"
                                title="Submit verification documents"
                                body="Government-issued ID for the owner/admin plus business registration documents to prove legitimacy."
                            />
                            <StepRow
                                n="3"
                                title="Review + approval"
                                body="Your account is reviewed. Once approved, you receive a verified status and full Business features."
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Pill>Anti-impersonation controls</Pill>
                            <Pill>Safer customer chats</Pill>
                            <Pill>Trusted discovery</Pill>
                        </div>
                    </BevelCard>
                </div>
            </section>

            {/* FEATURE SECTIONS */}
            <section className="pt-8 sm:pt-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Close deals across languages",
                            body: "Instant translation helps you negotiate, confirm terms, and support customers without language barriers.",
                        },
                        {
                            title: "Business-only experiences (Premium)",
                            body: "Premium business users get exclusive business chat spaces, stricter protections, and priority trust signals.",
                        },
                        {
                            title: "Professional support & safety",
                            body: "Verification, reporting, dispute-friendly chat records, and stronger security standards for business accounts.",
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
                            <Pill>Business • Early access</Pill>

                            <h2
                                className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Build trust with a verified business profile.
                            </h2>

                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                If you sell products, run services, manage clients, or operate a team—6chatting Business gives you the
                                messaging tools you need, with verification and premium protection built-in.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                Get Business access
                            </Button>
                            <Button href="/pricing" className="w-full">
                                View plans
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

            {/* Page-scoped premium animations (no libraries needed) */}
            <style jsx global>{`
        .mini-tilt {
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
          will-change: transform;
        }
        .mini-tilt:hover {
          transform: translateY(-2px);
          filter: saturate(1.02);
          box-shadow: 12px 12px 26px rgba(0, 0, 0, 0.10), -12px -12px 26px rgba(255, 255, 255, 0.96);
        }

        @media (prefers-reduced-motion: reduce) {
          .mini-tilt,
          .mini-tilt:hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
        </main>
    );
}
