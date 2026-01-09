"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex items-center justify-center rounded-full",
            "border border-black/10 bg-white/95 px-3 py-2",
            "text-xs font-medium text-black/90",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            "max-w-full",
            className
        )}
    >
        <span className="truncate">{children}</span>
    </span>
);

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
    children,
    onClick,
    href,
    variant = "default",
    className = "",
    disabled,
    ariaLabel,
}: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    disabled?: boolean;
    ariaLabel?: string;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    const cls = cx(base, variant === "primary" && primary, className, disabled && "opacity-60 pointer-events-none");

    if (href) return <Link className={cls} href={href} aria-label={ariaLabel}>{children}</Link>;
    return <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel} disabled={disabled}>{children}</button>;
};

type Interest = "investor" | "partner" | "enterprise" | "press" | "other";

export default function PartnersPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [interest, setInterest] = useState<Interest>("partner");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [org, setOrg] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

    async function submit() {
        setError("");
        if (message.trim().length < 20) {
            setError("Please provide a bit more detail (minimum 20 characters).");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch("/api/partners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    interest_type: interest,
                    name: name.trim() || undefined,
                    email: email.trim() || undefined,
                    organization: org.trim() || undefined,
                    country: country.trim() || undefined,
                    message: message.trim(),
                }),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.error || "Submission failed.");

            setDone(true);
        } catch (e: any) {
            setError(e?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div
            className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-black antialiased")}
            style={{
                fontFamily:
                    "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            }}
        >
            <main
                className={cx("mx-auto w-[min(1120px,calc(100%-24px))] pb-12", "pt-16 sm:pt-18 md:pt-20")}
                style={{ paddingTop: "calc(var(--header-h, 64px) + 10px)" }}
            >
                <section>
                    <BevelCard className="p-5 sm:p-7">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap gap-2">
                                <Pill>Partnerships</Pill>
                                <Pill>Enterprise</Pill>
                                <Pill>Investor conversations</Pill>
                            </div>

                            <h1
                                className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Partner & investor inquiries
                            </h1>

                            <p className="max-w-3xl text-[14.5px] sm:text-[15px] leading-[1.75] text-neutral-700">
                                Use this page for business, partnership, enterprise, or investor conversations. This is a structured inquiry channel —
                                it is <span className="font-semibold">not</span> a donation page and <span className="font-semibold">not</span> a public investment offering.
                            </p>

                            <div className="rounded-2xl border border-black/10 bg-white/95 p-4">
                                <div className="text-[13px] font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Important
                                </div>
                                <ul className="mt-2 grid gap-1.5 text-[13.5px] leading-[1.65] text-neutral-700">
                                    <li>• We do not accept investments through this website.</li>
                                    <li>• Submitting this form does not create any obligation on either side.</li>
                                    <li>• If you want to support the build as a contribution, use the <Link className="font-semibold underline" href="/support">Support</Link> page instead.</li>
                                </ul>
                            </div>
                        </div>
                    </BevelCard>
                </section>

                <section className="pt-7 sm:pt-8">
                    <div className="grid gap-4 md:grid-cols-[1.05fr_.95fr] md:items-start">
                        <BevelCard className="p-5 sm:p-7">
                            <h2
                                className="text-[clamp(18px,2.6vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Tell us what you’re interested in
                            </h2>

                            <div className="mt-3 grid gap-2 sm:grid-cols-5">
                                {(["investor", "partner", "enterprise", "press", "other"] as Interest[]).map((t) => {
                                    const active = interest === t;
                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setInterest(t)}
                                            aria-pressed={active}
                                            className={cx(
                                                "rounded-2xl border px-3 py-3 text-sm font-extrabold transition-all",
                                                active ? "border-black/25 bg-black/5" : "border-black/10 bg-white hover:border-black/20"
                                            )}
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            {t === "investor" ? "Investor" : t === "partner" ? "Partner" : t === "enterprise" ? "Enterprise" : t === "press" ? "Press" : "Other"}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Name (optional)</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full name"
                                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                    />
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Email (optional)</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                    />
                                </div>
                            </div>

                            <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Organization (optional)</label>
                                    <input
                                        value={org}
                                        onChange={(e) => setOrg(e.target.value)}
                                        placeholder="Company / fund / team"
                                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                    />
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-white p-3">
                                    <label className="text-xs font-bold text-neutral-700">Country (optional)</label>
                                    <input
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        placeholder="Country"
                                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                    />
                                </div>
                            </div>

                            <div className="mt-2 rounded-2xl border border-black/10 bg-white p-3">
                                <label className="text-xs font-bold text-neutral-700">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Share what you’re looking for, your timeline, and how you want to engage (minimum 20 characters)."
                                    rows={5}
                                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
                                />
                                <div className="mt-1 text-[12px] text-neutral-600">
                                    We respond to serious inquiries. Keep it concise and specific.
                                </div>
                            </div>

                            {error ? (
                                <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-700">
                                    {error}
                                </div>
                            ) : null}

                            {done ? (
                                <div className="mt-4 rounded-2xl border border-black/10 bg-white/95 px-4 py-4">
                                    <div className="text-[13px] font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                        Submitted
                                    </div>
                                    <p className="mt-1 text-[13.5px] leading-[1.65] text-neutral-700">
                                        Thank you. Your inquiry has been received. If you included an email, we will respond there.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <Button
                                        variant="primary"
                                        className="w-full"
                                        onClick={submit}
                                        disabled={submitting}
                                        ariaLabel="Submit inquiry"
                                    >
                                        {submitting ? "Submitting…" : "Submit inquiry"}
                                    </Button>
                                </div>
                            )}
                        </BevelCard>

                        <div className="grid gap-4">
                            <BevelCard className="p-5 sm:p-7">
                                <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    What to include
                                </h3>
                                <ul className="mt-3 grid gap-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    <li>• Your interest type (investor, partner, enterprise, press).</li>
                                    <li>• Geography and target users (regions/languages).</li>
                                    <li>• Desired engagement (intro call, pilot, partnership, etc.).</li>
                                    <li>• Any timeline or constraints.</li>
                                </ul>
                            </BevelCard>

                            <BevelCard className="p-5 sm:p-7">
                                <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Clear separation from Support
                                </h3>
                                <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                                    Support contributions are optional and non-investment. Investor/partner conversations are handled privately and separately.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Button href="/support">Support page</Button>
                                    <Button href="/policies/contact">Contact policy</Button>
                                </div>
                            </BevelCard>
                        </div>
                    </div>
                </section>

                <footer className="pt-10 text-neutral-700">
                    <div className="border-t border-black/10 pt-6">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                            <Link href="/support">Support</Link>
                            <Link href="/partners">Partners</Link>
                            <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms of Service</Link>
                            <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
                            <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">Acceptable Use</Link>
                            <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">Contact</Link>
                        </div>

                        <div className="mt-5 text-center text-xs font-normal text-neutral-600">
                            © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span> All rights reserved.
                        </div>
                    </div>
                </footer>

                <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
            </main>
        </div>
    );
}
