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

export default function TermsOfService() {
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
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of
                        <strong> 6chatting</strong>, including our website, mobile application,
                        and related services (“Service”). By creating an account or using the
                        Service, you agree to be bound by these Terms.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        1. Eligibility
                    </h2>
                    <p>
                        You must be at least 18 years old, or the age of majority in your
                        jurisdiction, to use 6chatting. By using the Service, you represent
                        that you meet this requirement.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        2. Account Registration
                    </h2>
                    <p>
                        Users must create an account using a valid email address. You are
                        responsible for maintaining the confidentiality of your login
                        credentials and for all activities that occur under your account.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        3. Free Trial and Subscriptions
                    </h2>
                    <p>
                        6chatting may offer a limited free trial to first-time users. After the
                        free trial period expires, continued access to subscription features
                        requires payment of applicable fees.
                    </p>
                    <p>
                        Subscription terms, billing cycles, and payment details are described
                        in our Subscription & Billing Policy.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        4. Acceptable Use
                    </h2>
                    <p>
                        You agree to use the Service only for lawful purposes and in compliance
                        with our Acceptable Use Policy. Misuse of the platform, including
                        fraudulent, abusive, or harmful activity, is strictly prohibited.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        5. Service Availability
                    </h2>
                    <p>
                        We strive to maintain continuous service availability but do not
                        guarantee uninterrupted access. The Service may be temporarily
                        unavailable due to maintenance, updates, or technical issues.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        6. Intellectual Property
                    </h2>
                    <p>
                        All content, trademarks, logos, and software associated with
                        6chatting are owned by or licensed to us. You may not copy, modify,
                        distribute, or exploit any part of the Service without prior written
                        permission.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        7. Termination
                    </h2>
                    <p>
                        We reserve the right to suspend or terminate your account if you
                        violate these Terms, applicable laws, or our policies.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        8. Limitation of Liability
                    </h2>
                    <p>
                        To the maximum extent permitted by law, 6chatting shall not be liable
                        for any indirect, incidental, special, or consequential damages
                        arising from your use of the Service.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        9. Changes to These Terms
                    </h2>
                    <p>
                        We may update these Terms from time to time. Continued use of the
                        Service after changes are posted constitutes acceptance of the
                        revised Terms.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        10. Contact
                    </h2>
                    <p>
                        For questions regarding these Terms, please contact us at:
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
