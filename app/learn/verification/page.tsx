// app/learn/verification/page.tsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Verification Ticks | 6chatting",
    description:
        "Understand 6chatting verification ticks (Blue, White, Gold, Black), what they mean, who they are for, and what users must provide to get verified.",
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

function TickCard({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    whoFor,
    whatItMeans,
    typicalRequirements,
    processingNotes,
}: {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    whoFor: string[];
    whatItMeans: string[];
    typicalRequirements: string[];
    processingNotes: string[];
}) {
    return (
        <BevelCard className="p-5 sm:p-7">
            <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-start">
                <div>
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[220px] sm:h-[260px]">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority={false}
                        />
                    </div>

                    <div className="mt-4">
                        <div
                            className="text-[clamp(18px,2.1vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {title}
                        </div>
                        <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">{subtitle}</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            Who it’s for
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-[13.8px] leading-[1.8] text-neutral-700">
                            {whoFor.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            What it means to other users
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-[13.8px] leading-[1.8] text-neutral-700">
                            {whatItMeans.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            Typical requirements
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-[13.8px] leading-[1.8] text-neutral-700">
                            {typicalRequirements.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            Review & processing notes
                        </div>
                        <ul className="mt-2 list-disc pl-5 text-[13.8px] leading-[1.8] text-neutral-700">
                            {processingNotes.map((x) => (
                                <li key={x}>{x}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </BevelCard>
    );
}

export default function VerificationLearnPage() {
    return (
        <main
            className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16"
            // ✅ match the “top kissing header” behavior you used elsewhere
            style={{ paddingTop: "calc(var(--header-h, 64px) + 2px)" }}
        >
            {/* ✅ HERO (balanced) */}
            <section className="grid gap-4 md:grid-cols-2 md:items-stretch">
                {/* Left hero card: stretch to match height */}
                <BevelCard className="p-5 sm:p-7 h-full">
                    <Badge>Know your users</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Verification ticks that build trust — before the first message.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        6chatting uses verification ticks to help users quickly understand who they are chatting with. The goal is simple: reduce
                        impersonation, increase credibility, and make conversations safer — especially for business and cross-border communication.
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

                {/* Right hero card: flex column so content sits properly + fills height */}
                <BevelCard className="p-5 sm:p-7 h-full">
                    <div className="flex h-full flex-col">
                        <SectionTitle
                            title="Quick guide"
                            desc="Each tick represents a verified category. Blue is personal. White & Gold are business. Black is government/public institutions."
                        />

                        <div className="mt-5 grid gap-3">
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Blue tick — Personal
                                </div>
                                <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                    Verified individual identity. Best for everyday users, creators, and professionals.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    White tick — Business
                                </div>
                                <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                    Verified business account. Best for brands, shops, SMEs, and customer-facing teams.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Gold tick — Business Premium
                                </div>
                                <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                    Higher-trust business verification for partnerships, payments, and international credibility.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Black tick — Government
                                </div>
                                <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                    Reserved for verified government/public institutions with enhanced requirements and review.
                                </p>
                            </div>
                        </div>

                        {/* Optional: keeps the card feeling “finished” and balanced at the bottom */}
                        <div className="mt-auto pt-5">
                            <div className="rounded-2xl border border-black/10 bg-white p-4">
                                <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                    Tip
                                </div>
                                <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                    On 6chatting, the tick is shown consistently across devices, so trust signals remain clear in every conversation.
                                </p>
                            </div>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* WHY VERIFICATION */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Why verification matters on 6chatting"
                        desc="Translation connects the world — verification keeps the connection trustworthy."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Anti-impersonation
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Ticks reduce fake accounts by making it obvious when an identity has been verified by category.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Faster confidence
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Users can make quick decisions: who to reply to, who to trust, and who to transact with.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Safer cross-border chat
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                In international conversations, trust is everything. Verification supports safer communication and business.
                            </p>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* TICK DETAILS */}
            <section className="pt-6">
                <div className="grid gap-4">
                    <TickCard
                        title="Personal verification (Blue tick)"
                        subtitle="For individuals — confirms a real person behind the account."
                        imageSrc="/images/verify-personal-blue.png"
                        imageAlt="Personal verification blue tick"
                        whoFor={[
                            "Everyday users who want trusted conversations",
                            "Creators and public-facing professionals",
                            "Freelancers who communicate with clients internationally",
                        ]}
                        whatItMeans={[
                            "This account belongs to a verified individual identity",
                            "Reduced risk of impersonation and fake profiles",
                            "More confidence when starting new chats",
                        ]}
                        typicalRequirements={[
                            "Government-issued ID (valid, unexpired)",
                            "A selfie / liveness check to match the ID (where required)",
                            "Basic profile completeness (name, photo, username)",
                        ]}
                        processingNotes={[
                            "Submission is reviewed for document clarity and match quality",
                            "If documents are unclear or mismatched, verification may be rejected with instructions to resubmit",
                            "The tick is tied to the verified identity (not transferable)",
                        ]}
                    />

                    <TickCard
                        title="Business verification (White tick)"
                        subtitle="For verified businesses — credibility for customer support and brand trust."
                        imageSrc="/images/verify-business-white.png"
                        imageAlt="Business verification white tick"
                        whoFor={[
                            "Small businesses and brands that chat with customers",
                            "Teams that use 6chatting for support, sales, and logistics",
                            "Businesses needing a trusted presence in multiple countries",
                        ]}
                        whatItMeans={[
                            "This account represents a verified business entity",
                            "Customers can recognize official brand communication",
                            "More trust for inquiries, orders, and customer support",
                        ]}
                        typicalRequirements={[
                            "Business registration document (as applicable in your region)",
                            "Proof of ownership/representation (authorized person details)",
                            "Official business contact details (email/phone) and profile info",
                        ]}
                        processingNotes={[
                            "Business name and documents should align with the profile name",
                            "If a business is using a representative, authorization must be clear",
                            "White tick is business verified (baseline verification tier)",
                        ]}
                    />

                    <TickCard
                        title="Business verification (Gold tick)"
                        subtitle="Premium business verification — higher trust for partnerships and transactions."
                        imageSrc="/images/verify-business-gold.png"
                        imageAlt="Business verification gold tick"
                        whoFor={[
                            "Businesses working with higher-value clients or cross-border partners",
                            "Brands that need premium trust signals for credibility",
                            "Organizations that want stronger reputation and reduced fraud risk",
                        ]}
                        whatItMeans={[
                            "This is a higher-trust verified business account",
                            "Signals stronger review and validation than baseline business verification",
                            "Ideal for partnerships, enterprise-style communication, and high credibility use-cases",
                        ]}
                        typicalRequirements={[
                            "Everything in Business (White tick) verification",
                            "Additional validation (e.g., stronger ownership proof or extra documentation)",
                            "Optional brand reputation checks (where applicable)",
                        ]}
                        processingNotes={[
                            "Gold tick implies stricter review standards than White tick",
                            "Inconsistencies can lead to requests for additional documentation",
                            "Best used for brands that want the strongest trust signal in business conversations",
                        ]}
                    />

                    <TickCard
                        title="Government verification (Black tick)"
                        subtitle="Reserved for verified government/public institutions — highest trust tier."
                        imageSrc="/images/verify-government-black.png"
                        imageAlt="Government verification black tick"
                        whoFor={[
                            "Government agencies and ministries",
                            "Public institutions and official programs",
                            "Authorized departments that communicate with the public",
                        ]}
                        whatItMeans={[
                            "This account belongs to a verified government/public institution",
                            "Higher trust for public communication and citizen engagement",
                            "Stronger safeguards to prevent impersonation of officials/institutions",
                        ]}
                        typicalRequirements={[
                            "Official government/institution documents (issued by the institution)",
                            "Official authorization letter for the account manager/representative",
                            "Institutional email domain verification (where available)",
                            "Additional identity verification for the representative",
                        ]}
                        processingNotes={[
                            "Black tick has the strictest review process and enhanced checks",
                            "Extra fields may be required during application (department, mandate, office address, official contacts)",
                            "Requests may be verified through official channels (where applicable)",
                        ]}
                    />
                </div>
            </section>

            {/* APPLICATION FLOW */}
            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What users should expect when applying"
                        desc="This is the clean, premium explanation you can show inside your verification flow UI."
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Step 1 — Choose a verification category
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Users select: <span className="font-semibold">Personal</span>,{" "}
                                <span className="font-semibold">Business (White)</span>, <span className="font-semibold">Business (Gold)</span>, or{" "}
                                <span className="font-semibold">Government (Black)</span>. The form updates based on the category selected.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Step 2 — Submit documents and required details
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Documents must be clear, valid, and consistent with the profile. Business and Government categories require additional
                                proof that the applicant is authorized to represent the entity.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Step 3 — Review and decision
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Applications are reviewed for authenticity, consistency, and category fit. If something is missing, the user can be asked
                                to resubmit with corrections.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white p-4">
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Step 4 — Tick appears across devices
                            </div>
                            <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                                Once approved, the tick displays on the profile and remains consistent across mobile, tablet, and desktop — so other users
                                immediately recognize the verified category.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            Important note
                        </div>
                        <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                            Verification is a trust feature. Misrepresentation, forged documents, or impersonation attempts can lead to rejection and
                            enforcement actions under 6chatting policies.
                        </p>
                    </div>
                </BevelCard>
            </section>

            {/* CTA */}
            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Want to apply for verification?
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Choose the category that matches your account. The correct tick helps users know exactly who they’re chatting with.
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
