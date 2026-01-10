//app/policies/refunds/refunds-client.tsx
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

function TableLike({
    rows,
}: {
    rows: Array<{ k: string; v: React.ReactNode }>;
}) {
    return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white/70">
            <div className="divide-y divide-neutral-200">
                {rows.map((r) => (
                    <div key={r.k} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[220px_1fr]">
                        <div className="text-[12px] font-semibold text-neutral-700">{r.k}</div>
                        <div className="text-[14px] leading-[1.75] text-neutral-900">{r.v}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function RefundsClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "Overview", badge: "Read first" },
            { id: "how-to-cancel", label: "How to cancel" },
            { id: "refund-basics", label: "Refund basics (global)" },
            { id: "eligible", label: "Refund-eligible scenarios" },
            { id: "not-eligible", label: "Non-refundable scenarios", badge: "Important" },
            { id: "timing", label: "Timing & processing windows" },
            { id: "processors", label: "Stripe & Flutterwave handling" },
            { id: "partial", label: "Proration & partial refunds" },
            { id: "chargebacks", label: "Chargebacks & disputes", badge: "Strict" },
            { id: "abuse", label: "Refund abuse & policy violations" },
            { id: "regional", label: "Regional consumer rights" },
            { id: "data", label: "Account deletion & data impact" },
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
            name: "Refund & Cancellation Policy",
            url: "https://6chatting.com/policies/refunds",
            isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
            about: { "@type": "Thing", name: "Refunds and Cancellations" },
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
                        Refund & Cancellation Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        This policy explains how to cancel subscriptions, when refunds may be available, how processing works through{" "}
                        <strong>Stripe</strong> and <strong>Flutterwave</strong>, and how we protect both users and the platform against abuse.
                        It complements{" "}
                        <Link className="font-semibold underline underline-offset-2" href="/policies/subscription-billing">
                            Subscription & Billing
                        </Link>
                        .
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Stripe + Flutterwave</Badge>
                        <Badge>Global users</Badge>
                        <Badge>Chargebacks</Badge>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Callout title="Core rule" tone="info">
                            You can cancel anytime to stop future renewals. Refund eligibility depends on the plan, timing, usage, and your region’s
                            mandatory consumer laws.
                        </Callout>
                        <Callout title="Best practice" tone="neutral">
                            If there is a billing issue, contact us before initiating a chargeback. We can usually resolve issues faster and avoid
                            account restrictions triggered by disputes.
                        </Callout>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px]">
                        <Link
                            href="/policies/subscription-billing"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Subscription & Billing
                        </Link>
                        <Link
                            href="/policies/terms"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/policies/privacy"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Privacy Policy
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
                                <a href="#contact" className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800">
                                    Refund help
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
                                <Callout title="Cross-reference" tone="neutral">
                                    Billing mechanics are defined in{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/subscription-billing">
                                        Subscription & Billing
                                    </Link>
                                    . Safety/policy violations can affect eligibility (see{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                        Acceptable Use
                                    </Link>
                                    ).
                                </Callout>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="space-y-5">
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Clear & fair</Badge>}>
                            <p>
                                Refunds and cancellations are handled in a way that protects users and maintains platform integrity. We aim to be
                                transparent about eligibility, processing timelines, and dispute resolution. If mandatory local consumer laws grant
                                additional rights, those rights apply.
                            </p>

                            <TableLike
                                rows={[
                                    {
                                        k: "Cancellation",
                                        v: (
                                            <>
                                                Stops future renewals. Typically you keep access until the end of the current billing period (unless a legal
                                                requirement or enforcement action applies).
                                            </>
                                        ),
                                    },
                                    {
                                        k: "Refund",
                                        v: (
                                            <>
                                                Returns funds for eligible charges based on this policy, applicable law, and payment processor rules
                                                (Stripe/Flutterwave).
                                            </>
                                        ),
                                    },
                                    {
                                        k: "Chargeback",
                                        v: (
                                            <>
                                                A dispute filed with your bank/payment provider. Chargebacks may trigger temporary restrictions while we
                                                investigate.
                                            </>
                                        ),
                                    },
                                ]}
                            />
                        </PolicyCard>

                        <PolicyCard id="how-to-cancel" title="How to cancel" rightSlot={<Badge>Anytime</Badge>}>
                            <p>You can cancel to stop future renewals:</p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>
                                    Via your {BRAND} account billing under settings or
                                </li>
                                <li>
                                    Via the payment provider portal (Stripe/Flutterwave checkout management) where applicable.
                                </li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Important timing" tone="info">
                                    Cancel before your next billing date to avoid renewal charges. If you cancel after renewal, you may still be
                                    charged for the new period unless a refund is approved.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="refund-basics" title="Refund basics (global)" rightSlot={<Badge>Standard</Badge>}>
                            <p>
                                Unless required by law, subscription fees are generally non-refundable once a billing period begins. However, we may
                                provide refunds in specific circumstances described below, including billing errors and certain product failures.
                            </p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="What we consider" tone="neutral">
                                    Timing of request, usage of premium features, account status, evidence of error, and whether the issue can be fixed
                                    (support intervention).
                                </Callout>
                                <Callout title="Mandatory consumer rights" tone="info">
                                    Some jurisdictions provide non-waivable rights (e.g., certain digital services withdrawal rules). Where applicable,
                                    we comply.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="eligible" title="Refund-eligible scenarios" rightSlot={<Badge>Possible</Badge>}>
                            <p>Refunds may be approved in the following situations (subject to verification):</p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Duplicate charge:</strong> you were charged twice for the same subscription period.</li>
                                <li><strong>Billing error:</strong> incorrect amount charged due to a confirmed system error.</li>
                                <li><strong>Unauthorized charge:</strong> evidence indicates your account/payment method was used without permission.</li>
                                <li><strong>Service failure:</strong> a verified outage or technical failure prevented access to paid features for a substantial time.</li>
                                <li><strong>Accidental purchase:</strong> limited cases where local law requires or where we approve as a courtesy (timing-sensitive).</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Verification requirement" tone="warning">
                                    We may require transaction IDs, account email, timestamps, and supporting documentation to prevent fraud and protect
                                    legitimate users.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="not-eligible" title="Non-refundable scenarios" rightSlot={<Badge>Important</Badge>}>
                            <p>Refunds are generally not provided for:</p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Change of mind</strong> after significant use of the subscription period.</li>
                                <li><strong>Failure to cancel</strong> before a renewal date.</li>
                                <li><strong>Bank fees</strong> (FX conversion, overdraft, international transaction fees) charged by your bank/provider.</li>
                                <li><strong>Policy enforcement:</strong> account suspension/termination due to violations (see below).</li>
                                <li><strong>Misunderstanding features</strong> that were accurately described at checkout.</li>
                            </ul>

                            <div className="mt-4">
                                <Callout title="Policy violations and refunds" tone="danger">
                                    If your account is suspended or terminated for violations of{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                        Acceptable Use
                                    </Link>{" "}
                                    or{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                        Safety Policy
                                    </Link>
                                    , you may lose access to paid features and may be ineligible for refunds except where required by law.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="timing" title="Timing & processing windows" rightSlot={<Badge>Transparent</Badge>}>
                            <p>
                                Refund requests should be made promptly. Delays can reduce eligibility and make verification difficult.
                            </p>
                            <TableLike
                                rows={[
                                    {
                                        k: "Recommended request window",
                                        v: "As soon as you notice the issue (ideally within 7–14 days of the charge).",
                                    },
                                    {
                                        k: "Typical review time",
                                        v: "We aim to review requests within a reasonable period, depending on complexity and evidence required.",
                                    },
                                    {
                                        k: "Refund processing time",
                                        v: (
                                            <>
                                                Once approved, processing time depends on Stripe/Flutterwave and your bank. Some refunds post quickly; others
                                                may take several business days.
                                            </>
                                        ),
                                    },
                                ]}
                            />
                            <div className="mt-4">
                                <Callout title="Important note" tone="info">
                                    We cannot speed up bank posting times. After approval, the final posting schedule is controlled by payment networks
                                    and your bank/provider.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="processors" title="Stripe & Flutterwave handling" rightSlot={<Badge>Processors</Badge>}>
                            <p>
                                {BRAND} uses <strong>Stripe</strong> and <strong>Flutterwave</strong> to process payments. Refunds, reversals, and
                                dispute workflows follow payment processor and card network rules.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Refund method:</strong> refunds generally return to the original payment method.</li>
                                <li><strong>Processor limits:</strong> some methods (e.g., certain local transfer rails) may not support standard refunds.</li>
                                <li><strong>Verification:</strong> processors may require additional checks to prevent fraud.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Why this matters" tone="neutral">
                                    Stripe/Flutterwave may show a “pending” state during processing. This is normal and does not mean your request was denied.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="partial" title="Proration & partial refunds" rightSlot={<Badge>Case-by-case</Badge>}>
                            <p>
                                Unless required by law, we typically do not prorate partial billing periods. However, we may provide partial refunds
                                or service credits in limited cases such as verified extended service outages.
                            </p>
                            <div className="mt-4">
                                <Callout title="Service credits" tone="info">
                                    In some situations, we may offer a credit (extra time or feature access) instead of a monetary refund.
                                    Credits are not cash and may have an expiration date.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="chargebacks" title="Chargebacks & disputes" rightSlot={<Badge>Strict</Badge>}>
                            <p>
                                A chargeback is filed through your bank/payment provider. Chargebacks can trigger temporary restrictions while we
                                investigate and respond to the processor (Stripe/Flutterwave).
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Contact us first:</strong> email {SUPPORT_EMAIL} to resolve billing issues quickly.</li>
                                <li><strong>Evidence:</strong> we may submit logs (account activity, IP/device signals, subscription status, receipts).</li>
                                <li><strong>Outcomes:</strong> if a chargeback is decided against us, we may restrict the account to prevent further loss.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Chargeback abuse" tone="danger">
                                    Repeated, fraudulent, or abusive chargebacks may result in account suspension or permanent termination to protect the platform.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="abuse" title="Refund abuse & policy violations" rightSlot={<Badge>Protecting users</Badge>}>
                            <p>
                                We maintain refund integrity to protect legitimate customers. We may deny requests where we detect:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>False claims or forged documentation</li>
                                <li>Repeated “accidental purchase” patterns</li>
                                <li>Use of the service followed by immediate refund attempts without valid grounds</li>
                                <li>Policy evasion (multiple accounts, identity misrepresentation)</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Account enforcement" tone="warning">
                                    Fraud or abuse may lead to restrictions under{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                        Acceptable Use
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="regional" title="Regional consumer rights" rightSlot={<Badge>Worldwide</Badge>}>
                            <p>
                                Some regions grant additional consumer protections for digital services. Where those rights apply, we comply. Examples:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>EU/UK:</strong> certain withdrawal/cooling-off rules may apply unless the user expressly begins digital delivery.</li>
                                <li><strong>US:</strong> state consumer protection and auto-renewal transparency rules may apply.</li>
                                <li><strong>Other regions:</strong> local consumer and e-commerce laws may provide mandatory refund rights in specific scenarios.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="How we apply this" tone="info">
                                    If mandatory law requires a refund despite general non-refundable rules, we will honor the law.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="data" title="Account deletion & data impact" rightSlot={<Badge>Important</Badge>}>
                            <p>
                                Deleting your account may remove access immediately and can affect billing support and verification. If you need a
                                billing investigation, contact support before deletion where possible.
                            </p>
                            <div className="mt-4">
                                <Callout title="Privacy cross-reference" tone="neutral">
                                    Data retention and deletion are covered in the{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                        Privacy Policy
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Refund help</Badge>}>
                            <p>
                                For cancellations, refund requests, or billing disputes, contact:
                            </p>
                            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                                <p className="mt-1">
                                    <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                                        {SUPPORT_EMAIL}
                                    </a>
                                </p>
                                <p className="mt-2 text-neutral-600">
                                    Use subject: “Refund Request” and include your account email, transaction ID (Stripe/Flutterwave), date, and explanation.
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
                                    <Disclosure title="If I cancel, do I lose access immediately?">
                                        Usually no. You typically keep access until the end of your paid period, unless your account is suspended/terminated
                                        for policy violations or local law requires different handling.
                                    </Disclosure>

                                    <Disclosure title="How long do refunds take after approval?">
                                        After approval, refunds are initiated through Stripe/Flutterwave and then posted by your bank/provider. Timing varies
                                        by method and region and may take several business days.
                                    </Disclosure>

                                    <Disclosure title="Can you refund to a different card or bank account?">
                                        Generally no. Refunds usually return to the original payment method due to payment network rules. If that method is
                                        closed, your bank may route funds differently.
                                    </Disclosure>

                                    <Disclosure title="What if I was charged but I did not authorize it?">
                                        Contact us immediately with details so we can investigate. Also contact your bank if you suspect payment method
                                        compromise. We may request verification to protect you and prevent fraud.
                                    </Disclosure>

                                    <Disclosure title="What happens if I file a chargeback?">
                                        Your account may be temporarily restricted while we investigate and respond to the processor. Repeated abusive
                                        chargebacks may lead to termination.
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
