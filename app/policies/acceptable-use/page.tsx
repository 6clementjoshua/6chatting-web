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

export default function AcceptableUsePolicy() {
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
                        Acceptable Use Policy
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        This Acceptable Use Policy outlines the rules and standards for using
                        <strong> 6chatting</strong> (“we”, “our”, “us”). By accessing or using
                        the Service, you agree to comply with this policy.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        1. Lawful Use
                    </h2>
                    <p>
                        You may use 6chatting only for lawful purposes and in compliance with
                        all applicable laws and regulations.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        2. Prohibited Activities
                    </h2>
                    <p>
                        The following activities are strictly prohibited:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>Fraud, scams, or deceptive practices</li>
                        <li>Impersonation of individuals or organizations</li>
                        <li>Money laundering or financial exploitation</li>
                        <li>Harassment, abuse, or threats</li>
                        <li>Distribution of illegal, harmful, or misleading content</li>
                        <li>Attempts to bypass security or access controls</li>
                        <li>Use of the platform to facilitate illegal transactions</li>
                    </ul>

                    <h2 className="text-lg font-semibold text-black">
                        3. Platform Integrity
                    </h2>
                    <p>
                        Users must not interfere with the operation of the platform or
                        attempt to disrupt service availability, performance, or security.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        4. Enforcement
                    </h2>
                    <p>
                        We reserve the right to investigate violations of this policy and to
                        take appropriate action, including account suspension or termination,
                        without prior notice.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        5. Reporting Violations
                    </h2>
                    <p>
                        Users are encouraged to report suspected misuse or violations of
                        this policy by contacting our support team.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        6. Changes to This Policy
                    </h2>
                    <p>
                        We may update this Acceptable Use Policy from time to time. Updates
                        will be posted on this page with a revised “Last updated” date.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        7. Contact
                    </h2>
                    <p>
                        For questions or reports related to acceptable use, contact us at:
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
