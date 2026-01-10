"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    Wallet,
    ScrollText,
    Shield,
    Globe,
    BadgeCheck,
    AlertTriangle,
    Gavel,
    Flag,
    ChevronUp,
    Sparkles,
    BookOpen,
    Ban,
    CheckCircle2,
    HandCoins,
} from "lucide-react";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
}

function useActiveAnchor(ids: string[]) {
    const [active, setActive] = useState(ids[0] ?? "");
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
                if (visible[0]?.target?.id) setActive(visible[0].target.id);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: [0.05, 0.1, 0.2] }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });

        return () => obs.disconnect();
    }, [ids]);

    return active;
}

const TOC = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility & Verification (Global)" },
    { id: "minors", label: "Minors & Youth Monetization (All Regions, incl. Australia)" },
    { id: "what-earns", label: "What Can Earn" },
    { id: "what-cant", label: "What Cannot Earn" },
    { id: "integrity", label: "Integrity, Originality & Approval" },
    { id: "reviews", label: "Reviews, Holds & Reversals" },
    { id: "payouts", label: "Payouts (Local Banks)" },
    { id: "tax", label: "Taxes & Reporting (Creator Responsibility)" },
    { id: "enforcement", label: "Enforcement & Removal from Programs" },
    { id: "appeals", label: "Appeals" },
    { id: "changes", label: "Changes to Programs" },
    { id: "contact", label: "Contact" },
];

const UPDATED_AT = "Last updated: January 2026";

const SectionTitle = ({
    icon,
    title,
    id,
    kicker,
}: {
    icon: React.ReactNode;
    title: string;
    id: string;
    kicker?: string;
}) => (
    <div className="policy-head">
        <div id={id} className="scroll-mt-28" />
        <div className="policy-head-row">
            <div className="policy-head-icon">{icon}</div>
            <div className="policy-head-txt">
                {kicker ? <div className="policy-kicker">{kicker}</div> : null}
                <h2 className="policy-h2">{title}</h2>
            </div>
        </div>
    </div>
);

const Callout = ({
    icon,
    title,
    children,
    tone = "neutral",
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    tone?: "neutral" | "warn" | "safe";
}) => (
    <div className={cx("policy-callout", tone === "warn" && "policy-callout-warn", tone === "safe" && "policy-callout-safe")}>
        <div className="policy-callout-row">
            <div className="policy-callout-ic">{icon}</div>
            <div className="policy-callout-body">
                <div className="policy-callout-title">{title}</div>
                <div className="policy-callout-text">{children}</div>
            </div>
        </div>
    </div>
);

const Li = ({ children }: { children: React.ReactNode }) => (
    <li className="policy-li">
        <span className="policy-dot" />
        <span>{children}</span>
    </li>
);

function useHydrated() {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);
    return hydrated;
}

