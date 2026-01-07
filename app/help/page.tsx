// app/help/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

/** ✅ Always use the logo (never “6”) */
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
    onClick,
    href,
    variant = "default",
    className = "",
    ariaLabel,
    type,
    disabled,
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    ariaLabel?: string;
    type?: "button" | "submit";
    disabled?: boolean;
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
        <button className={cls} type={type ?? "button"} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
            {children}
        </button>
    );
};

function IconSearch({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path d="M16.2 16.2 21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function IconShield({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function IconChat({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M6.5 18.5 4 20v-14a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 6v8.5A2.5 2.5 0 0 1 17.5 17H7.5l-1 1.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M7.5 8.5h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M7.5 11.5h6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function IconDocs({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M7 3.8h7.2L18 7.6V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path d="M14.2 3.8V8h3.8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

function Field({
    label,
    hint,
    children,
}: {
    label: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-1.5">
            <div className="flex items-end justify-between gap-3">
                <div
                    className="text-[13px] font-extrabold tracking-[-0.02em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {label}
                </div>
                {hint ? <div className="text-[11.5px] font-medium text-neutral-500">{hint}</div> : null}
            </div>
            {children}
        </div>
    );
}

function InputBase({
    as = "input",
    ...props
}: {
    as?: "input" | "textarea" | "select";
    [key: string]: any;
}) {
    const cls = cx(
        "w-full rounded-2xl border border-black/10 bg-white/90",
        "px-4 py-3 text-[13.5px] font-semibold text-neutral-900",
        "shadow-[10px_10px_22px_rgba(0,0,0,0.07),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
        "outline-none focus:ring-2 focus:ring-black/10",
        "whitespace-normal break-words"
    );

    if (as === "textarea") {
        return <textarea className={cls} {...props} />;
    }
    if (as === "select") {
        return <select className={cls} {...props} />;
    }
    return <input className={cls} {...props} />;
}

function HelpCard({
    title,
    body,
    items,
    icon,
}: {
    title: string;
    body: string;
    items: string[];
    icon: React.ReactNode;
}) {
    return (
        <div
            className={cx(
                "rounded-3xl border border-black/10 bg-white/80 p-4",
                "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                "help-tilt"
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-black">{icon}</span>
                        <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                            {title}
                        </div>
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                        {body}
                    </div>
                </div>
                <LogoBadge />
            </div>

            <div className="mt-3 grid gap-2">
                {items.map((t) => (
                    <div
                        key={t}
                        className={cx(
                            "rounded-2xl border border-black/10 bg-white/90 px-3 py-2",
                            "text-[12.5px] font-semibold text-neutral-900",
                            "whitespace-normal break-words",
                            "shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                        )}
                    >
                        {t}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HelpCenterPage() {
    const [waitlistOpen, setWaitlistOpen] = useState(false);

    // Contact form state (client-side)
    const [topic, setTopic] = useState("general");
    const [accountType, setAccountType] = useState("personal");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [orderOrRef, setOrderOrRef] = useState("");
    const [message, setMessage] = useState("");
    const [consent, setConsent] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState<null | "ok">(null);

    const year = useMemo(() => new Date().getFullYear(), []);

    function resetForm() {
        setTopic("general");
        setAccountType("personal");
        setName("");
        setEmail("");
        setOrderOrRef("");
        setMessage("");
        setConsent(true);
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!email.trim() || !message.trim()) return;

        setSubmitting(true);
        setSubmitted(null);

        try {
            const res = await fetch("/api/support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    accountType,
                    name: name || null,
                    email,
                    reference: orderOrRef || null,
                    message,
                    page: "/help",
                }),
            });

            const json = await res.json();

            if (!res.ok || !json?.ok) {
                setSubmitting(false);
                return;
            }

            setSubmitted("ok");
            setSubmitting(false);
            resetForm();
        } catch {
            setSubmitting(false);
        }
    }


    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
            {/* HERO */}
            <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
                <BevelCard className="p-5 sm:p-7">
                    <Pill>Help Center • Guidance, safety, troubleshooting, and official support</Pill>

                    <h1
                        className="mt-4 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Help Center.
                        <br />
                        Support you can trust.
                    </h1>

                    <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700 whitespace-normal break-words">
                        The 6chatting Help Center is your home for answers, safety guidance, and direct support. Whether you are using
                        Personal or Business, we help you understand how translation works, how privacy controls protect you, and how
                        to resolve issues quickly.
                    </p>

                    <div className="mt-6 grid gap-2">
                        <div className="grid gap-2 sm:grid-cols-2">
                            <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                                Get the app
                            </Button>
                            <Button href="#contact" className="w-full" ariaLabel="Jump to contact form">
                                Contact support
                            </Button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                            <Pill>Account access</Pill>
                            <Pill>Translation & calls</Pill>
                            <Pill>Privacy & safety</Pill>
                            <Pill>Business verification</Pill>
                            <Pill>Billing & plans</Pill>
                        </div>
                    </div>

                    {/* Premium search bar (UI-only) */}
                    <div className="mt-6">
                        <div className="water-inset rounded-3xl p-4">
                            <div className="flex items-center gap-2">
                                <IconSearch />
                                <div className="text-[12px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Search help topics
                                </div>
                            </div>

                            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                                <InputBase
                                    placeholder="Search: translation, calls, verification, privacy, billing…"
                                    aria-label="Search help topics"
                                />
                                <Button className="w-full sm:w-auto" href="#contact" ariaLabel="Open contact form">
                                    Still need help?
                                </Button>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                                <Pill className="text-[11.5px]">Reset password</Pill>
                                <Pill className="text-[11.5px]">Call translation</Pill>
                                <Pill className="text-[11.5px]">Business verification</Pill>
                                <Pill className="text-[11.5px]">Report a user</Pill>
                                <Pill className="text-[11.5px]">Refunds</Pill>
                            </div>
                        </div>
                    </div>
                </BevelCard>

                {/* WHAT YOU GET */}
                <div className="grid gap-4">
                    <BevelCard className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                                    What the Help Center stands for
                                </div>
                                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words">
                                    Clear guidance, real protections, and official ways to reach 6chatting when you need help.
                                </div>
                            </div>
                            <LogoBadge />
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <HelpCard
                                title="Fast solutions"
                                body="Quick answers for common issues so you can return to chatting."
                                icon={<IconDocs />}
                                items={["Login & verification help", "Troubleshooting steps", "Device compatibility", "Status updates"]}
                            />
                            <HelpCard
                                title="Safety first"
                                body="Clear safety guidance designed to reduce scams and impersonation."
                                icon={<IconShield />}
                                items={["Report & block guidance", "Anti-fraud education", "Privacy controls", "Business verification rules"]}
                            />
                            <HelpCard
                                title="Translation guidance"
                                body="Learn how real-time translation works across text, voice notes, and calls."
                                icon={<IconChat />}
                                items={["Text translation tips", "Call translation basics", "Language pairing", "Quality best practices"]}
                            />
                            <HelpCard
                                title="Business support"
                                body="Help for verified business profiles, customer chat tools, and protection features."
                                icon={<IconShield />}
                                items={["Verification requirements", "Profile optimization", "Business chat protections", "Premium business spaces"]}
                            />
                        </div>
                    </BevelCard>

                    <BevelCard className="p-5 sm:p-6">
                        <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                            Official support channels
                        </div>
                        <p className="mt-2 text-[13.5px] leading-[1.75] text-neutral-700 whitespace-normal break-words">
                            When you contact 6chatting, we use your request to verify details, protect your account, and resolve issues
                            quickly. Please share only what is necessary. We will never ask you to share passwords or OTP codes.
                        </p>

                        <div className="mt-4 grid gap-2">
                            {[
                                { k: "Account recovery", v: "Login problems, email access issues, or locked accounts." },
                                { k: "Safety reports", v: "Reporting scams, impersonation, harassment, or suspicious business behavior." },
                                { k: "Billing & plans", v: "Plan questions, subscription, refunds, or invoices (when live)." },
                                { k: "Business verification", v: "Document rules, verification status, and approved account access." },
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

            {/* CONTACT FORM */}
            <section id="contact" className="pt-8 sm:pt-10 scroll-mt-24">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <Pill>Contact 6chatting support</Pill>
                            <h2
                                className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Submit a support request.
                            </h2>
                            <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                                Tell us what happened and we will respond with the safest next steps. For faster resolution, include your
                                account email and any reference information you have.
                            </p>
                        </div>
                        <LogoBadge />
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-[1fr_.9fr]">
                        <form onSubmit={onSubmit} className="grid gap-4">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <Field label="Your name (optional)">
                                    <InputBase
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                        placeholder="Full name"
                                        autoComplete="name"
                                    />
                                </Field>

                                <Field label="Email address" hint="Required">
                                    <InputBase
                                        value={email}
                                        onChange={(e: any) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                    />
                                </Field>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Field label="Topic" hint="Select one">
                                    <InputBase as="select" value={topic} onChange={(e: any) => setTopic(e.target.value)}>
                                        <option value="general">General question</option>
                                        <option value="account">Account access / login</option>
                                        <option value="translation">Translation (text/voice/calls)</option>
                                        <option value="safety">Safety report / abuse</option>
                                        <option value="billing">Billing / plans</option>
                                        <option value="business">Business verification</option>
                                    </InputBase>
                                </Field>

                                <Field label="Account type" hint="Personal or Business">
                                    <InputBase as="select" value={accountType} onChange={(e: any) => setAccountType(e.target.value)}>
                                        <option value="personal">Personal</option>
                                        <option value="business">Business</option>
                                    </InputBase>
                                </Field>
                            </div>

                            <Field label="Reference (optional)" hint="Order / ticket / verification ID">
                                <InputBase
                                    value={orderOrRef}
                                    onChange={(e: any) => setOrderOrRef(e.target.value)}
                                    placeholder="Any reference number (if you have one)"
                                />
                            </Field>

                            <Field label="Message" hint="Required">
                                <InputBase
                                    as="textarea"
                                    value={message}
                                    onChange={(e: any) => setMessage(e.target.value)}
                                    placeholder="Describe the issue. Include steps you tried, device type, and what you expected to happen."
                                    rows={6}
                                    required
                                />
                            </Field>

                            <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 h-4 w-4"
                                />
                                <div className="min-w-0">
                                    <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        Safety note
                                    </div>
                                    <div className="mt-0.5 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.65]">
                                        Do not share passwords, OTP codes, or private keys. Share only details needed to investigate.
                                    </div>
                                </div>
                            </label>

                            <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-full"
                                    disabled={submitting || !consent || !email.trim() || !message.trim()}
                                >
                                    {submitting ? "Submitting…" : "Submit request"}
                                </Button>

                                {submitted === "ok" ? (
                                    <div className="rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-[12.5px] font-semibold text-neutral-800 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                        Request received. We will respond as soon as possible.
                                    </div>
                                ) : (
                                    <div className="text-[12px] font-medium text-neutral-600 whitespace-normal break-words">
                                        By submitting, you agree we may use these details to resolve your request securely.
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Right side: helpful guidance */}
                        <div className="grid gap-3">
                            <div className="water-inset rounded-3xl p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                        Faster help checklist
                                    </div>
                                    <LogoBadge size={34} />
                                </div>

                                <div className="mt-3 grid gap-2">
                                    {[
                                        "Include your account email (used on 6chatting).",
                                        "Tell us your device type (Android / iPhone / Web).",
                                        "Describe what you expected vs what happened.",
                                        "Attach reference details if you have any.",
                                        "Never share OTP codes or passwords.",
                                    ].map((t) => (
                                        <div
                                            key={t}
                                            className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold text-neutral-900 whitespace-normal break-words shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="water-inset rounded-3xl p-5">
                                <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                    Business verification help
                                </div>
                                <p className="mt-2 text-[12.5px] font-medium text-neutral-700 leading-[1.75] whitespace-normal break-words">
                                    Business accounts are subject to verification before they can operate on 6chatting as Business profiles.
                                    We may request a government-issued ID for the owner/admin and valid business documents to confirm
                                    authenticity and protect users.
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Pill className="text-[11.5px]">Government ID</Pill>
                                    <Pill className="text-[11.5px]">Business registration</Pill>
                                    <Pill className="text-[11.5px]">Verification status</Pill>
                                </div>

                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    <Button href="/business" className="w-full">
                                        Business overview
                                    </Button>
                                    <Button href="/pricing" className="w-full">
                                        Plans
                                    </Button>
                                </div>
                            </div>
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

            {/* Premium hover animation (no extra libs) */}
            <style jsx global>{`
        .help-tilt {
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
          will-change: transform;
        }
        .help-tilt:hover {
          transform: translateY(-2px);
          filter: saturate(1.02);
          box-shadow: 12px 12px 26px rgba(0, 0, 0, 0.10), -12px -12px 26px rgba(255, 255, 255, 0.96);
        }
        @media (prefers-reduced-motion: reduce) {
          .help-tilt,
          .help-tilt:hover {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
        </main>
    );
}
