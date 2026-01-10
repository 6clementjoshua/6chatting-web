// app/learn/creator-earnings/page.tsx
import Image from "next/image";
import Link from "next/link";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex items-center justify-center rounded-full",
            "border border-black/10 bg-white/90 px-3 py-2",
            "text-xs font-semibold text-black/85",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            className
        )}
    >
        {children}
    </span>
);

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
    children,
    href,
    variant = "default",
    className = "",
    ariaLabel,
}: {
    children: React.ReactNode;
    href: string;
    variant?: "default" | "primary";
    className?: string;
    ariaLabel?: string;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    return (
        <Link className={cx(base, variant === "primary" && primary, className)} href={href} aria-label={ariaLabel}>
            {children}
        </Link>
    );
};

export default function CreatorEarningsPage() {
    return (
        <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14" style={{ paddingTop: "calc(var(--header-h, 64px) + 18px)" }}>
            {/* Hero */}
            <section className="pt-3 sm:pt-5">
                <BevelCard className="p-5 sm:p-7">
                    <div className="grid gap-5 md:grid-cols-[1.05fr_.95fr] md:items-center">
                        <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[280px] sm:h-[340px] md:h-[420px]">
                            <Image
                                src="/images/creator/creator-earnings-wallet.png"
                                alt="6chatting creator earnings wallet illustration on device"
                                fill
                                priority
                                className="object-contain"
                                sizes="(max-width: 768px) 96vw, (max-width: 1200px) 52vw, 640px"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>Creator Program</Pill>
                                <Pill className="!bg-white">Earnings</Pill>
                                <span className="text-[12px] font-semibold text-neutral-600">Premium, brand-safe, and transparent</span>
                            </div>

                            <h1 className="text-[clamp(26px,4.2vw,40px)] font-extrabold leading-[1.08] tracking-[-0.04em] text-black">
                                Creator Earnings on 6chatting
                            </h1>

                            <p className="text-[14.5px] leading-[1.8] text-neutral-700">
                                Turn visibility into opportunity. The 6chatting Creator Program rewards eligible creators for original,
                                high-quality content that performs well—especially content that reaches global audiences through real-time
                                translation.
                            </p>

                            <div className="grid gap-2 sm:grid-cols-2">
                                <Button href="/pricing" variant="primary" ariaLabel="View Premium plans" className="w-full">
                                    View Premium Plans
                                </Button>
                                <Button href="/policies/acceptable-use" ariaLabel="Read acceptable use policy" className="w-full">
                                    Read Content Rules
                                </Button>
                            </div>

                            <p className="text-[12.5px] leading-[1.65] text-neutral-600">
                                Note: Program availability, eligibility, and payout options may vary by country and account type. Additional
                                earning modules will be released over time.
                            </p>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* What you can earn from */}
            <section className="pt-8 sm:pt-10">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Stories engagement",
                            desc:
                                "Earn from story performance when your stories drive meaningful engagement—views, replies, and repeat interest from real users.",
                        },
                        {
                            title: "Posts & content reach",
                            desc:
                                "Original posts that perform well can qualify for earnings—especially when your content reaches audiences across languages.",
                        },
                        {
                            title: "Verified promotions (eligible accounts)",
                            desc:
                                "Verified personal and verified business accounts may access promotional tools and campaign placements (where supported).",
                        },
                    ].map((card) => (
                        <BevelCard key={card.title} className="p-4 sm:p-5">
                            <div className="text-[15px] font-extrabold tracking-[-0.02em] text-black">{card.title}</div>
                            <p className="mt-2 text-[14.5px] leading-[1.75] text-neutral-700">{card.desc}</p>
                        </BevelCard>
                    ))}
                </div>
            </section>

            {/* Translation note */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-5 sm:p-7">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-[-0.03em] text-black">
                            Translation impact (Premium advantage)
                        </h2>
                        <p className="text-[14.5px] leading-[1.8] text-neutral-700">
                            Translation expands your reach. Premium users get deeper translation coverage and advanced translation
                            experiences across chats, posts, and creator-facing features. Free users may have limited translation access and
                            lower daily translation capacity—so Premium generally unlocks stronger global distribution and higher earning
                            potential.
                        </p>
                        <p className="text-[12.5px] leading-[1.65] text-neutral-600">
                            Translation availability can vary by language pair, region, and system performance safeguards.
                        </p>
                    </div>
                </BevelCard>
            </section>

            {/* Eligibility + quality */}
            <section className="pt-8 sm:pt-10">
                <div className="grid gap-4 md:grid-cols-2">
                    <BevelCard className="p-5 sm:p-7">
                        <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-[-0.03em] text-black">
                            Eligibility (high-level)
                        </h2>
                        <ul className="mt-3 list-none p-0 m-0 grid gap-3">
                            {[
                                "A real, complete profile and consistent account activity",
                                "Original content you own or have the rights to publish",
                                "No repeated policy violations, spam behavior, or manipulation",
                                "Meets regional requirements where the program is available",
                            ].map((t) => (
                                <li key={t} className="grid grid-cols-[10px_1fr] gap-3 items-start text-[14px] leading-[1.75] text-neutral-700">
                                    <span className="mt-[9px] h-[6px] w-[6px] rounded-full bg-black/55 shadow-[4px_4px_10px_rgba(0,0,0,0.10)]" />
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4">
                            <div className="text-[13px] font-extrabold tracking-[-0.02em] text-black">Important</div>
                            <p className="mt-1 text-[12.8px] leading-[1.7] text-neutral-700">
                                Only approved, original, high-quality content can generate earnings. Accounts that attempt to abuse the system
                                may be suspended and removed from monetization.
                            </p>
                        </div>
                    </BevelCard>

                    <BevelCard className="p-5 sm:p-7">
                        <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-[-0.03em] text-black">
                            What earns vs what does not
                        </h2>

                        <div className="mt-3 grid gap-3">
                            <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
                                <div className="text-[13px] font-extrabold tracking-[-0.02em] text-black">Typically eligible</div>
                                <ul className="mt-2 list-none p-0 m-0 grid gap-2">
                                    {[
                                        "Original stories and posts with authentic engagement",
                                        "Educational content, tutorials, commentary, and community value",
                                        "Business updates (verified businesses) that comply with policies",
                                        "Creative media you own (music, photography, design, short clips) with rights cleared",
                                    ].map((t) => (
                                        <li key={t} className="grid grid-cols-[10px_1fr] gap-3 items-start text-[13.5px] leading-[1.7] text-neutral-700">
                                            <span className="mt-[8px] h-[6px] w-[6px] rounded-full bg-black/55" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
                                <div className="text-[13px] font-extrabold tracking-[-0.02em] text-black">Not eligible / risk of removal</div>
                                <ul className="mt-2 list-none p-0 m-0 grid gap-2">
                                    {[
                                        "Re-uploaded content you do not own (stolen videos, watermarked clips, unlicensed media)",
                                        "Spam, engagement farming, misleading claims, or artificial traffic manipulation",
                                        "Content that violates Safety / Acceptable Use (harassment, exploitation, illicit content, etc.)",
                                        "Deceptive ads, prohibited products/services, or region-restricted offerings",
                                    ].map((t) => (
                                        <li key={t} className="grid grid-cols-[10px_1fr] gap-3 items-start text-[13.5px] leading-[1.7] text-neutral-700">
                                            <span className="mt-[8px] h-[6px] w-[6px] rounded-full bg-black/55" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p className="mt-3 text-[12.5px] leading-[1.65] text-neutral-600">
                            Enforcement includes demotion, monetization removal, suspension, or permanent termination depending on severity
                            and repeat behavior.
                        </p>
                    </BevelCard>
                </div>
            </section>

            {/* Payouts */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-5 sm:p-7">
                    <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-start">
                        <div>
                            <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-[-0.03em] text-black">
                                Payouts & withdrawals
                            </h2>
                            <p className="mt-2 text-[14.5px] leading-[1.8] text-neutral-700">
                                When your account is eligible and your earnings are confirmed, payouts can be sent to the local bank
                                options available in your country. Where supported, local transfers are designed to be fast—often instant or
                                same-day depending on your bank and region.
                            </p>

                            <ul className="mt-3 list-none p-0 m-0 grid gap-3">
                                {[
                                    "Connect your payout details securely inside your account settings",
                                    "Earnings may include verification and anti-fraud review before payout",
                                    "Payout timing depends on local rails, bank processing, and compliance checks",
                                ].map((t) => (
                                    <li key={t} className="grid grid-cols-[10px_1fr] gap-3 items-start text-[14px] leading-[1.75] text-neutral-700">
                                        <span className="mt-[9px] h-[6px] w-[6px] rounded-full bg-black/55" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white/70 p-5">
                            <div className="text-[13px] font-extrabold tracking-[-0.02em] text-black">Gains & losses (transparent)</div>
                            <p className="mt-2 text-[13.5px] leading-[1.75] text-neutral-700">
                                Earnings can go up when you post consistently, build real trust, and publish original content people return to.
                                Earnings can go down or stop if engagement drops, content is flagged, or policies are violated.
                            </p>
                            <p className="mt-2 text-[12.5px] leading-[1.65] text-neutral-600">
                                To protect the ecosystem, 6chatting may reverse fraudulent earnings and disable monetization for abusive
                                behavior.
                            </p>
                        </div>
                    </div>
                </BevelCard>
            </section>

            {/* Roadmap + CTA */}
            <section className="pt-8 sm:pt-10">
                <BevelCard className="p-5 sm:p-7">
                    <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                        <div>
                            <h2 className="text-[clamp(18px,2.5vw,26px)] font-extrabold tracking-[-0.03em] text-black">
                                More earning features are coming
                            </h2>
                            <p className="mt-2 text-[14.5px] leading-[1.8] text-neutral-700">
                                We will continue to roll out additional creator tools—better insights, safer promotion options, brand
                                partnerships, and region-specific monetization modules. As each module is introduced, we will publish updated
                                rules and eligibility requirements.
                            </p>
                            <p className="mt-2 text-[12.5px] leading-[1.65] text-neutral-600">
                                Always keep your content original, your community safe, and your account compliant.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Button href="/support" variant="primary" ariaLabel="Support the build" className="w-full">
                                Support the Build
                            </Button>
                            <Button href="/" ariaLabel="Back to home" className="w-full">
                                Back to Home
                            </Button>
                            <div className="pt-1 text-center text-[12px] font-semibold text-neutral-600">
                                Need help? <Link className="underline" href="/policies/contact">Contact</Link>
                            </div>
                        </div>
                    </div>
                </BevelCard>
            </section>

           
        </main>
    );
}
