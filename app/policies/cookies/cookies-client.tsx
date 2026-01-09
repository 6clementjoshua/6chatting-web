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
    tone?: "neutral" | "info" | "warning";
}) {
    const styles =
        tone === "warning"
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

function Table({
    columns,
    rows,
}: {
    columns: string[];
    rows: Array<Record<string, React.ReactNode>>;
}) {
    return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white/70">
            <div className="hidden grid-cols-4 gap-2 border-b border-neutral-200 bg-white/80 px-4 py-3 text-[12px] font-semibold text-neutral-700 sm:grid">
                {columns.map((c) => (
                    <div key={c}>{c}</div>
                ))}
            </div>

            <div className="divide-y divide-neutral-200">
                {rows.map((r, idx) => (
                    <div key={idx} className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-4">
                        {columns.map((c) => (
                            <div key={c}>
                                <div className="sm:hidden text-[11px] font-semibold text-neutral-500">{c}</div>
                                <div className="text-[14px] leading-[1.6] text-neutral-900">{r[c]}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CookiesClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "Overview", badge: "Read first" },
            { id: "what", label: "What cookies are" },
            { id: "why", label: "Why we use cookies" },
            { id: "categories", label: "Cookie categories", badge: "Core" },
            { id: "analytics", label: "Analytics & measurement" },
            { id: "preferences", label: "Managing preferences" },
            { id: "do-not-track", label: "Do Not Track & signals" },
            { id: "third-parties", label: "Third-party technologies" },
            { id: "retention", label: "Retention & expiry" },
            { id: "regional", label: "Regional notice (EU/UK/US)" },
            { id: "changes", label: "Changes to this policy" },
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
            name: "Cookies Policy",
            url: "https://6chatting.com/policies/cookies",
            isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
            about: { "@type": "Thing", name: "Cookies and Tracking Technologies" },
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
                        Cookies Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        This Cookies Policy explains what cookies and similar technologies are, how {BRAND} uses them, and how users worldwide can
                        manage preferences. This policy complements our{" "}
                        <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                            Privacy Policy
                        </Link>
                        .
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Preferences</Badge>
                        <Badge>Analytics</Badge>
                        <Badge>Global notice</Badge>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Callout title="Your control" tone="info">
                            You can typically control cookies through your browser settings. Where required, we may provide a cookie consent
                            experience that allows you to opt in/out of certain categories.
                        </Callout>
                        <Callout title="Essential cookies" tone="neutral">
                            Some cookies are strictly necessary for security and basic site functionality and cannot be disabled without breaking key
                            features.
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
                            href="/policies/terms"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Terms of Service
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
                                <a href="#preferences" className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800">
                                    Manage cookies
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
                                <Callout title="Privacy cross-reference" tone="neutral">
                                    Cookies are one way we process limited device and usage information. See{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                        Privacy Policy
                                    </Link>{" "}
                                    for broader data handling.
                                </Callout>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="space-y-5">
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Transparency</Badge>}>
                            <p>
                                Cookies and similar technologies help websites function and help service providers understand performance and improve
                                user experience. This policy explains how {BRAND} may use cookies, pixel tags, local storage, SDKs, and similar tools.
                            </p>
                            <div className="mt-4">
                                <Callout title="Not all cookies are the same" tone="info">
                                    Some cookies are strictly necessary for security and login. Others support preferences, analytics, or marketing where
                                    used. We aim to minimize data and align with applicable laws.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="what" title="What cookies are" rightSlot={<Badge>Definitions</Badge>}>
                            <p>
                                Cookies are small text files stored on your device by your browser when you visit a website. Similar technologies include:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Local storage:</strong> browser storage for preferences and session state.</li>
                                <li><strong>Pixel tags:</strong> small images used to measure page views or email engagement.</li>
                                <li><strong>SDKs:</strong> mobile components used for analytics or functionality (for apps).</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="why" title="Why we use cookies" rightSlot={<Badge>Purposes</Badge>}>
                            <p>We may use cookies and similar technologies to:</p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Enable core functionality (login, security, session management).</li>
                                <li>Remember preferences (language, display settings).</li>
                                <li>Measure performance and improve reliability.</li>
                                <li>Detect fraud and protect accounts.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="categories" title="Cookie categories" rightSlot={<Badge>Core</Badge>}>
                            <Table
                                columns={["Category", "Purpose", "Examples", "Can you disable?"]}
                                rows={[
                                    {
                                        Category: <strong>Strictly Necessary</strong>,
                                        Purpose: "Security, login/session, load balancing, fraud prevention.",
                                        Examples: "Auth session cookie, CSRF token, security flags.",
                                        "Can you disable?": "Not without breaking essential features.",
                                    },
                                    {
                                        Category: <strong>Preferences</strong>,
                                        Purpose: "Remember settings such as language, UI display, consent state.",
                                        Examples: "Saved language code, theme preference.",
                                        "Can you disable?": "Often yes; features may be less personalized.",
                                    },
                                    {
                                        Category: <strong>Analytics</strong>,
                                        Purpose: "Understand usage and performance, improve features.",
                                        Examples: "Anonymous page view counts, error telemetry.",
                                        "Can you disable?": "Usually yes via consent settings or browser controls (where applicable).",
                                    },
                                    {
                                        Category: <strong>Marketing</strong>,
                                        Purpose: "Promotions/measurement of campaigns (if used).",
                                        Examples: "Campaign attribution tags.",
                                        "Can you disable?": "Yes (where used) via consent and settings.",
                                    },
                                ]}
                            />

                            <div className="mt-4">
                                <Callout title="Marketing note" tone="neutral">
                                    If {BRAND} uses marketing cookies, we will aim to provide disclosure and choice consistent with applicable law. Some
                                    regions require opt-in consent for non-essential cookies.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="analytics" title="Analytics & measurement" rightSlot={<Badge>Improve quality</Badge>}>
                            <p>
                                We may use analytics to understand how the site or app performs—such as page load times, error rates, and general
                                navigation patterns. Analytics helps us:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Fix bugs and improve performance.</li>
                                <li>Detect and prevent abuse.</li>
                                <li>Understand which features are useful and which need improvement.</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="Data minimization" tone="info">
                                    We aim to collect only what is reasonably needed for performance and safety. See the Privacy Policy for details on
                                    retention and user rights.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="preferences" title="Managing preferences" rightSlot={<Badge>Your choice</Badge>}>
                            <p>You can manage cookies in multiple ways:</p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Browser controls:</strong> block or delete cookies in your browser settings.</li>
                                <li><strong>Device settings:</strong> manage tracking permissions in your device OS (especially for apps).</li>
                                <li><strong>Consent tools:</strong> where presented, set cookie preferences through our consent experience.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="If you block cookies" tone="warning">
                                    Blocking strictly necessary cookies may prevent login, payments, or core features from working correctly.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="do-not-track" title="Do Not Track & signals" rightSlot={<Badge>Signals</Badge>}>
                            <p>
                                Some browsers offer a “Do Not Track” signal. Because there is no universal standard for how to interpret it, our
                                response may vary by region and product configuration. Where required by law, we will honor applicable opt-out or consent
                                requirements.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="third-parties" title="Third-party technologies" rightSlot={<Badge>Partners</Badge>}>
                            <p>
                                Some third-party services may set cookies or use similar technologies when you use {BRAND} (for example, payment flows,
                                fraud prevention, or analytics). Their processing is governed by their own policies.
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="Payments" tone="neutral">
                                    Payment providers may use cookies or similar tools for fraud prevention and transaction security during checkout.
                                </Callout>
                                <Callout title="Where to learn more" tone="info">
                                    For third-party disclosures and broader data handling, see{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                        Privacy Policy
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="retention" title="Retention & expiry" rightSlot={<Badge>Lifecycle</Badge>}>
                            <p>
                                Cookies can be:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Session cookies:</strong> deleted when you close your browser.</li>
                                <li><strong>Persistent cookies:</strong> remain until they expire or you delete them.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Our approach" tone="neutral">
                                    We aim to limit cookie lifetimes to what is reasonably necessary for security, preferences, and performance.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="regional" title="Regional notice (EU/UK/US)" rightSlot={<Badge>Compliance</Badge>}>
                            <p>
                                Cookie requirements vary by region. In certain jurisdictions (such as the EU/UK), non-essential cookies may require
                                opt-in consent. In other places, opt-out or disclosure rules may apply. We aim to provide appropriate controls where required.
                            </p>
                            <div className="mt-4">
                                <Callout title="If you are in a region with strict consent rules" tone="info">
                                    You may see a cookie consent banner or settings tool that allows you to choose categories. Your choices may be stored
                                    as a preference cookie.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="changes" title="Changes to this policy" rightSlot={<Badge>Versioned</Badge>}>
                            <p>
                                We may update this Cookies Policy to reflect new technologies, legal requirements, or product changes. Updates will be
                                posted here with a revised “Last updated” date.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Help</Badge>}>
                            <p>
                                For questions about cookies or preferences, contact:
                            </p>
                            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                                <p className="mt-1">
                                    <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                                        {SUPPORT_EMAIL}
                                    </a>
                                </p>
                                <p className="mt-2 text-neutral-600">
                                    Use subject: “Cookies” and include your device/browser details if you need troubleshooting.
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
                                    <Disclosure title="Do you use cookies to read my chats?">
                                        Cookies are generally used for website/app functionality (like sessions and preferences). Message processing is
                                        governed by feature delivery and safety systems, explained in the Privacy Policy.
                                    </Disclosure>

                                    <Disclosure title="If I delete cookies, what happens?">
                                        You may be logged out, and preferences like language choice may reset. Some features may require cookies to work.
                                    </Disclosure>

                                    <Disclosure title="Can I reject analytics cookies?">
                                        Where we provide consent controls, you can typically opt out of non-essential cookie categories. You can also use
                                        browser/device settings.
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
