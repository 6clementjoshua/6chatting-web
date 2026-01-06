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

export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        This Privacy Policy explains how <strong>6chatting</strong> (“we”, “our”,
                        “us”) collects, uses, stores, and protects personal information when
                        you use our website, mobile application, and services.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        1. Information We Collect
                    </h2>
                    <p>We may collect the following types of information:</p>
                    <ul className="list-disc pl-6">
                        <li>Account information (email address, login credentials)</li>
                        <li>Profile and preference information (language selections)</li>
                        <li>Usage data (features used, session activity)</li>
                        <li>Device and technical information (IP address, browser type)</li>
                        <li>Payment-related metadata (transaction IDs, billing status)</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-black">
                        2. Payment Information
                    </h2>
                    <p>
                        Payments are processed securely by third-party payment providers,
                        including <strong>Stripe</strong> and <strong>Flutterwave</strong>.
                    </p>
                    <p>
                        6chatting does <strong>not</strong> store full payment card details.
                        Payment data is handled directly by our payment partners in accordance
                        with their respective privacy and security standards.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        3. How We Use Information
                    </h2>
                    <p>We use collected information to:</p>
                    <ul className="list-disc pl-6">
                        <li>Provide and maintain our services</li>
                        <li>Process subscriptions and payments</li>
                        <li>Enable real-time translation and communication features</li>
                        <li>Improve product performance and user experience</li>
                        <li>Communicate service updates and important notices</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-black">
                        4. Data Sharing
                    </h2>
                    <p>
                        We may share limited data with trusted third parties strictly for
                        operational purposes, including:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Payment processors (Stripe, Flutterwave)</li>
                        <li>Cloud hosting and infrastructure providers</li>
                        <li>Legal or regulatory authorities when required by law</li>
                    </ul>
                    <p>
                        We do not sell or rent personal information to third parties.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        5. Cookies and Tracking
                    </h2>
                    <p>
                        We may use cookies or similar technologies to improve website
                        functionality, analyze usage, and enhance user experience. You may
                        control cookie preferences through your browser settings.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        6. Data Security
                    </h2>
                    <p>
                        We implement reasonable technical and organizational measures to
                        protect personal data against unauthorized access, loss, or misuse.
                        However, no system can be guaranteed to be 100% secure.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        7. Data Retention
                    </h2>
                    <p>
                        Personal information is retained only for as long as necessary to
                        fulfill the purposes outlined in this policy or to comply with legal
                        obligations.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        8. Your Rights
                    </h2>
                    <p>
                        Depending on your location, you may have rights to access, correct, or
                        delete your personal information. Requests can be made by contacting
                        us directly.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        9. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will
                        be posted on this page with an updated revision date.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        10. Contact
                    </h2>
                    <p>
                        For privacy-related questions or requests, contact us at:
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
