import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Government Verification (Black Tick) | 6chatting",
    description:
        "Learn what the Government Black Tick means on 6chatting, why it’s reserved, and what public institutions must provide to get verified.",
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

export default function GovernmentBlackTickPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Government verification • Black tick</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Black tick is reserved for verified public institutions.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        The Black tick is for government and public institutions only. It exists to prevent impersonation of officials and agencies,
                        protect citizens, and ensure public communications are clearly identifiable — especially in multi-language environments.
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
                            src="/images/verify-government-black.png"
                            alt="Government verification black tick on profile screen"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        Strongest trust tier — enhanced review and additional requirements.
                    </p>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle title="Why Black tick is strict" desc="Public trust requires stronger checks than personal or business verification." />
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard title="Protects citizens" body="Citizens must know they are speaking to an official, not an impersonator." />
                        <InfoCard title="Prevents misinformation" body="Verified institutional accounts help reduce confusion and false announcements." />
                        <InfoCard title="Supports public communication" body="For announcements, support channels, emergency updates, and public services across languages." />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle title="Typical requirements" desc="Government verification requires institutional proof and authorized control." />
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Institutional documents"
                            body="Documents that confirm the institution and its authority."
                            bullets={[
                                "Official institution documents (issued by the institution)",
                                "Department / unit information (where applicable)",
                                "Official contacts and address details",
                            ]}
                        />
                        <InfoCard
                            title="Authorization & representative identity"
                            body="Proof that the account manager is authorized to control the account."
                            bullets={[
                                "Official authorization letter",
                                "Representative identity verification",
                                "Institutional email/domain verification (where available)",
                            ]}
                        />
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            What to expect during review
                        </div>
                        <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                            Black tick applications may require extra steps and may be validated through official channels where applicable.
                            Missing or unclear authorization is the most common reason for delay or rejection.
                        </p>
                    </div>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                See other verification types
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Personal and business ticks have different goals and requirements.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button href="/learn/verification/personal" ariaLabel="Personal blue tick">
                                Personal (Blue)
                            </Button>
                            <Button href="/learn/verification/business-white" ariaLabel="Business white tick">
                                Business (White)
                            </Button>
                            <Button href="/learn/verification/business-gold" ariaLabel="Business gold tick" className="water-btn-primary">
                                Business (Gold)
                            </Button>
                        </div>
                    </div>
                </BevelCard>
            </section>
        </main>
    );
}
