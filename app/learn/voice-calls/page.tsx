// app/learn/voice-calls/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Voice & Calling Translation | 6chatting",
    description:
        "Learn how 6chatting voice and calling translation works, what users control, what to expect in real time, and why it’s built for premium global communication.",
};

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
    children,
    href,
    className = "",
    ariaLabel,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    ariaLabel?: string;
}) => (
    <Link
        className={cx(
            "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none",
            className
        )}
        href={href}
        aria-label={ariaLabel}
    >
        {children}
    </Link>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-3 py-2 text-xs font-semibold text-black/90">
        {children}
    </span>
);

const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="flex flex-col gap-2">
        <h2
            className="text-[clamp(18px,2.4vw,26px)] font-extrabold tracking-[-0.04em] text-black"
            style={{ fontFamily: "var(--font-display)" }}
        >
            {title}
        </h2>
        {desc ? <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">{desc}</p> : null}
    </div>
);

function InfoCard({ title, body, bullets }: { title: string; body: string; bullets?: string[] }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                {title}
            </div>
            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">{body}</p>
            {bullets?.length ? (
                <ul className="mt-3 list-disc pl-5 text-[13.8px] leading-[1.8] text-neutral-700">
                    {bullets.map((b) => (
                        <li key={b}>{b}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

export default function VoiceCallsLearnPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            {/* HERO */}
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Voice & calling translation</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Speak normally. They understand instantly.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        Voice and calling translation in 6chatting is designed for real conversations — meetings, customer calls, travel,
                        and international collaboration. The experience is built to feel smooth and premium: clear language direction,
                        obvious translation status, and controls that do not interrupt the call.
                    </p>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Button href="/" ariaLabel="Back to Home">
                            Back to Home
                        </Button>
                        <Button href="/learn/text-bubbles" ariaLabel="Learn about text bubbles" className="water-btn-primary">
                            Next: Text bubbles UX
                        </Button>
                    </div>
                </BevelCard>

                <BevelCard className="p-5 sm:p-7">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[260px] sm:h-[320px]">
                        <Image
                            src="/images/voice-translation-devices.png"
                            alt="Voice translation on mobile and laptop devices"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        Designed to work across devices: mobile, tablet, and desktop — with the same translation clarity and controls.
                    </p>
                </BevelCard>
            </section>

            {/* WHAT IT IS */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What voice & calling translation is"
                        desc="A premium voice translation experience must be predictable: users need to understand what the app is doing at every moment."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard
                            title="Real-time interpretation"
                            body="The system converts speech to text, translates meaning, then delivers the output to the other user in their language — optimized for conversation flow."
                        />
                        <InfoCard
                            title="Clear translation mode"
                            body="Users should always know when translation is active, which languages are set, and what direction translation is moving."
                        />
                        <InfoCard
                            title="Built for trust"
                            body="Voice is more sensitive than text. 6chatting pairs translation with verification signals and clear UI to reduce confusion and impersonation risk."
                        />
                    </div>
                </BevelCard>
            </section>

            {/* END-TO-END FLOW */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="How it works end-to-end"
                        desc="This is the user flow you can confidently explain on a premium product page."
                    />

                    <ol className="mt-5 grid gap-3">
                        {[
                            {
                                t: "1) Select languages",
                                d: "Each participant uses their preferred language. The app sets a translation direction for both sides so the conversation stays consistent.",
                            },
                            {
                                t: "2) Start voice or call translation",
                                d: "Users begin speaking naturally. The translation mode remains visible so nobody is confused about what is happening.",
                            },
                            {
                                t: "3) Real-time delivery",
                                d: "The receiver gets the translated output in their language with minimal delay, designed to preserve meaning and tone.",
                            },
                            {
                                t: "4) Status indicators",
                                d: "The UI communicates when translation is active, when it is processing, and when delivery is complete — this reduces interruptions and misunderstandings.",
                            },
                            {
                                t: "5) Consistent experience across devices",
                                d: "The same call translation flow applies whether users are on mobile, tablet, or desktop — so switching devices doesn’t change the rules.",
                            },
                        ].map((x) => (
                            <li key={x.t} className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    {x.t}
                                </div>
                                <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">{x.d}</p>
                            </li>
                        ))}
                    </ol>
                </BevelCard>
            </section>

            {/* USER CONTROLS */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What users can control"
                        desc="Premium means control without complexity. These are the controls users should expect."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Language preferences"
                            body="Users can set their preferred language and switch when needed. This supports mixed-language environments and international conversations."
                            bullets={[
                                "Default language set in settings",
                                "Per-chat adjustments where appropriate",
                                "Clear direction indicators (A → B and B → A)",
                            ]}
                        />
                        <InfoCard
                            title="Translation activation"
                            body="Users should be able to confidently tell whether translation is on or off before speaking, especially on calls."
                            bullets={[
                                "Visible translation mode toggle",
                                "Clear “Translation Active” status",
                                "Designed to avoid accidental activation",
                            ]}
                        />
                        <InfoCard
                            title="Conversation pacing"
                            body="The experience is designed so users don’t feel forced to speak unnaturally slowly. The interface helps keep the flow smooth."
                            bullets={[
                                "Minimal friction UX",
                                "Processing indicators reduce confusion",
                                "Clarity-first design for sensitive topics",
                            ]}
                        />
                        <InfoCard
                            title="Safety & trust signals"
                            body="Voice carries risk: scams and impersonation. 6chatting is built to pair translation with trust indicators (verification ticks) and user clarity."
                            bullets={[
                                "Verification signals help users trust who is speaking",
                                "Reduced impersonation risk",
                                "Better confidence for business calls",
                            ]}
                        />
                    </div>
                </BevelCard>
            </section>

            {/* USE CASES */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Best use cases"
                        desc="Voice and calling translation is designed for practical daily scenarios — not just demos."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard
                            title="Business & sales"
                            body="Speak with customers and partners across borders, handle negotiation details, and reduce misunderstandings."
                        />
                        <InfoCard
                            title="Travel & hospitality"
                            body="Use voice translation in real time when typing is too slow — directions, services, support, and emergencies."
                        />
                        <InfoCard
                            title="Teams & communities"
                            body="Keep remote teams aligned and inclusive even when people speak different languages."
                        />
                    </div>
                </BevelCard>
            </section>

            {/* CTA */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Next: how the text bubbles show translation clearly
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Dual-language bubbles reduce confusion by showing what was translated, in which direction, and the translation status.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button href="/" ariaLabel="Back to Home">
                                Back to Home
                            </Button>
                            <Button href="/learn/text-bubbles" ariaLabel="Learn about text bubbles UX" className="water-btn-primary">
                                Learn about text bubbles
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
