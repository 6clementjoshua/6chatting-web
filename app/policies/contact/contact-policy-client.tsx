"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

const BRAND = "6chatting";
const SUPPORT_EMAIL = "support@6chatting.com";

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

function Card({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-3xl border border-neutral-200 bg-white/70 shadow-sm backdrop-blur">
            <div className="border-b border-neutral-200 px-5 py-4">
                <h2
                    className="text-[15px] font-semibold tracking-[-0.01em] text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {title}
                </h2>
            </div>
            <div className="px-5 py-4 text-[14.5px] leading-[1.85] text-neutral-800">
                {children}
            </div>
        </div>
    );
}

export default function ContactPolicyClient() {
    const prefersReducedMotion = useReducedMotion();
    const lastUpdated = useMemo(() => isoDate(new Date()), []);

    const anim = prefersReducedMotion
        ? {}
        : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

    return (
        <main
            className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-neutral-900 antialiased")}
            style={{
                fontFamily:
                    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            {/* Ambient background */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-neutral-100 blur-3xl" />
                <div className="absolute top-52 right-[-120px] h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
            </div>

            <motion.div {...anim} className="relative mx-auto max-w-5xl px-5 py-12 sm:py-16">
                {/* Header */}
                <header className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-[12px] font-semibold text-neutral-700 shadow-sm backdrop-blur">
                        <span>{BRAND}</span>
                        <span className="text-neutral-400">•</span>
                        <span>Policy Center</span>
                    </div>

                    <h1
                        className="mt-4 text-3xl font-bold tracking-[-0.03em] text-black sm:text-4xl"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Contact & Support Policy
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
                        This page explains how to contact {BRAND}, what each support channel is for,
                        and how we handle requests from users worldwide.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <Badge>Last updated: {lastUpdated}</Badge>
                        <Badge>Global support</Badge>
                        <Badge>Transparency</Badge>
                    </div>
                </header>

                {/* Content */}
                <div className="mt-10 space-y-5">
                    <Card title="Primary support channel">
                        <p>
                            The main way to contact {BRAND} is by email:
                        </p>
                        <p className="mt-2">
                            <strong>Email:</strong>{" "}
                            <a
                                href={`mailto:${SUPPORT_EMAIL}`}
                                className="font-semibold underline underline-offset-2"
                            >
                                {SUPPORT_EMAIL}
                            </a>
                        </p>
                        <p className="mt-3">
                            This channel is used for general support, account questions,
                            feature issues, and policy-related inquiries.
                        </p>
                    </Card>

                    <Card title="Safety, abuse, and policy reports">
                        <p>
                            If you believe a user, message, or translation violates our{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/safety">
                                Safety
                            </Link>{" "}
                            or{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                                Acceptable Use
                            </Link>{" "}
                            policies, contact us immediately.
                        </p>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>Harassment, threats, or hate speech</li>
                            <li>Fraud, impersonation, or scams</li>
                            <li>Child exploitation or grooming (zero tolerance)</li>
                            <li>Misuse of translation features causing harm</li>
                        </ul>
                        <p className="mt-3">
                            Include screenshots, message IDs, timestamps, and relevant context
                            where possible.
                        </p>
                    </Card>

                    <Card title="Billing, refunds, and payments">
                        <p>
                            Billing-related questions (subscriptions, refunds, failed payments,
                            Stripe or Flutterwave transactions) should be clearly labeled.
                        </p>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>Use subject line: <strong>“Billing”</strong> or <strong>“Refund”</strong></li>
                            <li>Include transaction ID and billing date</li>
                            <li>Include the email linked to your account</li>
                        </ul>
                        <p className="mt-3">
                            See also{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/subscription-billing">
                                Subscription & Billing
                            </Link>{" "}
                            and{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/refunds">
                                Refund & Cancellation
                            </Link>
                            .
                        </p>
                    </Card>

                    <Card title="Privacy and data requests">
                        <p>
                            Requests relating to personal data (access, correction, deletion,
                            or privacy questions) are handled in line with our{" "}
                            <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                        <p className="mt-3">
                            To help us verify your request, we may ask for confirmation of account
                            ownership before acting on data-related requests.
                        </p>
                    </Card>

                    <Card title="Legal and law-enforcement requests">
                        <p>
                            Legal notices, court orders, or law-enforcement requests should be
                            sent through the same official contact email with clear identification.
                        </p>
                        <p className="mt-3">
                            We review and respond to valid requests in accordance with applicable
                            laws and our privacy and safety obligations.
                        </p>
                    </Card>

                    <Card title="Response expectations">
                        <p>
                            We aim to review and respond to inquiries within a reasonable time,
                            depending on complexity and urgency.
                        </p>
                        <ul className="mt-3 ml-5 list-disc space-y-2">
                            <li>Safety reports may be prioritized</li>
                            <li>Billing and refund issues may require verification</li>
                            <li>Complex legal or data requests may take longer</li>
                        </ul>
                        <p className="mt-3">
                            Submitting multiple duplicate requests may delay resolution.
                        </p>
                    </Card>

                    <Card title="Respectful communication">
                        <p>
                            We expect all communications with our team to be respectful.
                            Abusive, threatening, or misleading messages may result in limited
                            support or enforcement under our policies.
                        </p>
                    </Card>

                    <footer className="pt-8 text-center text-xs text-neutral-500">
                        © {new Date().getFullYear()} {BRAND}. A 6clement Joshua Service.
                    </footer>
                </div>
            </motion.div>
        </main>
    );
}
