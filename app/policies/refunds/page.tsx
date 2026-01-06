"use client";

import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-display",
});

export default function RefundCancellationPolicy() {
    return (
        <main
            className={[
                inter.variable,
                spaceGrotesk.variable,
                "min-h-screen bg-white text-neutral-800 antialiased",
            ].join(" ")}
            style={{
                fontFamily:
                    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <div className="mx-auto max-w-3xl px-6 py-16">
                <header className="mb-10 text-center">
                    <h1
                        className="text-2xl font-bold tracking-[-0.02em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Refund & Cancellation Policy
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        This Refund & Cancellation Policy explains how cancellations and refunds
                        are handled on <strong>6chatting</strong> (“we”, “our”, “us”). By
                        purchasing a subscription, you agree to this policy in addition to our
                        Terms of Service and Subscription & Billing Policy.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        1. Subscription Payments
                    </h2>
                    <p>
                        All payments made for 6chatting subscriptions are billed in advance on
                        a recurring basis (weekly, monthly, or yearly), depending on the plan
                        selected at the time of purchase.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        2. Cancellations
                    </h2>
                    <p>
                        Users may cancel their subscription at any time through their account
                        settings. Cancellation prevents future charges but does not affect the
                        current active billing period.
                    </p>
                    <p>
                        Access to subscription features will remain available until the end of
                        the current paid period unless otherwise stated.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        3. Refund Policy
                    </h2>
                    <p>
                        Subscription fees are generally <strong>non-refundable</strong> once a
                        billing cycle has begun.
                    </p>
                    <p>
                        Refunds are not provided for partial use, unused time, or early
                        cancellation of a subscription period.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        4. Exceptions
                    </h2>
                    <p>
                        In limited cases, refunds may be considered at our sole discretion,
                        such as in the event of duplicate charges, billing errors, or technical
                        issues directly attributable to our systems.
                    </p>
                    <p>
                        Any approved refunds will be processed through the original payment
                        method used at the time of purchase.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        5. Payment Providers
                    </h2>
                    <p>
                        Payments and refunds are processed through third-party payment
                        providers, including <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                        Refund processing times may vary depending on the payment provider and
                        financial institution.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        6. Chargebacks & Disputes
                    </h2>
                    <p>
                        Initiating a chargeback or payment dispute without first contacting
                        support may result in account suspension or restriction.
                    </p>
                    <p>
                        We encourage users to contact us directly to resolve billing concerns
                        before initiating a dispute with their bank or payment provider.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        7. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Refund & Cancellation Policy from time to time. Any
                        changes will be posted on this page with a revised “Last updated” date.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        8. Contact
                    </h2>
                    <p>
                        For questions regarding cancellations or refunds, please contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong> support@6chatting.com
                    </p>
                </section>

                <footer className="mt-16 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()} 6chatting. A 6clement Joshua Service.
                </footer>
            </div>
        </main>
    );
}
