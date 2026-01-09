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

export default function SubscriptionBillingClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const toc: TocItem[] = useMemo(
        () => [
            { id: "overview", label: "Overview", badge: "Read first" },
            { id: "plans", label: "Plans & eligibility" },
            { id: "auto-renew", label: "Auto-renewal & recurring billing", badge: "Important" },
            { id: "pricing", label: "Pricing, currency & taxes" },
            { id: "payment-processing", label: "Payment processing (Stripe/Flutterwave)" },
            { id: "authorization", label: "Authorization & billing permissions" },
            { id: "trials", label: "Trials, promos & discounts" },
            { id: "changes", label: "Price changes & plan changes" },
            { id: "failed", label: "Failed payments & dunning" },
            { id: "cancellation", label: "Cancellation & end of service" },
            { id: "refunds", label: "Refunds & credits (cross-reference)" },
            { id: "chargebacks", label: "Chargebacks & disputes", badge: "Strict" },
            { id: "invoices", label: "Receipts, invoices & records" },
            { id: "fraud", label: "Fraud prevention" },
            { id: "regions", label: "Regional rights & compliance" },
            { id: "termination", label: "Account suspension & termination impact" },
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
            name: "Subscription & Billing Policy",
            url: "https://6chatting.com/policies/subscription-billing",
            isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
            about: { "@type": "Thing", name: "Subscriptions and Billing" },
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

            {/* Ambient background */}
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
                        Subscription & Billing Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        This policy explains how paid plans work on {BRAND}, including auto-renewal, billing, taxes, failed payments,
                        disputes, and global compliance. It cross-references our{" "}
                        <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                            Refund & Cancellation
                        </Link>{" "}
                        policy.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Auto-renewal</Badge>
                        <Badge>Global users</Badge>
                        <Badge>Disputes & chargebacks</Badge>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Callout title="Key billing rule" tone="info">
                            Most paid plans are <strong>recurring subscriptions</strong> that renew automatically until canceled. You can cancel
                            anytime before the next billing date to avoid renewal charges.
                        </Callout>
                        <Callout title="Payments handled by trusted providers" tone="neutral">
                            Payments are processed through third-party payment processors (including <strong>Stripe</strong> and{" "}
                            <strong>Flutterwave</strong>). We do not store full card details.
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
                            href="/policies/privacy"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/policies/acceptable-use"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Acceptable Use
                        </Link>
                        <Link
                            href="/policies/refunds"
                            className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
                        >
                            Refund & Cancellation
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
                                    Billing help
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
                                    Refund eligibility and cancellations are governed by{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                                        Refund & Cancellation
                                    </Link>
                                    . Account enforcement can impact access (see{" "}
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
                        <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Billing basics</Badge>}>
                            <p>
                                Paid features on {BRAND} may be offered as subscriptions (weekly, monthly, yearly) or other recurring plans.
                                By purchasing a subscription, you authorize us and our payment processors to charge your selected payment method
                                according to the plan terms displayed at checkout.
                            </p>
                            <div className="mt-4">
                                <Callout title="Always review checkout" tone="info">
                                    Before confirming, review the plan name, billing interval, price, currency, and renewal terms shown at checkout.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="plans" title="Plans & eligibility" rightSlot={<Badge>Who can subscribe</Badge>}>
                            <ul className="ml-5 list-disc space-y-2">
                                <li>
                                    You must have the legal capacity to enter into a contract in your country (or have parental/guardian permission where applicable).
                                </li>
                                <li>
                                    Some plans may be limited by geography, device compatibility, or legal restrictions.
                                </li>
                                <li>
                                    Business or organizational plans may require additional verification or documentation.
                                </li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Minors" tone="warning">
                                    Minors may not purchase subscriptions without authorization by a parent/guardian or as otherwise permitted by applicable law.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="auto-renew" title="Auto-renewal & recurring billing" rightSlot={<Badge>Important</Badge>}>
                            <p>
                                Unless stated otherwise, subscriptions renew automatically at the end of each billing period. You will be charged the
                                then-current subscription price (plus applicable taxes) unless you cancel before renewal.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Auto-renew on:</strong> renews until canceled.</li>
                                <li><strong>Cancel anytime:</strong> cancellation takes effect at the end of the current paid period unless local law requires otherwise.</li>
                                <li><strong>No partial periods:</strong> unless required by local law or explicitly provided in our refund policy.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="How to avoid a renewal charge" tone="info">
                                    Cancel before the next billing date shown in your account/billing settings (or your payment provider’s portal where applicable).
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="pricing" title="Pricing, currency & taxes" rightSlot={<Badge>Global</Badge>}>
                            <p>
                                Prices may vary by region, currency, plan type, and billing interval. Where currency detection is used, the displayed
                                currency may be based on your approximate location, billing country, or payment method region.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Currency:</strong> You are charged in the currency shown at checkout (unless your bank converts it).</li>
                                <li><strong>FX conversion:</strong> Your bank/payment provider may apply exchange rates and fees outside our control.</li>
                                <li><strong>Taxes:</strong> VAT/GST/sales tax may apply depending on your location and status (consumer/business).</li>
                            </ul>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                <Callout title="Tax handling" tone="neutral">
                                    If taxes apply, they are shown at checkout or included where required. Business customers may need to provide valid tax details.
                                </Callout>
                                <Callout title="Regional price differences" tone="neutral">
                                    Regional pricing may change due to currency shifts, compliance costs, or market conditions. See <a className="font-semibold underline underline-offset-2" href="#changes">Price changes</a>.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="payment-processing" title="Payment processing (Stripe/Flutterwave)" rightSlot={<Badge>Processors</Badge>}>
                            <p>
                                Payments are processed by third-party payment providers such as <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                                These providers handle sensitive payment details and may collect information necessary to process transactions and prevent fraud.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>We do <strong>not</strong> store full card numbers or CVV.</li>
                                <li>We may store payment metadata (transaction IDs, subscription status, renewal date).</li>
                                <li>Payment providers may use fraud detection and verification methods (e.g., 3D Secure) as required.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Privacy cross-reference" tone="info">
                                    See{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                        Privacy Policy
                                    </Link>{" "}
                                    for more details about billing-related data and third-party processing.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="authorization" title="Authorization & billing permissions" rightSlot={<Badge>Consent</Badge>}>
                            <p>
                                By subscribing, you authorize recurring charges until you cancel. You also authorize us to:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Charge the payment method you provide (and updated methods your bank/provider supplies).</li>
                                <li>Use pre-authorization/verification holds where required for validation.</li>
                                <li>Charge applicable taxes, fees, and adjustments disclosed at checkout or required by law.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Billing descriptor" tone="neutral">
                                    Charges may appear on your statement with a descriptor referencing {BRAND} or our payment processing partners.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="trials" title="Trials, promos & discounts" rightSlot={<Badge>Optional</Badge>}>
                            <p>
                                From time to time, we may offer trials, promotional pricing, credits, or discounts. Unless stated otherwise:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Trials convert to paid subscriptions at the end of the trial period.</li>
                                <li>Promotional rates may be time-limited and then renew at the standard rate.</li>
                                <li>One-time credits/discounts are non-transferable and may expire.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Trial reminder" tone="info">
                                    If you do not want to be charged, cancel before the trial ends. Trial terms shown at signup control.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="changes" title="Price changes & plan changes" rightSlot={<Badge>Notice where possible</Badge>}>
                            <p>
                                We may change prices, plan features, or availability to reflect product improvements, compliance requirements, and market conditions.
                                When feasible, we provide notice before changes take effect.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Price changes:</strong> typically apply at the next renewal date.</li>
                                <li><strong>Plan changes:</strong> upgrades may take effect immediately; downgrades may apply at period end (unless stated otherwise).</li>
                                <li><strong>Feature changes:</strong> features may be added, modified, or removed per the Terms.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="If you disagree with a change" tone="warning">
                                    You can cancel before renewal to avoid future charges under updated pricing.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="failed" title="Failed payments & dunning" rightSlot={<Badge>Access may be limited</Badge>}>
                            <p>
                                If a payment fails or is reversed, we may retry the charge. During a failed-payment period, your access to paid features
                                may be restricted or suspended until payment is resolved.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>We may attempt multiple re-bills over a short period (as permitted).</li>
                                <li>You may need to update your payment method.</li>
                                <li>Extended non-payment may result in cancellation of the subscription.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Avoid service interruption" tone="info">
                                    Ensure your payment method is valid and has sufficient funds. Update your billing information promptly if it changes.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="cancellation" title="Cancellation & end of service" rightSlot={<Badge>Simple</Badge>}>
                            <p>
                                You can cancel your subscription at any time through your account/billing settings (or through your payment provider’s
                                portal where applicable). Cancellation generally stops future renewals.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>You typically retain access to paid features until the end of the current billing period.</li>
                                <li>After cancellation, you may lose access to premium features at period end.</li>
                                <li>Deleting your account may also cancel your subscription (depending on platform flow); confirm in your billing settings.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Refunds are separate" tone="neutral">
                                    Cancellation does not automatically guarantee a refund. Refund eligibility is defined in{" "}
                                    <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                                        Refund & Cancellation
                                    </Link>
                                    .
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="refunds" title="Refunds & credits (cross-reference)" rightSlot={<Badge>See refunds page</Badge>}>
                            <p>
                                Refund rules vary by product, billing interval, and region. Your eligibility is governed by our{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                                    Refund & Cancellation
                                </Link>{" "}
                                policy and any mandatory consumer laws that apply in your location.
                            </p>
                            <div className="mt-4">
                                <Callout title="Consumer law note" tone="info">
                                    Some regions provide non-waivable consumer rights (e.g., withdrawal/cooling-off for certain digital services).
                                    Where required, we comply with applicable law.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="chargebacks" title="Chargebacks & disputes" rightSlot={<Badge>Strict</Badge>}>
                            <p>
                                If you dispute a charge with your bank/payment provider (a “chargeback”), we may temporarily restrict your account
                                while we investigate. Chargebacks increase operational risk and costs.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>Contact us first:</strong> email {SUPPORT_EMAIL} to resolve billing issues quickly.</li>
                                <li><strong>Evidence:</strong> we may provide transaction logs and account details to the payment provider.</li>
                                <li><strong>Abuse:</strong> repeated or fraudulent chargebacks may lead to account suspension or termination.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Best practice" tone="warning">
                                    If you do not recognize a charge, first check whether you have multiple accounts, family/business members with access,
                                    or a renewal that occurred. Then contact support.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="invoices" title="Receipts, invoices & records" rightSlot={<Badge>Documentation</Badge>}>
                            <p>
                                We may provide receipts or billing confirmations by email or within your account. For certain plans (especially business plans),
                                invoices may be available. Keep your receipts for tax and accounting purposes.
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li>Receipts may include plan name, amount, currency, taxes, and date.</li>
                                <li>Some invoice fields may require accurate business details supplied by you.</li>
                                <li>We may retain billing records for legal and accounting compliance.</li>
                            </ul>
                        </PolicyCard>

                        <PolicyCard id="fraud" title="Fraud prevention" rightSlot={<Badge>Security</Badge>}>
                            <p>
                                To protect users and the platform, we may use fraud detection measures and may request additional verification
                                when suspicious activity is detected (e.g., unusual location changes, repeated failed payments, high-risk signals).
                            </p>
                            <div className="mt-4">
                                <Callout title="If your account is compromised" tone="danger">
                                    Contact <strong>{SUPPORT_EMAIL}</strong> immediately. Do not share OTPs or passwords. We may pause billing activity
                                    while we secure your account.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="regions" title="Regional rights & compliance" rightSlot={<Badge>Worldwide</Badge>}>
                            <p>
                                Billing practices are subject to local laws and payment network rules. Where mandatory rules apply, they override
                                conflicting policy language. Examples include:
                            </p>
                            <ul className="mt-3 ml-5 list-disc space-y-2">
                                <li><strong>EU/UK:</strong> digital services rules, consumer rights, VAT requirements, and transparency obligations.</li>
                                <li><strong>US:</strong> state auto-renewal and cancellation transparency requirements; consumer protection laws.</li>
                                <li><strong>Other regions:</strong> local tax regimes, currency controls, and consumer protection frameworks.</li>
                            </ul>
                            <div className="mt-4">
                                <Callout title="Transparency commitment" tone="info">
                                    We aim to provide clear pricing, renewal terms, and cancellation options consistent with leading global standards.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="termination" title="Account suspension & termination impact" rightSlot={<Badge>Policy enforcement</Badge>}>
                            <p>
                                If your account is suspended or terminated due to violations of our policies (e.g.,{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                    Acceptable Use
                                </Link>{" "}
                                or{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                    Safety Policy
                                </Link>
                                ), your access to paid features may be restricted. Refund eligibility, if any, is governed by the{" "}
                                <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                                    Refund & Cancellation
                                </Link>{" "}
                                policy and applicable law.
                            </p>
                            <div className="mt-4">
                                <Callout title="No circumvention" tone="warning">
                                    Attempting to evade enforcement (e.g., creating new accounts to bypass a ban) may result in additional restrictions.
                                </Callout>
                            </div>
                        </PolicyCard>

                        <PolicyCard id="updates" title="Policy updates" rightSlot={<Badge>Versioned</Badge>}>
                            <p>
                                We may update this Subscription & Billing Policy to reflect changes in our plans, pricing, payment systems, or legal
                                requirements. We will post updates here and revise the “Last updated” date.
                            </p>
                        </PolicyCard>

                        <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Billing help</Badge>}>
                            <p>
                                For billing questions, cancellations assistance, or dispute resolution, contact:
                            </p>
                            <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                                <p className="mt-1">
                                    <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                                        {SUPPORT_EMAIL}
                                    </a>
                                </p>
                                <p className="mt-2 text-neutral-600">
                                    Use “Billing” in the subject and include your account email, transaction ID (if available), and the date of charge.
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
                                    <Disclosure title="Are subscriptions automatically renewed?">
                                        Yes, unless stated otherwise. Most plans renew automatically until you cancel prior to your next billing date.
                                    </Disclosure>

                                    <Disclosure title="Do you store my card details?">
                                        No. Card details are processed by payment providers (e.g., Stripe/Flutterwave). We may store limited billing metadata.
                                    </Disclosure>

                                    <Disclosure title="Why is the charge amount different from the displayed price?">
                                        Taxes may apply, or your bank may apply currency conversion and fees. Review the checkout total and your statement details.
                                    </Disclosure>

                                    <Disclosure title="What should I do if I don’t recognize a charge?">
                                        First check for renewals, multiple accounts, or family/business access. Then email {SUPPORT_EMAIL} with your details.
                                        If you believe fraud occurred, contact your bank as well.
                                    </Disclosure>

                                    <Disclosure title="If my account is suspended, do I still get billed?">
                                        We may restrict access to features during suspension. Billing outcomes depend on the suspension type and our refund policy.
                                        Contact support if this occurs.
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
