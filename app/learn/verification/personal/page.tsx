import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Personal Verification (Blue Tick) | 6chatting",
    description:
        "Learn what the Blue Tick means on 6chatting, who it’s for, why it matters, and what users should expect when applying.",
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

export default function PersonalBlueTickPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Personal verification • Blue tick</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        A Blue tick tells people you’re real — and you’re accountable.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        The Blue tick is for personal accounts. It confirms an individual identity behind the profile and helps reduce impersonation,
                        scams, and fake profiles — especially when chatting with new people or working across borders.
                    </p>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                        <Button href="/" ariaLabel="Back to Home">
                            Back to Home
                        </Button>
                        <Button href="/learn/verification" ariaLabel="Verification overview" className="water-btn-primary">
                            Verification overview
                        </Button>
                    </div>
                </BevelCard>

                <BevelCard className="p-5 sm:p-7">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[260px] sm:h-[320px]">
                        <Image
                            src="/images/verify-personal-blue.png"
                            alt="Personal verification blue tick on profile screen"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        Best for creators, professionals, and everyday users who want trusted conversations.
                    </p>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Why Blue tick matters"
                        desc="Personal verification improves trust, safety, and response rates — especially for first-time conversations."
                    />
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard title="Stops impersonation" body="Users can identify verified individuals quickly, reducing fake profiles and copycat accounts." />
                        <InfoCard title="Improves trust instantly" body="People reply faster when they know the person behind the chat is verified." />
                        <InfoCard title="Safer global communication" body="When languages and regions differ, verification adds confidence and reduces risk." />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What it means to other users"
                        desc="This is the simple promise the tick communicates."
                    />
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Verified identity"
                            body="The account owner has passed identity checks for personal verification, reducing the chance of fake profiles."
                            bullets={[
                                "A real person is behind the account",
                                "Identity was reviewed",
                                "Account is more accountable",
                            ]}
                        />
                        <InfoCard
                            title="Cleaner conversations"
                            body="Users can focus on the conversation, not on worrying if the person is real."
                            bullets={[
                                "Lower scam risk",
                                "Higher confidence in new chats",
                                "Better experience for all users",
                            ]}
                        />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle title="Typical requirements" desc="These are the common items users should expect during application." />
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Identity proof"
                            body="A valid government-issued ID is used to confirm the person applying."
                            bullets={["Valid, unexpired ID", "Clear photo/scan", "Matching profile details"]}
                        />
                        <InfoCard
                            title="Selfie / liveness check"
                            body="A selfie or liveness step helps confirm the applicant matches the ID (where required)."
                            bullets={["Face matches ID", "Anti-fraud protection", "Faster approval when clear"]}
                        />
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            Approval outcomes
                        </div>
                        <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                            If documents are unclear or inconsistent, the application may be rejected with guidance to resubmit.
                            Once approved, the Blue tick appears across devices and stays tied to the verified identity.
                        </p>
                    </div>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Explore the other verification types
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Business and Government ticks have different requirements and trust levels.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button href="/learn/verification/business-white" ariaLabel="Business white tick">
                                Business (White)
                            </Button>
                            <Button href="/learn/verification/business-gold" ariaLabel="Business gold tick" className="water-btn-primary">
                                Business (Gold)
                            </Button>
                            <Button href="/learn/verification/government" ariaLabel="Government black tick">
                                Government (Black)
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
