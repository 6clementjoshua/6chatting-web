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
                    {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
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
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                aria-expanded={open}
            >
                <span className="text-[13px] font-semibold text-neutral-900">{title}</span>
                <span className="text-[12px] font-semibold text-neutral-500">{open ? "Hide" : "Show"}</span>
            </button>
            {open ? (
                <div className="border-t border-neutral-200 px-4 py-3 text-[14px] leading-[1.75] text-neutral-800">
                    {children}
                </div>
            ) : null}
        </div>
    );
}

function MiniGrid({
    items,
}: {
    items: Array<{ title: string; body: React.ReactNode; badge?: string }>;
}) {
    return (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {items.map((it) => (
                <div key={it.title} className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] font-semibold text-neutral-900">{it.title}</p>
                        {it.badge ? <Badge>{it.badge}</Badge> : null}
                    </div>
                    <div className="mt-2 text-[14px] leading-[1.75] text-neutral-800">{it.body}</div>
                </div>
            ))}
        </div>
    );
}

export default function AiTranslationClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "Overview", badge: "Read first" },
            { id: "how-it-works", label: "How translation works" },
            { id: "accuracy", label: "Accuracy, nuance & limitations", badge: "Important" },
            { id: "responsibility", label: "User responsibility & verification" },
            { id: "safety", label: "Safety safeguards & prohibited use", badge: "Strict" },
            { id: "sensitive", label: "Sensitive domains (medical/legal/finance)" },
            { id: "voice-calls", label: "Voice/calls translation guidance" },
            { id: "children", label: "Children & family guidance" },
            { id: "data", label: "Data handling & privacy" },
            { id: "fairness", label: "Fairness, bias & cultural context" },
            { id: "intellectual", label: "IP, consent & content rights" },
            { id: "availability", label: "Language coverage & availability" },
            { id: "reporting", label: "Reporting translation issues" },
            { id: "enforcement", label: "Enforcement" },
            { id: "updates", label: "Policy updates" },
            { id: "contact", label: "Contact" },
            { id: "faqs", label: "FAQs" },
        ],
        []
    );

    const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "overview");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        observerRef.current?.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
                if (visible?.target?.id) setActiveId(visible.target.id);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: [0.08, 0.15] }
        );
        els.forEach((el) => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, [toc]);

    const containerAnim = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

    const jsonLd = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AI & Translation Policy",
            url: "https://6chatting.com/policies/ai-translation",
            isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
            about: { "@type": "Thing", name: "AI Translation and Multilingual Communication" },
            dateModified: lastUpdated,
            publisher: { "@type": "Organization", name: "6clement Joshua Service" },
        };
    }, [lastUpdated]);

    return (
        <main
            className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-neutral-900 antialiased")}
            style={{
                fontFamily:
                    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Ambient */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-neutral-100 blur-3xl" />
                <div className="absolute top-52 right-[-120px] h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
                <div className="absolute top-72 left-[-160px] h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-5 py-10 sm:py-14">
                {/* Header */}
                <motion.header {...containerAnim} className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-[12px] font-semibold text-neutral-700 shadow-sm backdrop-blur">
                        <span className="tracking-[-0.01em]">{BRAND}</span>
                        <span className="text-neutral-400">•</span>
                        <span>Policy Center</span>
                    </div>

                    <h1
                        className="mt-4 text-3xl font-bold tracking-[-0.03em] text-black sm:text-4xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        AI & Translation Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        {BRAND} exists to help people communicate across languages—through chat translation and, where available, voice/calling translation.
                        This policy explains how translation works, what it can and cannot guarantee, how we reduce harm, and what we expect from users
                        worldwide.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Nuance & safety</Badge>
                        <Badge>Global users</Badge>
                        <Badge>Responsible use</Badge>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Callout title="Core idea" tone="info">
                            Translation is not only words. It carries tone, context, culture, and intent. {BRAND} aims to reduce barriers, but users must
                            verify critical meaning before acting.
                        </Callout>
                        <Callout title="Cross-reference" tone="neutral">
                            Safety rules apply to translated content as well. See{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                Safety Policy
                            </Link>{" "}
                            and{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                Acceptable Use
                            </Link>
                            .
                        </Callout>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px]">
                        <Link
                            href="/policies/privacy"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/policies/safety"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Safety
                        </Link>
                        <Link
                            href="/policies/acceptable-use"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Acceptable Use
                        </Link>
                        <Link
                            href="/policies/contact"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Contact
                        </Link>
                    </div>
                </motion.header>

                {/* Layout */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
                    {/* TOC */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-3xl border border-neutral-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                            <div className="flex items-center justify-between">
                                <div className="text-[13px] font-semibold text-neutral-900">On this page</div>
                                <a href="#reporting" className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800">
                                    Report an issue
                                </a>
                            </div>

                            <nav className="mt-3 space-y-1">
                                {toc.map((item) => {
                                    const active = item.id === activeId;
                                    return (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={cx(
                                                "flex items-center justify-between gap-3 rounded-2xl px-3 py-2 text-[13px] font-semibold transition",
                                                active ? "bg-neutral-900 text-white shadow-sm" : "bg-white/60 text-neutral-800 hover:bg-white"
                                            )}
                                        >
                                            <span className="truncate">{item.label}</span>
                                            {item.badge ? (
                                                <span
                                                    className={cx(
                                                        "shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold",
                                                        active ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-700"
                                                    )}
                                                >
                                                    {item.badge}
                                                </span>
                                            ) : null}
                                        </a>
                                    );
                                })}
                            </nav>

                            <div className="mt-4">
                                <Callout title="Translation safety" tone="neutral">
                                    If a translation could cause harm or appears abusive, do not act on it. Verify context and report. We treat translated
                                    abuse as abuse.
                                </Callout>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="space-y-5">
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Deep clarity</Badge>}>
                            <p>
                                Translation is powerful because it can connect people who otherwise could not communicate. But it also carries risk:
                                mistranslation, missing context, and cultural misunderstanding. This policy sets expectations, protects users, and helps
                                keep translation safe and reliable.
                            </p>
                            <MiniGrid
                                items={[
                                    {
                                        title: "What we provide",
                                        badge: "Service",
                                        body: (
                                            <>
                                                Tools to translate messages and (where available) voice/calls into a chosen language, helping you understand and
                                                respond in real time.
                                            </>
                                        ),
                                    },
                                    {
                                        title: "What we do not promise",
                                        badge: "Limits",
                                        body: (
                                            <>
                                                Perfect accuracy, legal/medical correctness, or the capture of full cultural nuance in every situation.
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </PolicyCard>

                        <PolicyCard id="how-it-works" title="How translation works" rightSlot={<Badge>Conceptual</Badge>}>
                            <p>
                                {BRAND} may use machine learning, AI models, and language processing techniques to translate content between languages.
                                Translation may involve:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Detection:</strong> identifying the source language and target language.</li>
                                <li><strong>Conversion:</strong> mapping meaning between languages using learned patterns.</li>
                                <li><strong>Post-processing:</strong> formatting, punctuation, and readability improvements.</li>
                                <li><strong>Context hints:</strong> prior messages or conversation structure (where available) to reduce ambiguity.</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="Human languages are not symmetrical" tone="info">
                                    Some words or phrases have no direct match in another language. Idioms, sarcasm, slang, humor, and honorifics can
                                    translate imperfectly.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="accuracy" title="Accuracy, nuance & limitations" rightSlot={<Badge>Important</Badge>}>
                            <p>
                                Translation accuracy depends on many factors, including grammar, dialect, slang, noise (for voice), and how much context
                                is present. Common limitations include:
                            </p>
                            <MiniGrid
                                items={[
                                    {
                                        title: "Ambiguity",
                                        badge: "Common",
                                        body: <>Some sentences have multiple meanings; translation may select the wrong one.</>,
                                    },
                                    {
                                        title: "Tone & intent",
                                        badge: "High impact",
                                        body: <>Politeness, sarcasm, jokes, or anger may not carry correctly across languages.</>,
                                    },
                                    {
                                        title: "Names & entities",
                                        badge: "Precision",
                                        body: <>People, places, brands, and technical terms may be misread or reformatted.</>,
                                    },
                                    {
                                        title: "Dialect & slang",
                                        badge: "Regional",
                                        body: <>Local phrases can translate literally instead of correctly.</>,
                                    },
                                ]}
                            />

                            <div className="mt-4">
                                <Callout title="Always verify high-stakes content" tone="warning">
                                    For decisions involving money, safety, legal rights, contracts, immigration, medical treatment, or emergency actions,
                                    verify meaning with a qualified human interpreter or professional.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="responsibility" title="User responsibility & verification" rightSlot={<Badge>Shared responsibility</Badge>}>
                            <p>
                                You are responsible for how you use translations. Before you rely on a translation:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Ask clarifying questions if something seems unclear or surprising.</li>
                                <li>Confirm key facts: numbers, dates, locations, instructions.</li>
                                <li>Do not treat translations as professional advice.</li>
                                <li>Respect cultural differences and avoid assumptions.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Business and sensitive conversations" tone="info">
                                    For contracts, negotiations, or regulated transactions, consider professional translation or dual confirmation in both
                                    languages.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="safety" title="Safety safeguards & prohibited use" rightSlot={<Badge>Strict</Badge>}>
                            <p>
                                Translation features cannot be used to facilitate harm or policy violations. We treat translated abuse the same as abuse
                                in the original language.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Threats, harassment, hate, or bullying in any language.</li>
                                <li>Instructions for wrongdoing, violence, or exploitation.</li>
                                <li>Fraud, phishing, impersonation, or manipulation across languages.</li>
                                <li>Sexual exploitation, especially involving minors (zero tolerance).</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Enforcement" tone="danger">
                                    Violations may result in content removal, feature restriction, account suspension, or permanent termination under{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                        Acceptable Use
                                    </Link>{" "}
                                    and{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                        Safety Policy
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="sensitive" title="Sensitive domains (medical/legal/finance)" rightSlot={<Badge>High risk</Badge>}>
                            <p>
                                Translation in high-stakes domains can cause serious harm if incorrect. For these domains:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Medical:</strong> symptoms, prescriptions, diagnosis, emergency care.</li>
                                <li><strong>Legal:</strong> contracts, immigration, court matters, rights and obligations.</li>
                                <li><strong>Financial:</strong> payments, bank instructions, investment decisions.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Required behavior" tone="warning">
                                    Use professional help when needed. Do not rely solely on {BRAND} translation for irreversible decisions.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="voice-calls" title="Voice/calls translation guidance" rightSlot={<Badge>Audio nuance</Badge>}>
                            <p>
                                For voice/calling translation, accuracy depends on background noise, accents, speaking pace, and microphone quality.
                                To improve results:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Speak clearly, at a moderate pace, with complete sentences.</li>
                                <li>Reduce background noise where possible.</li>
                                <li>Repeat key details (numbers, addresses, dates).</li>
                                <li>Confirm important points in writing when possible.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Consent and respect" tone="info">
                                    In some regions, recording or transcribing calls requires consent. Follow local law and respect user expectations.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="children" title="Children & family guidance" rightSlot={<Badge>Safe use</Badge>}>
                            <p>
                                Translation can expose children to content they do not fully understand. Parents/guardians should supervise minors and
                                teach them not to share personal information.
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="For parents/guardians" tone="info">
                                    Encourage children to ask an adult to review translations that involve strangers, money, meeting plans, or private details.
                                </Callout>
                                <Callout title="Zero tolerance" tone="danger">
                                    Any child exploitation or grooming behavior is prohibited and may trigger immediate termination and legal escalation.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="data" title="Data handling & privacy" rightSlot={<Badge>Privacy</Badge>}>
                            <p>
                                Translation requires processing of content to generate translated output. Data handling depends on product features and
                                settings. We aim to minimize data and protect it with reasonable safeguards.
                            </p>
                            <div className="mt-4">
                                <Callout title="Privacy cross-reference" tone="neutral">
                                    For details on what we collect, retention, and user rights, see{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                        Privacy Policy
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="fairness" title="Fairness, bias & cultural context" rightSlot={<Badge>Respect</Badge>}>
                            <p>
                                Language models may reflect biases present in training data. We strive to reduce harmful bias and improve translation
                                quality across regions and dialects.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>We encourage reporting biased, offensive, or inaccurate translations.</li>
                                <li>We consider cultural context when assessing harm and intent.</li>
                                <li>We continuously improve language support over time.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="intellectual" title="IP, consent & content rights" rightSlot={<Badge>Ownership</Badge>}>
                            <p>
                                You are responsible for the content you submit for translation. Do not upload content you do not have the right to use,
                                translate, or share (e.g., copyrighted work, confidential documents) without permission.
                            </p>
                            <div className="mt-4">
                                <Callout title="Confidential information" tone="warning">
                                    Avoid submitting highly confidential personal or business information unless you accept the risk and have the right
                                    to process it.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="availability" title="Language coverage & availability" rightSlot={<Badge>Global</Badge>}>
                            <p>
                                Language support may vary by region, platform, and feature. We may add, remove, or modify supported languages or models
                                to improve performance and safety.
                            </p>
                            <div className="mt-4">
                                <Callout title="No guarantee of universal coverage" tone="neutral">
                                    We aim to support many languages, but we do not guarantee that every dialect or specialized domain will be supported
                                    at all times.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="reporting" title="Reporting translation issues" rightSlot={<Badge>Help us improve</Badge>}>
                            <p>
                                Report translations that are incorrect, harmful, biased, or unsafe. Include:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Source language and target language</li>
                                <li>The original text/audio context (if possible)</li>
                                <li>What the translation output was</li>
                                <li>Why it is incorrect or harmful</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Contact" tone="info">
                                    Email <strong>{SUPPORT_EMAIL}</strong> with subject “Translation Issue” and include relevant details.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="enforcement" title="Enforcement" rightSlot={<Badge>Account impact</Badge>}>
                            <p>
                                Misuse of translation features is treated as misuse of the platform. We may apply enforcement actions under our{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                    Acceptable Use
                                </Link>{" "}
                                and{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                    Safety Policy
                                </Link>
                                , including feature restrictions, suspension, or termination.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="updates" title="Policy updates" rightSlot={<Badge>Versioned</Badge>}>
                            <p>
                                We may update this policy to reflect improvements in translation technology, safety practices, legal requirements, or
                                product changes. Updates are posted here with a revised date.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Support</Badge>}>
                            <p>
                                For questions about translation, AI behavior, or safety concerns, contact:
                            </p>
                            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                                <p className="mt-1">
                                    <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                                        {SUPPORT_EMAIL}
                                    </a>
                                </p>
                                <p className="mt-2 text-neutral-600">
                                    Use subject: “AI & Translation” and include your account email and any examples.
                                </p>
                            </div>
                        </PolicyCard>

                        <section id="faqs" className="scroll-mt-28">
                            <div className="rounded-3xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-[15px] font-semibold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                        FAQs
                                    </h2>
                                    <Badge>Expandable</Badge>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Disclosure title="Is translation always correct?">
                                        No. Translation can be wrong, incomplete, or miss tone/nuance. Verify high-stakes content and clarify uncertain meaning.
                                    </Disclosure>

                                    <Disclosure title="Does 6chatting understand context?">
                                        Translation tools may use limited context (like conversation structure) but cannot guarantee full cultural nuance or intent.
                                    </Disclosure>

                                    <Disclosure title="Can I use translation to threaten or harass someone?">
                                        No. Any abuse in any language violates policy and can lead to suspension or termination.
                                    </Disclosure>

                                    <Disclosure title="What should I do if a translation causes harm or confusion?">
                                        Stop acting on it, request clarification from the other person, and report the issue with both the source and translated output.
                                    </Disclosure>

                                    <Disclosure title="Can children use translation features safely?">
                                        Children should be supervised. Parents/guardians should teach kids not to share personal information and to escalate suspicious messages to an adult.
                                    </Disclosure>
                                </div>
                            </div>
                        </section>

                        <footer className="pt-6 text-center text-xs text-neutral-500">
                            © {new Date().getFullYear()} {BRAND}. A 6clement Joshua Service.
                        </footer>
                    </div>
                </div>
            </div>
        </main>
    );
}
