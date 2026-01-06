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

export default function SubscriptionBillingPolicy() {
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
                        Subscription & Billing Policy
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        This Subscription & Billing Policy explains how payments, subscriptions,
                        and billing work on <strong>6chatting</strong> (“we”, “our”, “us”).
                        By subscribing to any paid plan, you agree to this policy in addition
                        to our Terms of Service and Privacy Policy.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        1. Free Trial
                    </h2>
                    <p>
                        New users may be eligible for a <strong>one-time free trial</strong>.
                        The free trial lasts for <strong>six (6) hours</strong> from the time
                        an account is created.
                    </p>
                    <p>
                        The free trial is available only to first-time users. No payment
                        method is charged during the free trial period.
                    </p>
                    <p>
                        Once the free trial expires, access to premium features is restricted
                        until a subscription is purchased.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        2. Subscription Plans
                    </h2>
                    <p>
                        6chatting offers recurring subscription plans, which may include:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Weekly subscriptions</li>
                        <li>Monthly subscriptions</li>
                        <li>Yearly subscriptions</li>
                    </ul>
                    <p>
                        Pricing, features, and availability of each plan are displayed clearly
                        at the time of purchase.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        3. Recurring Billing
                    </h2>
                    <p>
                        All paid subscriptions are billed on a recurring basis. Once you
                        subscribe, your selected payment method will be charged automatically
                        at the beginning of each billing cycle unless you cancel before renewal.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        4. Payment Processing
                    </h2>
                    <p>
                        Payments are processed securely by third-party payment providers,
                        including <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                    </p>
                    <p>
                        6chatting does not store full payment card details. Payment information
                        is handled in accordance with the security and compliance standards
                        of our payment partners.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        5. Cancellation
                    </h2>
                    <p>
                        You may cancel your subscription at any time through your account
                        settings. Cancellation prevents future billing but does not affect
                        charges already processed for the current billing period.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        6. Failed Payments
                    </h2>
                    <p>
                        If a payment fails, access to subscription features may be suspended
                        until payment is successfully completed. We may attempt to retry
                        failed charges in accordance with our payment providers’ policies.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        7. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Subscription & Billing Policy from time to time.
                        Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        8. Contact
                    </h2>
                    <p>
                        If you have any questions about subscriptions or billing, please
                        contact us at:
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
