"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

const BRAND = "6chatting";
const SUPPORT_EMAIL = "support@6chatting.com";

type TocItem = { id: string; label: string; badge?: string };

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function isoDate(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 shadow-sm">
            {children}
        </span>
    );
}

function Callout({
    title,
    children,
    tone = "neutral",
}: {
    title: string;
    children: React.ReactNode;
    tone?: "neutral" | "info" | "warning" | "danger";
}) {
    const styles =
        tone === "danger"
            ? "border-red-200 bg-red-50/60 text-red-950"
            : tone === "warning"
                ? "border-amber-200 bg-amber-50/60 text-amber-950"
                : tone === "info"
                    ? "border-sky-200 bg-sky-50/60 text-sky-950"
                    : "border-neutral-200 bg-white/70 text-neutral-900";

    return (
        <div className={cx("rounded-2xl border p-4 shadow-sm", styles)}>
            <div className="text-sm font-semibold">{title}</div>
            <div className="mt-2 text-[14px] leading-[1.75]">{children}</div>
        </div>
    );
}

function PolicyCard({
    id,
    title,
    children,
    rightSlot,
}: {
    id: string;
    title: string;
    children: React.ReactNode;
    rightSlot?: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-28">
            <div className="rounded-3xl border border-neutral-200 bg-white/70 shadow-sm backdrop-blur">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
                    <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-black" style={{ fontFamily: "var(--font-display)" }}>
                        {title}
                    </h2>
                    {rightSlot}
                </div>
                <div className="px-5 py-4 text-[14.5px] leading-[1.85] text-neutral-800">{children}</div>
            </div>
        </section>
    );
}

function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white/70 shadow-sm">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
            >
                <span className="text-[13px] font-semibold">{title}</span>
                <span className="text-[12px] font-semibold text-neutral-500">{open ? "Hide" : "Show"}</span>
            </button>
            {open && (
                <div className="border-t border-neutral-200 px-4 py-3 text-[14px] leading-[1.75]">
                    {children}
                </div>
            )}
        </div>
    );
}

