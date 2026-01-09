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

function cx(...p: Array<string | false | undefined | null>) {
    return p.filter(Boolean).join(" ");
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
                    <h2
                        className="text-[15px] font-semibold tracking-[-0.01em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {title}
                    </h2>
                    {rightSlot}
                </div>
                <div className="px-5 py-4 text-[14.5px] leading-[1.85] text-neutral-800">{children}</div>
            </div>
        </section>
    );
}

export default function TermsClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = [
        { id: "overview", label: "Overview", badge: "Read first" },
        { id: "eligibility", label: "Who may use 6chatting", badge: "Eligibility" },
        { id: "accounts", label: "Accounts & registration" },
        { id: "acceptable", label: "User conduct & responsibilities" },
        { id: "safety", label: "Safety-first enforcement", badge: "Core" },
        { id: "children", label: "Children & minors", badge: "Zero tolerance" },
        { id: "content", label: "Content & communication" },
        { id: "ai", label: "AI & translation terms" },
        { id: "billing", label: "Paid services & billing" },
        { id: "termination", label: "Suspension & termination", badge: "Account impact" },
        { id: "legal", label: "Legal compliance & liability" },
        { id: "changes", label: "Changes to terms" },
        { id: "contact", label: "Contact" },
    ];

    const [activeId, setActiveId] = useState(toc[0].id);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const els = toc.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        observerRef.current?.disconnect();
        observerRef.current = new IntersectionObserver(
            entries => {
                const v = entries.find(e => e.isIntersecting);
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
                        Terms of Service
                    </h1>
                    <p className="mt-3 text-[14.5px] leading-[1.75] text-neutral-600">
                        These Terms govern access to and use of {BRAND}.
                        By using the service, you agree to follow our rules and safety standards.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Global application</Badge>
                        <Badge>Safety-first</Badge>
                    </div>
                </header>

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
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Binding agreement</Badge>}>
                            <p>
                                These Terms of Service form a legally binding agreement between you and {BRAND}.
                                They exist to protect users, promote respectful communication, and maintain a safe
                                global environment for multilingual chat and calls.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="eligibility" title="Who may use 6chatting" rightSlot={<Badge>Clear rules</Badge>}>
                            <p>You may use {BRAND} only if:</p>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>You can form a legally binding agreement in your country</li>
                                <li>You comply with all applicable local and international laws</li>
                                <li>You are not prohibited from using digital communication services</li>
                            </ul>
                            <Callout title="Age requirements" tone="warning">
                                Children may use {BRAND} only with parental or guardian guidance.
                                Any misuse involving minors results in immediate enforcement.
                            </Callout>
                        </PolicyCard>

                        <PolicyCard id="accounts" title="Accounts & registration">
                            <p>
                                You are responsible for maintaining the security of your account and for all activity
                                that occurs under it. You must not share access credentials or impersonate others.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="acceptable" title="User conduct & responsibilities">
                            <p>
                                You agree to use {BRAND} respectfully and lawfully.
                                Prohibited behavior is defined in our{" "}
                                <Link className="underline font-semibold" href="/policies/acceptable-use">
                                    Acceptable Use Policy
                                </Link>.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="safety" title="Safety-first enforcement" rightSlot={<Badge>Non-negotiable</Badge>}>
                            <Callout title="Zero tolerance" tone="danger">
                                Harassment, hate, fraud, threats, or exploitation—especially involving children—
                                will result in immediate suspension or permanent termination.
                            </Callout>
                            <p className="mt-3">
                                Safety standards are detailed in our{" "}
                                <Link className="underline font-semibold" href="/policies/safety">
                                    Safety Policy
                                </Link>.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="children" title="Children & minors">
                            <p>
                                {BRAND} is committed to protecting minors. Any sexual content, grooming,
                                or exploitation of children is strictly prohibited and may be reported
                                to relevant authorities.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="content" title="Content & communication">
                            <p>
                                You retain ownership of your content but grant {BRAND} limited rights
                                to process it to provide the service (such as translation and delivery).
                            </p>
                        </PolicyCard>

                        <PolicyCard id="ai" title="AI & translation terms">
                            <p>
                                Translation features are provided to assist understanding, not to replace
                                human judgment. See{" "}
                                <Link className="underline font-semibold" href="/policies/ai-translation">
                                    AI & Translation Policy
                                </Link>.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="billing" title="Paid services & billing">
                            <p>
                                Some features require payment. Billing, renewals, and refunds are governed by
                                our{" "}
                                <Link className="underline font-semibold" href="/policies/subscription-billing">
                                    Subscription & Billing
                                </Link>{" "}
                                and{" "}
                                <Link className="underline font-semibold" href="/policies/refunds">
                                    Refund Policy
                                </Link>.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="termination" title="Suspension & termination" rightSlot={<Badge>Final authority</Badge>}>
                            <Callout title="Account consequences" tone="danger">
                                We may suspend or permanently delete accounts that violate these Terms,
                                our policies, or applicable law—without prior notice in severe cases.
                            </Callout>
                        </PolicyCard>

                        <PolicyCard id="legal" title="Legal compliance & liability">
                            <p>
                                {BRAND} operates globally. Users are responsible for complying with
                                local laws. To the fullest extent permitted by law, {BRAND} disclaims
                                liability for misuse of the service.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="changes" title="Changes to terms">
                            <p>
                                We may update these Terms to reflect legal, safety, or product changes.
                                Continued use means acceptance of the updated Terms.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact">
                            <p>
                                Questions about these Terms can be sent to{" "}
                                <a className="underline font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>
                                    {SUPPORT_EMAIL}
                                </a>.
                            </p>
                        </PolicyCard>

                        <footer className="pt-6 text-center text-xs text-neutral-500">
                            © {new Date().getFullYear()} {BRAND}. A 6clement Joshua Service.
                        </footer>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
