// app/learn/text-bubbles/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Dual-Language Text Bubbles | 6chatting",
    description:
        "Learn how 6chatting dual-language text bubbles work: translation direction, status indicators, clarity features, and premium UX designed to reduce misunderstandings.",
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

export default function TextBubblesLearnPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            {/* HERO */}
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Dual-language text bubbles</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Messages that stay clear — even across languages.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        A premium translation chat is not only about converting text — it’s about reducing misunderstandings.
                        6chatting’s dual-language bubbles are designed so users can instantly see what was translated, the translation direction,
                        and the status of the translation without cluttering the conversation.
                    </p>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Button href="/" ariaLabel="Back to Home">
                            Back to Home
                        </Button>
                        <Button href="/learn/languages" ariaLabel="Learn about language support" className="water-btn-primary">
                            Revisit: Language support
                        </Button>
                    </div>
                </BevelCard>

                <BevelCard className="p-5 sm:p-7">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[260px] sm:h-[320px]">
                        <Image
                            src="/images/text-translation-dual.png"
                            alt="Two phones showing translated chat bubbles"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        The goal is simple: users should never feel confused about what language they are reading, or what was translated.
                    </p>
                </BevelCard>
            </section>

            {/* WHY IT MATTERS */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Why bubble design matters in translated chat"
                        desc="Most translation apps fail at UX: users don’t know what changed, what direction it went, or whether the message is final. 6chatting fixes that."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard
                            title="Less confusion"
                            body="Users can immediately recognize what is translated and what is original, reducing misinterpretation and wrong assumptions."
                        />
                        <InfoCard
                            title="More trust"
                            body="Status indicators show when translation is processing vs complete, so users don’t think the app ‘changed’ messages unexpectedly."
                        />
                        <InfoCard
                            title="Better for business"
                            body="Clarity matters in pricing, logistics, and agreements. Bubble UX reduces errors that cost money and reputation."
                        />
                    </div>
                </BevelCard>
            </section>

            {/* WHAT USERS SEE */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What users see in the chat"
                        desc="These are the core elements that make dual-language bubbles feel premium."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Translation direction"
                            body="Users can see which language a message started in and what it was translated into. Direction clarity prevents misreading and helps both sides stay aligned."
                            bullets={[
                                "Clear source → target direction",
                                "Consistent placement in the bubble UI",
                                "Works the same across mobile and desktop",
                            ]}
                        />
                        <InfoCard
                            title="Translation status"
                            body="The UI communicates whether a message is translating or fully translated. This reduces confusion during poor network conditions or high traffic."
                            bullets={[
                                "Translating / translated indicators",
                                "Reliable, predictable feedback",
                                "Designed to avoid ‘ghost edits’ perception",
                            ]}
                        />
                        <InfoCard
                            title="Readable bubble layout"
                            body="Premium chat bubbles must stay clean. The layout avoids clutter, keeps spacing consistent, and improves long-message readability."
                            bullets={[
                                "Balanced spacing for long text",
                                "Typography tuned for speed-reading",
                                "Minimal visual noise",
                            ]}
                        />
                        <InfoCard
                            title="Meaning-first presentation"
                            body="The system prioritizes keeping the intent clear. Users shouldn’t need to ‘decode’ what the translation meant—especially in high-stakes conversations."
                            bullets={[
                                "Clarity over literal word-by-word output",
                                "Better interpretation of tone",
                                "Works well for casual and professional chats",
                            ]}
                        />
                    </div>
                </BevelCard>
            </section>

            {/* PREMIUM EXPERIENCE PRINCIPLES */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Premium UX principles behind the bubbles"
                        desc="This is what separates a premium translation chat experience from a basic translator pasted into a messenger."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard
                            title="Consistency"
                            body="Users get the same bubble logic on every device. No surprises when switching from phone to desktop."
                        />
                        <InfoCard
                            title="Predictability"
                            body="The app never hides what it did. Direction + status always remain visible, so users trust the output."
                        />
                        <InfoCard
                            title="Speed"
                            body="The UI is designed to keep momentum. The user should focus on the conversation, not the translation mechanics."
                        />
                    </div>
                </BevelCard>
            </section>

            {/* USE CASES */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Best use cases for dual-language bubbles"
                        desc="Anywhere misunderstandings are expensive, dual-language clarity becomes a competitive advantage."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard title="Customer support" body="Agents and customers stay aligned on details, refunds, and policies across languages." />
                        <InfoCard title="Cross-border trade" body="Negotiations, delivery instructions, and product specs remain clearer and less error-prone." />
                        <InfoCard title="Community & friendship" body="Users can express themselves naturally while the app handles translation smoothly." />
                    </div>
                </BevelCard>
            </section>

            {/* NEXT LINKS */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Explore the rest of “Learn more”
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Language support, verification ticks, and voice translation work together to create a complete premium experience.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button href="/learn/languages" ariaLabel="Language support">
                                Language support
                            </Button>
                            <Button href="/learn/verification" ariaLabel="Verification ticks">
                                Verification ticks
                            </Button>
                            <Button href="/learn/voice-calls" ariaLabel="Voice and calls" className="water-btn-primary">
                                Voice & calls
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
