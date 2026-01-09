"use client";

// app/policies/privacy/privacy-policy-client.tsx
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

type TocItem = { id: string; label: string; badge?: string };

const BRAND = "6chatting";
const SUPPORT_EMAIL = "support@6chatting.com";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function formatISODate(d: Date) {
    // Stable “Last updated” without locale inconsistency
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
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

function Disclosure({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
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

export default function PrivacyPolicyClient() {
    const prefersReducedMotion = useReducedMotion();

    const lastUpdated = useMemo(() => formatISODate(new Date()), []);
    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "Overview", badge: "Read first" },
            { id: "scope", label: "Scope & Definitions" },
            { id: "data-we-collect", label: "Information We Collect" },
            { id: "how-we-use", label: "How We Use Information" },
            { id: "legal-bases", label: "Legal Bases (Global)" },
            { id: "sharing", label: "Sharing & Disclosures" },
            { id: "international", label: "International Transfers" },
            { id: "cookies", label: "Cookies & Tracking" },
            { id: "children", label: "Children & Family Safety", badge: "Important" },
            { id: "security", label: "Security" },
            { id: "retention", label: "Data Retention" },
            { id: "your-rights", label: "Your Rights (All Countries)" },
            { id: "choices", label: "Your Choices & Controls" },
            { id: "third-parties", label: "Third-Party Services" },
            { id: "changes", label: "Changes to This Policy" },
            { id: "contact", label: "Contact" },
            { id: "faqs", label: "FAQs" },
        ],
        []
    );

    const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "overview");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const ids = toc.map((t) => t.id);
        const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
                if (visible?.target?.id) setActiveId(visible.target.id);
            },
            { root: null, threshold: [0.08, 0.15, 0.22], rootMargin: "-15% 0px -70% 0px" }
        );

        els.forEach((el) => observerRef.current?.observe(el));
        return () => observerRef.current?.disconnect();
    }, [toc]);

    const containerAnim = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

    // JSON-LD (structured data) — helpful for SEO. Kept simple and accurate.
    const jsonLd = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            url: "https://6chatting.com/policies/privacy",
            isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
            about: { "@type": "Thing", name: "Privacy Policy" },
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

            {/* Top ambient background (subtle, premium) */}
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
                        Privacy Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        This Privacy Policy explains how <strong>{BRAND}</strong> (“we”, “our”, “us”) collects, uses, shares, and
                        protects personal information when you use our website, mobile apps, and related services.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Global users</Badge>
                        <Badge>Children protections</Badge>
                        <Badge>Cross-referenced</Badge>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Callout title="Quick summary" tone="info">
                            We collect information you provide (like account details) plus limited technical/usage data to run the service,
                            process payments, support security, and improve translation & communications features.
                        </Callout>
                        <Callout title="Not legal advice" tone="neutral">
                            This policy is designed to be clear and globally relevant. If you need jurisdiction-specific legal advice,
                            consult qualified counsel.
                        </Callout>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px]">
                        <Link
                            href="/policies/terms"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/policies/acceptable-use"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Acceptable Use
                        </Link>
                        <Link
                            href="/policies/subscription-billing"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Subscription & Billing
                        </Link>
                        <Link
                            href="/policies/refunds"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Refund & Cancellation
                        </Link>
                        <Link
                            href="/policies/contact"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Contact
                        </Link>
                    </div>
                </motion.header>

                {/* Main grid */}
                <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
                    {/* Sticky TOC */}
                    <aside className="lg:sticky lg:top-6">
                        <div className="rounded-3xl border border-neutral-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                            <div className="flex items-center justify-between">
                                <div className="text-[13px] font-semibold text-neutral-900">On this page</div>
                                <a
                                    href="#contact"
                                    className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800"
                                >
                                    Need help?
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
                                                active
                                                    ? "bg-neutral-900 text-white shadow-sm"
                                                    : "bg-white/60 text-neutral-800 hover:bg-white"
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
                                <Callout title="Cross-reference" tone="neutral">
                                    For behavior rules and community standards, see{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                        Acceptable Use
                                    </Link>
                                    . For subscriptions and billing data, see{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/subscription-billing">
                                        Subscription & Billing
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="space-y-5">
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Core principles</Badge>}>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    <strong>Transparency:</strong> We explain what we collect and why, in plain language.
                                </li>
                                <li>
                                    <strong>Data minimization:</strong> We collect what we need to deliver and secure the service.
                                </li>
                                <li>
                                    <strong>Security:</strong> We use reasonable administrative, technical, and organizational safeguards.
                                </li>
                                <li>
                                    <strong>Control:</strong> You can request access, correction, deletion, and other rights depending on your location.
                                </li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="Translation & communications note" tone="info">
                                    When you use chat, voice, or calling translation features, we may process message content, audio, and related metadata
                                    to provide the requested functionality. See <a className="font-semibold underline underline-offset-2" href="#data-we-collect">Information We Collect</a>{" "}
                                    and <a className="font-semibold underline underline-offset-2" href="#how-we-use">How We Use Information</a>.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="scope" title="Scope & Definitions">
                            <p>
                                This policy applies to the {BRAND} website, mobile applications, and related services (collectively, the “Service”).
                                If a separate notice applies to a specific feature, that notice will supplement this policy.
                            </p>
                            <div className="mt-3 space-y-2">
                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                    <p className="text-[13px] font-semibold text-neutral-900">Key definitions</p>
                                    <ul className="mt-2 ml-5 list-disc space-y-2">
                                        <li><strong>Personal information:</strong> Data that identifies or can reasonably identify you.</li>
                                        <li><strong>Processing:</strong> Any operation performed on data (collection, storage, use, disclosure, deletion).</li>
                                        <li><strong>Controller/Business:</strong> Entity deciding how and why personal information is processed (varies by law).</li>
                                        <li><strong>Processor/Service provider:</strong> Entity processing data on behalf of the controller.</li>
                                    </ul>
                                </div>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="data-we-collect" title="Information We Collect" rightSlot={<Badge>Categories</Badge>}>
                            <p>We may collect the following categories of information, depending on how you use the Service:</p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">A. Account & profile</p>
                                    <ul className="mt-2 ml-5 list-disc space-y-1">
                                        <li>Email address and authentication details</li>
                                        <li>Profile information you choose to provide</li>
                                        <li>Language preferences and settings</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">B. Usage & diagnostics</p>
                                    <ul className="mt-2 ml-5 list-disc space-y-1">
                                        <li>Feature usage (screens, clicks, session activity)</li>
                                        <li>Crash logs, performance metrics, error diagnostics</li>
                                        <li>Support tickets and feedback you submit</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">C. Device & network</p>
                                    <ul className="mt-2 ml-5 list-disc space-y-1">
                                        <li>IP address (approximate location derived from IP)</li>
                                        <li>Browser/app version, device identifiers (where permitted)</li>
                                        <li>Network and security signals (anti-fraud)</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">D. Communications content</p>
                                    <ul className="mt-2 ml-5 list-disc space-y-1">
                                        <li>Messages you send/receive (to deliver messaging features)</li>
                                        <li>Audio for calls/voice translation (when you use those features)</li>
                                        <li>Metadata (timestamps, delivery status, participants)</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm sm:col-span-2">
                                    <p className="text-[13px] font-semibold text-neutral-900">E. Payments (subscriptions)</p>
                                    <p className="mt-2">
                                        Payments are processed by third-party providers such as <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                                        We do <strong>not</strong> store full card details. We may receive payment metadata like subscription status,
                                        transaction IDs, and billing confirmation.
                                    </p>
                                    <p className="mt-2">
                                        For details, see{" "}
                                        <Link className="font-semibold underline underline-offset-2" href="/policies/subscription-billing">
                                            Subscription & Billing
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Callout title="Sensitive data" tone="warning">
                                    Please avoid sharing sensitive personal information (e.g., government IDs, medical details, financial account numbers)
                                    through chat or support unless specifically requested for a verified, legitimate purpose.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="how-we-use" title="How We Use Information" rightSlot={<Badge>Purposes</Badge>}>
                            <ul className="ml-5 list-disc space-y-2">
                                <li><strong>Provide the Service:</strong> account creation, authentication, messaging, translation, calling features.</li>
                                <li><strong>Process subscriptions:</strong> billing status, invoicing support, fraud prevention.</li>
                                <li><strong>Safety & integrity:</strong> detect abuse, spam, and suspicious activity; enforce our policies.</li>
                                <li><strong>Improve performance:</strong> debug, optimize reliability, and enhance user experience.</li>
                                <li><strong>Communications:</strong> send essential notices (policy changes, security alerts, service updates).</li>
                                <li><strong>Legal compliance:</strong> meet lawful requests and obligations.</li>
                            </ul>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="Service messages" tone="neutral">
                                    We may contact you about security, billing, and changes to the Service. These are not marketing messages.
                                </Callout>
                                <Callout title="Marketing (where applicable)" tone="neutral">
                                    If we send marketing, you will have an opt-out where required by law. Preferences may vary by country.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="legal-bases" title="Legal Bases (Global)" rightSlot={<Badge>GDPR/UK GDPR aligned</Badge>}>
                            <p>
                                Depending on your location, we rely on one or more legal bases to process personal information:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Contract:</strong> to provide the Service you request (e.g., account, translation, messaging).</li>
                                <li><strong>Legitimate interests:</strong> security, fraud prevention, product improvement, and service reliability.</li>
                                <li><strong>Consent:</strong> where required (e.g., certain cookies, optional features, some marketing).</li>
                                <li><strong>Legal obligation:</strong> compliance with lawful requests and applicable regulations.</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="Jurisdiction note" tone="info">
                                    Terms like “controller,” “processor,” “business,” and “service provider” may apply differently depending on local law.
                                    Our operational intent is consistent: protect data, minimize collection, and honor user rights.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="sharing" title="Sharing & Disclosures" rightSlot={<Badge>No selling</Badge>}>
                            <p>
                                We may share limited personal information with trusted third parties only as needed to operate and secure the Service:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Payment processors:</strong> Stripe, Flutterwave (subscription payments and confirmations).</li>
                                <li><strong>Infrastructure providers:</strong> hosting, storage, content delivery, and security services.</li>
                                <li><strong>Analytics & diagnostics:</strong> to measure performance and fix issues (where enabled and permitted).</li>
                                <li><strong>Legal & safety:</strong> to comply with law or protect rights, safety, and integrity.</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="We do not sell your personal information" tone="neutral">
                                    We do not sell or rent personal information to third parties. If laws in your region define “sale” broadly,
                                    we provide controls consistent with those requirements (see <a className="font-semibold underline underline-offset-2" href="#your-rights">Your Rights</a>).
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="international" title="International Transfers" rightSlot={<Badge>Cross-border</Badge>}>
                            <p>
                                {BRAND} may process and store information in countries other than your own. When data is transferred internationally,
                                we take steps designed to provide an appropriate level of protection, which may include contractual safeguards and
                                security measures aligned with applicable law.
                            </p>
                            <div className="mt-4">
                                <Callout title="What this means for global users" tone="info">
                                    Your data may be accessed by authorized teams and vetted providers in multiple regions to keep the Service fast,
                                    reliable, and secure worldwide.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="cookies" title="Cookies & Tracking" rightSlot={<Badge>Controls</Badge>}>
                            <p>
                                We may use cookies and similar technologies to operate the website, remember preferences, and understand usage.
                                You can control cookies through your browser settings and, where available, in-product cookie controls.
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">Essential</p>
                                    <p className="mt-2">
                                        Needed for core functions like login, security, and basic site operations.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
                                    <p className="text-[13px] font-semibold text-neutral-900">Analytics (optional where required)</p>
                                    <p className="mt-2">
                                        Helps us understand performance and improve experiences. Availability depends on region and settings.
                                    </p>
                                </div>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="children" title="Children & Family Safety" rightSlot={<Badge>Kids protected</Badge>}>
                            <p>
                                We take children’s privacy seriously. The Service may be used by minors only where permitted and under applicable law,
                                and, where required, with a parent or legal guardian’s involvement and consent.
                            </p>

                            <div className="mt-4 grid gap-3">
                                <Callout title="If you are a parent/guardian" tone="warning">
                                    If you believe a child has provided personal information without appropriate consent, contact us at{" "}
                                    <strong>{SUPPORT_EMAIL}</strong>. We will take steps to investigate and, where required, delete the information.
                                </Callout>

                                <Callout title="Child-friendly guidance" tone="info">
                                    Children should not share private information in chats (home address, school details, phone number, financial details).
                                    Parents/guardians are encouraged to supervise usage and review safety settings.
                                </Callout>
                            </div>

                            <div className="mt-4 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">COPPA-style note (United States)</p>
                                <p className="mt-2">
                                    If COPPA applies, we will request verifiable parental consent before collecting personal information from children
                                    under the age threshold defined by applicable law.
                                </p>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="security" title="Security" rightSlot={<Badge>Safeguards</Badge>}>
                            <p>
                                We use reasonable security measures designed to protect personal information against unauthorized access, alteration,
                                disclosure, or destruction. No method of transmission or storage is 100% secure.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Access controls and authentication safeguards</li>
                                <li>Monitoring and abuse prevention measures</li>
                                <li>Encryption in transit where supported</li>
                                <li>Least-privilege principles for internal access</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="retention" title="Data Retention" rightSlot={<Badge>Time-limited</Badge>}>
                            <p>
                                We retain personal information only as long as necessary for the purposes described in this policy, including to:
                                (a) provide the Service, (b) comply with legal obligations, (c) resolve disputes, and (d) enforce agreements.
                            </p>
                            <div className="mt-4">
                                <Callout title="Practical examples" tone="neutral">
                                    Subscription/billing records may be kept for accounting and compliance. Security logs may be kept for a limited period
                                    to detect abuse. If you request deletion, we will process it subject to legal and security exceptions.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="your-rights" title="Your Rights (All Countries)" rightSlot={<Badge>Access • Delete • Correct</Badge>}>
                            <p>
                                Depending on your location, you may have rights relating to your personal information, including:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Access:</strong> request a copy of your data.</li>
                                <li><strong>Correction:</strong> fix inaccurate or incomplete information.</li>
                                <li><strong>Deletion:</strong> request deletion, subject to legal exceptions.</li>
                                <li><strong>Portability:</strong> receive certain data in a portable format where applicable.</li>
                                <li><strong>Objection/Restriction:</strong> object to or restrict certain processing (GDPR/UK GDPR contexts).</li>
                                <li><strong>Opt-out:</strong> opt out of certain processing where required (e.g., CPRA-style “sale/sharing” definitions).</li>
                            </ul>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="EEA/UK/Switzerland (GDPR/UK GDPR)" tone="info">
                                    You may have additional rights including lodging a complaint with your supervisory authority.
                                </Callout>
                                <Callout title="US (CCPA/CPRA-style)" tone="info">
                                    Where applicable, you may have rights to know, delete, correct, and opt-out of certain processing as defined by law.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="choices" title="Your Choices & Controls" rightSlot={<Badge>Settings</Badge>}>
                            <ul className="ml-5 list-disc space-y-2">
                                <li><strong>Account settings:</strong> update profile and preferences where available.</li>
                                <li><strong>Device controls:</strong> manage permissions (microphone, notifications) via OS settings.</li>
                                <li><strong>Cookies:</strong> manage via browser settings; disable non-essential cookies where available.</li>
                                <li><strong>Communications:</strong> unsubscribe from marketing where offered; essential notices may still be sent.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="third-parties" title="Third-Party Services" rightSlot={<Badge>Vetted providers</Badge>}>
                            <p>
                                The Service may integrate third-party services to operate features. These providers process data under contractual
                                obligations and security standards suitable for their role.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Payments:</strong> Stripe, Flutterwave (billing & subscription management).</li>
                                <li><strong>Infrastructure:</strong> hosting, storage, security and delivery providers.</li>
                                <li><strong>Customer support:</strong> tools for ticketing and communications (when used).</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="External links" tone="neutral">
                                    Our website may contain links to third-party sites. Their privacy practices are governed by their own policies.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="changes" title="Changes to This Policy" rightSlot={<Badge>Versioned</Badge>}>
                            <p>
                                We may update this Privacy Policy from time to time. We will post changes on this page and update the “Last updated”
                                date. If changes are material, we may provide additional notice as required by law.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Privacy requests</Badge>}>
                            <p>
                                For privacy-related questions or requests (access, deletion, correction), contact us at:
                            </p>
                            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                                <p className="mt-1">
                                    <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                                        {SUPPORT_EMAIL}
                                    </a>
                                </p>
                                <p className="mt-2 text-neutral-600">
                                    Include “Privacy Request” in the subject and the email associated with your account.
                                </p>
                            </div>
                        </PolicyCard>

                        <section id="faqs" className="scroll-mt-28">
                            <div className="rounded-3xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-[15px] font-semibold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                        FAQs
                                    </h2>
                                    <Badge>Helpful</Badge>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <Disclosure title="Do you store my card details?">
                                        No. Card details are handled directly by payment partners (e.g., Stripe, Flutterwave). We may receive limited
                                        billing metadata like subscription status and transaction identifiers.
                                    </Disclosure>

                                    <Disclosure title="Does 6chatting read my messages?">
                                        We process message content to deliver requested features (like translation, sending, and moderation/safety
                                        enforcement where applicable). We aim to minimize access and apply safeguards appropriate for the feature.
                                    </Disclosure>

                                    <Disclosure title="Can kids use 6chatting?">
                                        Where permitted by law, minors may use the Service under parental/guardian guidance. If a child’s data is collected
                                        without appropriate consent, contact {SUPPORT_EMAIL} for review and removal.
                                    </Disclosure>

                                    <Disclosure title="How do I request deletion of my data?">
                                        Email {SUPPORT_EMAIL} with “Privacy Request” in the subject. We may need to verify your request to protect your
                                        account and prevent unauthorized actions.
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
