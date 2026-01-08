import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Business Verification (Gold Tick) | 6chatting",
    description:
        "Learn what Business Gold Tick means on 6chatting, why it’s premium, who it’s for, and what stronger requirements users should expect.",
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

export default function BusinessGoldTickPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Business verification • Gold tick</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Gold tick signals premium business credibility.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        The Gold tick is a higher-trust business verification tier. It is designed for brands and organizations that need stronger trust
                        signals for partnerships, high-value customers, and cross-border communication where reputation matters.
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
                            src="/images/verify-business-gold.png"
                            alt="Business verification gold tick on profile screen"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        Best for higher-value commerce, partnerships, and premium brand trust.
                    </p>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle title="Why Gold tick exists" desc="Gold tick is for businesses that want the strongest credibility signal." />
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard title="Higher trust signal" body="Gold tick communicates stronger review standards than standard business verification." />
                        <InfoCard title="Better partnership confidence" body="Partners and clients feel safer working with a verified premium business identity." />
                        <InfoCard title="Reduced fraud exposure" body="Stricter verification reduces impersonation and improves the platform’s overall trust." />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="What businesses should expect"
                        desc="Gold tick typically requires everything in White tick plus stronger validation."
                    />
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Baseline business verification"
                            body="The business must first qualify as a legitimate entity with clear documentation."
                            bullets={[
                                "Business registration documents",
                                "Official business contact details",
                                "Name alignment between profile and documents",
                            ]}
                        />
                        <InfoCard
                            title="Stronger ownership/authorization proof"
                            body="Gold tick focuses on who controls the business and who controls the account."
                            bullets={[
                                "Owner/Director or authorized rep confirmation",
                                "Extra supporting documents where required",
                                "Clear accountability for the account",
                            ]}
                        />
                        <InfoCard
                            title="Consistency checks"
                            body="Premium verification emphasizes consistency: brand name, location, and profile details must align."
                            bullets={[
                                "Profile name matches the legal/registered business",
                                "Accurate category selection",
                                "No misleading branding",
                            ]}
                        />
                        <InfoCard
                            title="Review outcomes"
                            body="If something is missing, a resubmission may be requested. Gold tick implies stricter approval standards."
                            bullets={[
                                "Clear reason if rejected",
                                "Resubmit with improved documents",
                                "Tick becomes visible across devices after approval",
                            ]}
                        />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Compare other verification types
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Choose the tick that matches your account category.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button href="/learn/verification/personal" ariaLabel="Personal blue tick">
                                Personal (Blue)
                            </Button>
                            <Button href="/learn/verification/business-white" ariaLabel="Business white tick">
                                Business (White)
                            </Button>
                            <Button href="/learn/verification/government" ariaLabel="Government black tick" className="water-btn-primary">
                                Government (Black)
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
