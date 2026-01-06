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

export default function ContactPage() {
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
                        Contact & Business Information
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </header>

                <section className="space-y-6 text-[15px] leading-[1.8]">
                    <p>
                        <strong>6chatting</strong> is a communication and language translation
                        platform operated as a service under <strong>6clement Joshua</strong>.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        Business Information
                    </h2>
                    <p>
                        <strong>Service Name:</strong> 6chatting
                        <br />
                        <strong>Operating Entity:</strong> 6clement Joshua
                        <br />
                        <strong>Service Type:</strong> Subscription-based digital service
                        <br />
                        <strong>Website:</strong>{" "}
                        <a
                            href="https://6chatting.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            https://6chatting.com
                        </a>
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        Contact Information
                    </h2>
                    <p>
                        For general inquiries, billing questions, or support requests, please
                        contact us using the details below:
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:support@6chatting.com"
                            className="underline"
                        >
                            support@6chatting.com
                        </a>
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        Support Availability
                    </h2>
                    <p>
                        We aim to respond to all legitimate inquiries within a reasonable
                        timeframe. Response times may vary depending on inquiry volume and
                        issue complexity.
                    </p>

                    <h2 className="text-lg font-semibold text-black">
                        Legal Notices
                    </h2>
                    <p>
                        Official notices, legal requests, or compliance-related inquiries
                        should be sent to the contact email listed above.
                    </p>
                </section>

                <footer className="mt-16 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()} 6chatting. A 6clement Joshua Service.
                </footer>
            </div>
        </main>
    );
}