export default function AcceptableUseClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = [
        { id: "overview", label: "Overview", badge: "Read first" },
        { id: "who", label: "Who this policy applies to" },
        { id: "permitted", label: "Permitted use" },
        { id: "prohibited", label: "Prohibited conduct", badge: "Strict" },
        { id: "illegal", label: "Illegal & harmful activity" },
        { id: "harassment", label: "Harassment & hate" },
        { id: "sexual", label: "Sexual content & exploitation" },
        { id: "children", label: "Children & minors", badge: "Zero tolerance" },
        { id: "fraud", label: "Fraud, scams & impersonation" },
        { id: "privacy", label: "Privacy violations & doxxing" },
        { id: "platform", label: "Platform abuse & misuse" },
        { id: "ai", label: "AI & translation misuse" },
        { id: "enforcement", label: "Enforcement actions", badge: "Account impact" },
        { id: "termination", label: "Suspension & account deletion" },
        { id: "appeals", label: "Appeals" },
        { id: "updates", label: "Policy updates" },
        { id: "contact", label: "Contact" },
        { id: "faqs", label: "FAQs" },
    ];

    const [activeId, setActiveId] = useState(toc[0].id);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const els = toc.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        observerRef.current?.disconnect();
        observerRef.current = new IntersectionObserver(
            entries => {
                const v = entries.filter(e => e.isIntersecting)[0];
                if (v?.target?.id) setActiveId(v.target.id);
            },
            { rootMargin: "-20% 0px -70% 0px" }
        );
        els.forEach(el => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, []);

    const anim = prefersReducedMotion ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

    return (
        <main className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-neutral-900")}>
            <motion.div {...anim} className="mx-auto max-w-6xl px-5 py-12">
                {/* Header */}
                <header className="mx-auto max-w-3xl text-center">
                    <Badge>{BRAND} Policy Center</Badge>
                    <h1 className="mt-4 text-3xl font-bold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                        Acceptable Use Policy
                    </h1>
                    <p className="mt-3 text-[14.5px] leading-[1.75] text-neutral-600">
                        This policy defines what is allowed and prohibited on {BRAND}.
                        Violations may result in **content removal, account suspension, or permanent deletion**.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Global enforcement</Badge>
                    </div>
                </header>

                {/* Layout */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
                    {/* TOC */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-3xl border bg-white/70 p-4 shadow-sm">
                            <div className="text-[13px] font-semibold mb-3">On this page</div>
                            {toc.map(t => (
                                <a
                                    key={t.id}
                                    href={`#${t.id}`}
                                    className={cx(
                                        "block rounded-xl px-3 py-2 text-[13px] font-semibold",
                                        activeId === t.id ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"
                                    )}
                                >
                                    {t.label}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="space-y-5">
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Mandatory</Badge>}>
                            <p>
                                This Acceptable Use Policy governs your access to and use of {BRAND}.
                                By using the service, you agree to comply with this policy, our{" "}
                                <Link className="underline font-semibold" href="/policies/terms">Terms of Service</Link>,{" "}
                                <Link className="underline font-semibold" href="/policies/safety">Safety Policy</Link>, and{" "}
                                <Link className="underline font-semibold" href="/policies/privacy">Privacy Policy</Link>.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="permitted" title="Permitted use">
                            <ul className="list-disc ml-5 space-y-2">
                                <li>Lawful, respectful communication across cultures and languages</li>
                                <li>Personal, educational, and business communication</li>
                                <li>Reporting abuse, safety risks, or suspicious behavior</li>
                                <li>Using translation and AI features responsibly</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="prohibited" title="Prohibited conduct" rightSlot={<Badge>Non-negotiable</Badge>}>
                            <Callout title="You may NOT use 6chatting to:" tone="danger">
                                <ul className="list-disc ml-5 space-y-1">
                                    <li>Violate any law or regulation</li>
                                    <li>Exploit, harm, or endanger others</li>
                                    <li>Harass, threaten, or intimidate individuals or groups</li>
                                    <li>Distribute illegal, deceptive, or abusive content</li>
                                    <li>Bypass safeguards or moderation systems</li>
                                </ul>
                            </Callout>
                        </PolicyCard>

                        <PolicyCard id="children" title="Children & minors" rightSlot={<Badge>Zero tolerance</Badge>}>
                            <Callout title="Immediate action" tone="danger">
                                Any sexual content involving minors, grooming behavior, or exploitation results in **immediate account termination**
                                and may be reported to relevant authorities.
                            </Callout>
                        </PolicyCard>

                        <PolicyCard id="ai" title="AI & translation misuse">
                            <p>
                                You may not use translation or AI features to:
                            </p>
                            <ul className="list-disc ml-5 space-y-2">
                                <li>Generate threats, hate, or harassment</li>
                                <li>Facilitate scams, fraud, or illegal acts</li>
                                <li>Misrepresent meaning to deceive others</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="enforcement" title="Enforcement actions" rightSlot={<Badge>Applied globally</Badge>}>
                            <p>Depending on severity and repetition, we may:</p>
                            <ul className="list-disc ml-5 space-y-2">
                                <li>Remove or limit visibility of content</li>
                                <li>Restrict features (chat, calls, translation)</li>
                                <li>Suspend accounts temporarily</li>
                                <li>Terminate accounts permanently</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="termination" title="Suspension & account deletion" rightSlot={<Badge>Final</Badge>}>
                            <Callout title="Account consequences" tone="danger">
                                We reserve the right to **suspend or permanently delete accounts** that violate this policy,
                                with or without prior notice, especially in cases involving:
                                <ul className="list-disc ml-5 mt-2">
                                    <li>Child exploitation</li>
                                    <li>Serious violence or threats</li>
                                    <li>Fraud or financial harm</li>
                                    <li>Repeated or egregious violations</li>
                                </ul>
                            </Callout>
                        </PolicyCard>

                        <PolicyCard id="appeals" title="Appeals">
                            <p>
                                If you believe enforcement was applied in error, you may appeal by contacting{" "}
                                <strong>{SUPPORT_EMAIL}</strong> with supporting details.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="updates" title="Policy updates">
                            <p>
                                We may update this policy at any time. Continued use of {BRAND} constitutes acceptance of the revised policy.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact">
                            <p>
                                For questions or reports regarding acceptable use:
                                <br />
                                <a className="underline font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>
                                    {SUPPORT_EMAIL}
                                </a>
                            </p>
                        </PolicyCard>

                        <section id="faqs" className="scroll-mt-28">
                            <Disclosure title="Can my account be deleted without warning?">
                                Yes. Severe violations (especially involving children, violence, or fraud) may result in immediate termination.
                            </Disclosure>
                            <Disclosure title="Do warnings always come first?">
                                Not always. Warnings are discretionary and depend on severity, intent, and risk.
                            </Disclosure>
                        </section>

                        <footer className="pt-6 text-center text-xs text-neutral-500">
                            © {new Date().getFullYear()} {BRAND}. A 6clement Joshua Service.
                        </footer>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