export default function CreatorMonetizationClient() {
    const hydrated = useHydrated();
    const ids = useMemo(() => TOC.map((t) => t.id), []);
    const active = useActiveAnchor(ids);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 700);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="policy-page" data-hydrated={hydrated ? "1" : "0"}>
            <main className="policy-shell">
                {/* Hero */}
                <div className="policy-hero reveal">
                    <div className="policy-badge">
                        <Wallet className="policy-badge-ic" />
                        <span>Policy</span>
                    </div>

                    <h1 className="policy-h1">Creator Monetization Policy</h1>
                    <p className="policy-sub">
                        This policy governs how creators and eligible accounts earn on 6chatting—including Stories, Posts, Live, and approved creator tools—
                        across all countries and regions. It sets strict standards for originality, compliance, review, and payout integrity.
                    </p>

                    <div className="policy-meta">
                        <span className="policy-meta-pill">
                            <ScrollText className="policy-meta-ic" />
                            {UPDATED_AT}
                        </span>
                        <span className="policy-meta-pill">
                            <Globe className="policy-meta-ic" />
                            Global coverage (all regions)
                        </span>
                        <span className="policy-meta-pill">
                            <Shield className="policy-meta-ic" />
                            Fraud-resistant earnings
                        </span>
                    </div>

                    <Callout icon={<AlertTriangle className="h-5 w-5" />} title="Earnings are conditional" tone="warn">
                        Earnings can be held, reduced, reversed, or forfeited where fraud, manipulation, policy violations, or low-quality / non-original content is detected.
                    </Callout>
                </div>

                <div className="policy-grid">
                    {/* TOC */}
                    <aside className="policy-toc reveal" style={{ animationDelay: "70ms" }}>
                        <div className="policy-toc-card">
                            <div className="policy-toc-title">
                                <BookOpen className="h-4 w-4" />
                                Table of contents
                            </div>

                            <nav className="policy-toc-nav" aria-label="Policy table of contents">
                                {TOC.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => scrollToId(t.id)}
                                        className={cx("policy-toc-link", active === t.id && "policy-toc-link-active")}
                                        aria-label={`Jump to ${t.label}`}
                                    >
                                        <span className="policy-toc-bullet" />
                                        <span className="policy-toc-text">{t.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="policy-toc-footer">
                                <div className="policy-toc-small">
                                    Related policies:
                                    <div className="policy-toc-related">
                                        <Link className="policy-link" href="/policies/live" target="_blank" rel="noopener noreferrer">
                                            Live Streaming
                                        </Link>
                                        <Link className="policy-link" href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                                            Acceptable Use
                                        </Link>
                                        <Link className="policy-link" href="/policies/safety" target="_blank" rel="noopener noreferrer">
                                            Safety
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="policy-body">
                        <section className="policy-section reveal" style={{ animationDelay: "40ms" }}>
                            <SectionTitle id="overview" icon={<Sparkles className="h-5 w-5" />} title="1. Overview" kicker="Principles" />
                            <p className="policy-p">
                                Monetization on 6chatting is designed to reward original, high-quality, compliant content and safe community participation.
                                Monetization features may vary by country, account type, verification status, and legal requirements.
                            </p>
                            <ul className="policy-ul">
                                <Li>Monetization is a privilege, not a right.</Li>
                                <Li>We may approve, restrict, pause, or revoke monetization at any time for safety or compliance.</Li>
                                <Li>Where local laws impose stricter rules, those rules apply.</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "60ms" }}>
                            <SectionTitle id="eligibility" icon={<BadgeCheck className="h-5 w-5" />} title="2. Eligibility & Verification (Global)" kicker="Who can earn" />
                            <p className="policy-p">
                                Eligibility depends on region, account standing, and compliance signals. We may require verification and/or additional review.
                            </p>
                            <ul className="policy-ul">
                                <Li>Verified identity may be required for payouts, high reach, or certain monetization tools.</Li>
                                <Li>Accounts must be in good standing (no serious or repeated violations, no ongoing fraud investigations).</Li>
                                <Li>We may limit monetization based on risk factors or local compliance requirements.</Li>
                            </ul>
                            <Callout icon={<Shield className="h-5 w-5" />} title="Compliance-first monetization" tone="safe">
                                Monetization access may differ by country due to local rules, banking availability, payment processing, or youth protections.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "80ms" }}>
                            <SectionTitle id="minors" icon={<AlertTriangle className="h-5 w-5" />} title="3. Minors & Youth Monetization (All Regions, incl. Australia)" kicker="Kids & teens" />
                            <p className="policy-p">
                                Youth monetization is heavily restricted globally. Where permitted by law, additional safeguards apply. In many regions,
                                minors may be ineligible for payouts or monetization tools. These protections apply across all countries, including Australia.
                            </p>
                            <ul className="policy-ul">
                                <Li>We may require <strong>age verification</strong> and may deny monetization where age cannot be confirmed.</Li>
                                <Li>We may require <strong>parental/guardian consent</strong> where local laws demand it.</Li>
                                <Li>We may restrict or disable monetization features for minors (including gifting, tips, paid promotions, and payout access).</Li>
                                <Li>Any attempt to exploit minors for monetization (e.g., grooming, coercion, sexualization, or unsafe content) results in immediate enforcement.</Li>
                                <Li><strong>Australia:</strong> We apply youth-safety expectations aligned with Australia’s online safety principles and protections.</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "100ms" }}>
                            <SectionTitle id="what-earns" icon={<HandCoins className="h-5 w-5" />} title="4. What Can Earn" kicker="Eligible earnings" />
                            <p className="policy-p">
                                Eligible accounts may earn from approved engagement and creator tools. Availability varies by region and program phase.
                            </p>
                            <ul className="policy-ul">
                                <Li><strong>Stories</strong> (approved engagement signals and compliant content)</Li>
                                <Li><strong>Posts</strong> (original content performance, community interaction, and safety standing)</Li>
                                <Li><strong>Live</strong> (eligible Live engagement, gifts/tips where enabled, and safe moderation)</Li>
                                <Li><strong>Approved promotions</strong> (where allowed, properly disclosed, and policy compliant)</Li>
                                <Li><strong>Future creator tools</strong> (new monetization features may be added over time)</Li>
                            </ul>
                            <Callout icon={<CheckCircle2 className="h-5 w-5" />} title="Quality signals matter" tone="safe">
                                Higher-quality, original, policy-compliant content typically performs better and is more likely to remain eligible for monetization.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "120ms" }}>
                            <SectionTitle id="what-cant" icon={<Ban className="h-5 w-5" />} title="5. What Cannot Earn" kicker="Not eligible" />
                            <p className="policy-p">The following content or behavior cannot earn and may trigger enforcement:</p>
                            <ul className="policy-ul">
                                <Li>Re-uploaded or stolen content you do not own or have rights to monetize</Li>
                                <Li>Low-effort “spam” content designed only to farm views or reactions</Li>
                                <Li>Artificial engagement (bots, click farms, incentivized manipulation)</Li>
                                <Li>Misleading content, scams, or deceptive claims</Li>
                                <Li>Hate, harassment, sexual content, violence, or anything violating Safety / Acceptable Use</Li>
                                <Li>Copyrighted broadcasts (sports, movies, music) without permission</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "140ms" }}>
                            <SectionTitle id="integrity" icon={<Shield className="h-5 w-5" />} title="6. Integrity, Originality & Approval" kicker="How approval works" />
                            <p className="policy-p">
                                Monetization is designed to reward authentic creators. We may use automated and human review to confirm originality,
                                policy compliance, and legitimacy of engagement.
                            </p>
                            <ul className="policy-ul">
                                <Li>Only original, high-quality, and approved content can remain eligible</Li>
                                <Li>We may require identity verification and banking validation before payouts</Li>
                                <Li>We may remove eligibility where content is misleading, unsafe, or rights-infringing</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "160ms" }}>
                            <SectionTitle id="reviews" icon={<Gavel className="h-5 w-5" />} title="7. Reviews, Holds & Reversals" kicker="Fraud prevention" />
                            <p className="policy-p">To protect creators, users, and the platform, we may review earnings and apply holds.</p>
                            <ul className="policy-ul">
                                <Li>Earnings may be delayed pending fraud checks, identity validation, or compliance review</Li>
                                <Li>Earnings may be reversed if linked to manipulation, abuse, chargebacks, or policy violations</Li>
                                <Li>Repeated abuse may result in permanent removal from monetization programs</Li>
                            </ul>
                            <Callout icon={<AlertTriangle className="h-5 w-5" />} title="No guaranteed income" tone="warn">
                                Earnings depend on eligibility, program rules, region, and content quality. 6chatting does not guarantee revenue.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "180ms" }}>
                            <SectionTitle id="payouts" icon={<Wallet className="h-5 w-5" />} title="8. Payouts (Local Banks)" kicker="Getting paid" />
                            <p className="policy-p">
                                Payouts are processed to supported <strong>local bank accounts</strong> where available. Timing may vary by banking systems,
                                region, verification, and program phase.
                            </p>
                            <ul className="policy-ul">
                                <Li>We may require verified identity and verified bank details before sending payouts</Li>
                                <Li>Minimum payout thresholds may apply</Li>
                                <Li>Payouts may be paused where fraud, policy risk, or legal restrictions apply</Li>
                            </ul>
                            <Callout icon={<Shield className="h-5 w-5" />} title="Instant or fast payouts (where supported)" tone="safe">
                                In many regions, local bank transfers can be processed quickly. Actual speed depends on your bank and local payment rails.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "200ms" }}>
                            <SectionTitle id="tax" icon={<ScrollText className="h-5 w-5" />} title="9. Taxes & Reporting (Creator Responsibility)" kicker="Compliance" />
                            <p className="policy-p">
                                Creators are responsible for taxes, declarations, and compliance obligations in their country. We may request information required to comply with applicable laws.
                            </p>
                            <ul className="policy-ul">
                                <Li>You are responsible for understanding and meeting tax obligations in your region</Li>
                                <Li>We may suspend payouts if required information is missing or inconsistent</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "220ms" }}>
                            <SectionTitle id="enforcement" icon={<Flag className="h-5 w-5" />} title="10. Enforcement & Removal from Programs" kicker="Strict actions" />
                            <p className="policy-p">Violations of monetization rules may result in enforcement actions including removal from monetization programs.</p>
                            <ul className="policy-ul">
                                <Li>Loss of monetization access (temporary or permanent)</Li>
                                <Li>Forfeiture of earnings tied to violations</Li>
                                <Li>Account restrictions, suspension, or termination</Li>
                                <Li>Referral to authorities where required by law</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "240ms" }}>
                            <SectionTitle id="appeals" icon={<Gavel className="h-5 w-5" />} title="11. Appeals" kicker="Review requests" />
                            <p className="policy-p">
                                If you believe an enforcement action was applied incorrectly, you may submit an appeal through our support channels. We may request additional details or verification for review.
                            </p>
                            <ul className="policy-ul">
                                <Li>Appeals are reviewed case-by-case</Li>
                                <Li>Serious violations may be non-appealable where safety requires permanent enforcement</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "260ms" }}>
                            <SectionTitle id="changes" icon={<Globe className="h-5 w-5" />} title="12. Changes to Programs" kicker="Evolving" />
                            <p className="policy-p">
                                Monetization programs may evolve. We may change eligibility, ranking signals, payout rules, or program availability by region. Continued participation constitutes acceptance of updates.
                            </p>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "280ms" }}>
                            <SectionTitle id="contact" icon={<Shield className="h-5 w-5" />} title="13. Contact" kicker="Support" />
                            <p className="policy-p">Questions about monetization eligibility, payouts, or enforcement can be directed to:</p>
                            <ul className="policy-ul">
                                <Li>
                                    Contact page:{" "}
                                    <Link className="policy-link" href="/policies/contact" target="_blank" rel="noopener noreferrer">
                                        contact
                                    </Link>
                                </Li>
                            </ul>

                            <div className="policy-bottom-nav">
                                <button className="policy-btn" type="button" onClick={() => scrollToId("overview")} aria-label="Back to top">
                                    <ChevronUp className="h-4 w-4" />
                                    Back to top
                                </button>

                                <Link className="policy-btn" href="/policies/live" aria-label="Go to Live Streaming Policy">
                                    <Shield className="h-4 w-4" />
                                    Live Streaming Policy
                                </Link>
                            </div>
                        </section>
                    </article>
                </div>

                <button
                    type="button"
                    onClick={() => scrollToId("overview")}
                    className={cx("policy-fab", showTop && "policy-fab-on")}
                    aria-label="Back to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            </main>
        </div>
    );
}
