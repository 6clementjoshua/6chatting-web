import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Business Verification (White Tick) | 6chatting",
    description:
        "Learn what Business White Tick means on 6chatting, who it’s for, why it matters, and what businesses must provide to get verified.",
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

export default function BusinessWhiteTickPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-16 pt-[calc(var(--header-h,64px)+18px)]">
            <section className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <BevelCard className="p-5 sm:p-7">
                    <Badge>Business verification • White tick</Badge>

                    <h1
                        className="mt-4 text-[clamp(26px,4.4vw,44px)] font-extrabold leading-[1.07] tracking-[-0.05em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        A White tick tells customers they’re speaking to the real business.
                    </h1>

                    <p className="mt-3 max-w-2xl text-[14.5px] sm:text-[15px] leading-[1.8] text-neutral-700">
                        The White tick is for verified businesses. It helps customers recognize official brand communication and supports safer
                        customer support, sales conversations, and cross-border commerce — especially where language barriers exist.
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
                            src="/images/verify-business-white.png"
                            alt="Business verification white tick on profile screen"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 520px"
                            priority
                        />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-[1.7] text-neutral-600">
                        Ideal for brands, shops, SMEs, and customer-facing teams.
                    </p>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle
                        title="Why White tick matters"
                        desc="Customers trust faster when they can confirm they are speaking to the official account."
                    />
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        <InfoCard title="Official brand presence" body="Shows your account represents a real business, not a copycat or impersonator." />
                        <InfoCard title="Better customer confidence" body="Helps customers feel safe sharing details, placing orders, or requesting support." />
                        <InfoCard title="Stronger cross-border trust" body="When people speak different languages, a verified business tick reduces risk and improves clarity." />
                    </div>
                </BevelCard>
            </section>

            <section className="pt-6">
                <BevelCard className="p-5 sm:p-7">
                    <SectionTitle title="Typical requirements" desc="Businesses should be ready to prove the entity and who controls the account." />
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <InfoCard
                            title="Business documents"
                            body="Proof the business exists legally or commercially in your region."
                            bullets={["Business registration (as applicable)", "Business name matches profile", "Valid, readable documents"]}
                        />
                        <InfoCard
                            title="Authorized representative"
                            body="Proof that the person applying is allowed to represent the business."
                            bullets={["Owner/Director details where applicable", "Authorization proof if staff-managed", "Official contact details"]}
                        />
                    </div>

                    <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4">
                        <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                            What users should expect
                        </div>
                        <p className="mt-2 text-[13.8px] leading-[1.75] text-neutral-700">
                            If names do not match, documents are unclear, or representation is not proven, the application may be rejected with a request
                            to resubmit. Once approved, the White tick appears consistently across devices.
                        </p>
                    </div>
                </BevelCard>
            </section>

            <section className="pt-8">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-extrabold text-black" style={{ fontFamily: "var(--font-display)" }}>
                                Need higher-trust verification?
                            </div>
                            <p className="mt-1 text-[13.8px] leading-[1.75] text-neutral-700">
                                Gold tick is designed for premium business credibility and stronger review standards.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button href="/learn/verification/personal" ariaLabel="Personal blue tick">
                                Personal (Blue)
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
