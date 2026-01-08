// app/learn/languages/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Global Language Support | 6chatting",
    description: "Learn how 6chatting supports global languages and delivers real-time translation for chat, voice, and calls.",
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

const SectionTitle = ({ title, desc }: { title: string; desc?: string }) => (
    <div className="flex flex-col gap-2">
        <h2 className="text-[clamp(18px,2.4vw,26px)] font-extrabold tracking-[-0.04em] text-black" style={{ fontFamily: "var(--font-display)" }}>
            {title}
        </h2>
        {desc ? <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">{desc}</p> : null}
    </div>
);

export default function LanguagesLearnPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            {/* Hero */}
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-3 py-2 text-xs font-semibold text-black/90">
                        Global language support
                    </div>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Translate naturally — across regions, cultures, and languages.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        6chatting is designed so you communicate the way you normally do, while the other person receives it in their language.
                        This page explains what “global language support” means in practice: how languages are selected, how translation direction is handled,
                        how the UI communicates translation status, and what users should expect in real-world conversations.
                    </p>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Button href="/" ariaLabel="Back to Home">
                            Back to Home
                        </Button>
                        <Button href="/download" ariaLabel="Get the app" className="water-btn-primary">
                            Get the app
                        </Button>
                    </div>
                </BevelCard>

                <BevelCard className="p-5 sm:p-7">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[260px] sm:h-[320px]">
                        <Image
                            src="/images/global-languages-support.png"
                            alt="Global language support illustration with flags and translation icon"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        The app focuses on clarity: language direction, translation status, and message intent should always remain obvious.
                    </p>
                </BevelCard>
            </section>

            {/* What it means */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What “Global language support” means"
                        desc="A premium translation product is not only about having many languages — it’s about delivering predictability, trust, and a smooth experience."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Language selection
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Users choose their preferred language at sign-up (and can adjust later in settings). Messages are automatically delivered in the receiver’s chosen language.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Bidirectional translation
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Translation works both ways: each user writes/speaks in their own language, and the other receives it in theirs — without needing to copy/paste.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                UI trust signals
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                The interface indicates when content is translated, which direction it was translated, and gives users confidence that meaning has been preserved.
                            </p>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* How it works end-to-end */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="How translation works end-to-end"
                        desc="This is the user-facing flow you can confidently explain on a premium product page."
                    />

                    <ol className="mt-5 grid gap-3">
                        {[
                            {
                                t: "1) User sets a preferred language",
                                d: "At sign-up, users select their language. This becomes their default for receiving translated content and for composing (unless they switch per-chat).",
                            },
                            {
                                t: "2) Conversation starts normally",
                                d: "The sender types (or speaks). They do not need to change keyboards or manually translate. 6chatting handles it automatically.",
                            },
                            {
                                t: "3) Translation is applied to the receiver’s language",
                                d: "The receiver gets the message already localized into their preferred language. This keeps conversations fast and removes friction.",
                            },
                            {
                                t: "4) The UI shows translation status",
                                d: "The message bubble includes a clear indicator that translation occurred, and can show the source/target languages for transparency.",
                            },
                            {
                                t: "5) Conversation stays consistent",
                                d: "The same logic is applied across replies, new threads, and multi-device sessions so the experience feels reliable and premium.",
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

            {/* Quality and expectations */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Quality expectations"
                        desc="Premium translation must protect meaning, tone, and context—especially for business and sensitive conversations."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Meaning over literal wording
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                The goal is accurate intent. When languages differ culturally, translation should keep the meaning and tone natural—not robotic.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Business reliability
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                For sales, logistics, customer support, and cross-border operations, translation should remain consistent, fast, and clearly labeled.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Names, places, and numbers
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Proper nouns, brand names, currency, dates, and figures must remain stable. The UI should reduce confusion by keeping these readable.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                User control when needed
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                A premium experience allows users to understand what happened (translated vs original) and adjust language preferences without friction.
                            </p>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* CTA */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Ready to use 6chatting globally?
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Experience real-time translation across chat, voice, and calling — built for modern communication.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button href="/" ariaLabel="Back to Home">
                                Back to Home
                            </Button>
                            <Button href="/download" ariaLabel="Get the app" className="water-btn-primary">
                                Get the app
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
