// app/policies/creator-monetization/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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


export default function CreatorMonetizationPolicyPage() {
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
                            <SectionTitle
                                id="eligibility"
                                icon={<BadgeCheck className="h-5 w-5" />}
                                title="2. Eligibility & Verification (Global)"
                                kicker="Who can earn"
                            />
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
                            <SectionTitle
                                id="minors"
                                icon={<AlertTriangle className="h-5 w-5" />}
                                title="3. Minors & Youth Monetization (All Regions, incl. Australia)"
                                kicker="Kids & teens"
                            />
                            <p className="policy-p">
                                Youth monetization is heavily restricted globally. Where permitted by law, additional safeguards apply. In many regions,
                                minors may be ineligible for payouts or monetization tools. These protections apply across all countries, including Australia.
                            </p>
                            <ul className="policy-ul">
                                <Li>
                                    We may require <strong>age verification</strong> and may deny monetization where age cannot be confirmed.
                                </Li>
                                <Li>
                                    We may require <strong>parental/guardian consent</strong> where local laws demand it.
                                </Li>
                                <Li>
                                    We may restrict or disable monetization features for minors (including gifting, tips, paid promotions, and payout access).
                                </Li>
                                <Li>
                                    Any attempt to exploit minors for monetization (e.g., grooming, coercion, sexualization, or unsafe content) results in immediate enforcement.
                                </Li>
                                <Li>
                                    <strong>Australia:</strong> We apply youth-safety expectations aligned with Australia’s online safety principles and protections.
                                </Li>
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
                            <p className="policy-p">
                                The following content or behavior cannot earn and may trigger enforcement:
                            </p>
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
                            <SectionTitle
                                id="integrity"
                                icon={<Shield className="h-5 w-5" />}
                                title="6. Integrity, Originality & Approval"
                                kicker="How approval works"
                            />
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
                            <SectionTitle
                                id="reviews"
                                icon={<Gavel className="h-5 w-5" />}
                                title="7. Reviews, Holds & Reversals"
                                kicker="Fraud prevention"
                            />
                            <p className="policy-p">
                                To protect creators, users, and the platform, we may review earnings and apply holds.
                            </p>
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
                                Creators are responsible for taxes, declarations, and compliance obligations in their country. We may request information
                                required to comply with applicable laws.
                            </p>
                            <ul className="policy-ul">
                                <Li>You are responsible for understanding and meeting tax obligations in your region</Li>
                                <Li>We may suspend payouts if required information is missing or inconsistent</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "220ms" }}>
                            <SectionTitle
                                id="enforcement"
                                icon={<Flag className="h-5 w-5" />}
                                title="10. Enforcement & Removal from Programs"
                                kicker="Strict actions"
                            />
                            <p className="policy-p">
                                Violations of monetization rules may result in enforcement actions including removal from monetization programs.
                            </p>
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
                                If you believe an enforcement action was applied incorrectly, you may submit an appeal through our support channels.
                                We may request additional details or verification for review.
                            </p>
                            <ul className="policy-ul">
                                <Li>Appeals are reviewed case-by-case</Li>
                                <Li>Serious violations may be non-appealable where safety requires permanent enforcement</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "260ms" }}>
                            <SectionTitle id="changes" icon={<Globe className="h-5 w-5" />} title="12. Changes to Programs" kicker="Evolving" />
                            <p className="policy-p">
                                Monetization programs may evolve. We may change eligibility, ranking signals, payout rules, or program availability by region.
                                Continued participation constitutes acceptance of updates.
                            </p>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "280ms" }}>
                            <SectionTitle id="contact" icon={<Shield className="h-5 w-5" />} title="13. Contact" kicker="Support" />
                            <p className="policy-p">
                                Questions about monetization eligibility, payouts, or enforcement can be directed to:
                            </p>
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

            {/* Styling kept consistent with the Live page for premium uniformity */}
            <style jsx global>{`
        .policy-page {
          min-height: 100vh;
          background: #fff;
          color: #0b0b0f;
        }
        .policy-shell {
          margin: 0 auto;
          width: min(1120px, calc(100% - 24px));
          padding-top: calc(var(--header-h, 64px) + 14px);
          padding-bottom: 60px;
        }

       /* ✅ No-flick reveal: visible immediately, animate only after hydration */
.reveal {
  opacity: 1;
  transform: none;
}

/* Run entrance animation only after the client has hydrated */
.policy-page[data-hydrated="1"] .reveal {
  animation: revealIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes revealIn {
  from {
    opacity: 0.96;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .policy-page[data-hydrated="1"] .reveal {
    animation: none !important;
  }
}


        .policy-hero {
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 26px;
          padding: 18px;
          box-shadow: 18px 18px 40px rgba(0, 0, 0, 0.08), -18px -18px 40px rgba(255, 255, 255, 0.92);
        }

        .policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          padding: 8px 12px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.92);
          font-size: 12px;
          font-weight: 800;
        }
        .policy-badge-ic {
          height: 16px;
          width: 16px;
          opacity: 0.85;
        }
        .policy-h1 {
          margin-top: 12px;
          font-size: clamp(26px, 3.2vw, 40px);
          letter-spacing: -0.04em;
          font-weight: 900;
          line-height: 1.08;
        }
        .policy-sub {
          margin-top: 10px;
          font-size: 14.5px;
          line-height: 1.75;
          color: rgba(38, 38, 38, 0.85);
          max-width: 74ch;
        }
        .policy-meta {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .policy-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.7);
        }
        .policy-meta-ic {
          height: 14px;
          width: 14px;
          opacity: 0.85;
        }

        .policy-grid {
          margin-top: 16px;
          display: grid;
          gap: 14px;
        }
        @media (min-width: 980px) {
          .policy-grid {
            grid-template-columns: 340px 1fr;
            align-items: start;
            gap: 18px;
          }
        }

        .policy-toc {
          position: relative;
        }
        @media (min-width: 980px) {
          .policy-toc {
            position: sticky;
            top: calc(var(--header-h, 64px) + 12px);
          }
        }
        .policy-toc-card {
          border-radius: 26px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 16px 16px 36px rgba(0, 0, 0, 0.08), -16px -16px 36px rgba(255, 255, 255, 0.9);
          padding: 14px;
        }
        .policy-toc-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          letter-spacing: -0.02em;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.85);
          padding: 6px 6px 10px;
        }
        .policy-toc-nav {
          display: grid;
          gap: 4px;
        }
        .policy-toc-link {
          display: grid;
          grid-template-columns: 10px 1fr;
          gap: 10px;
          align-items: start;
          text-align: left;
          padding: 8px 8px;
          border-radius: 14px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }
        .policy-toc-link:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
        .policy-toc-link-active {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.1);
        }
        .policy-toc-bullet {
          margin-top: 7px;
          height: 6px;
          width: 6px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.55);
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        }
        .policy-toc-text {
          font-size: 12.8px;
          line-height: 1.55;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.72);
        }
        .policy-toc-footer {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
        .policy-toc-small {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
          font-weight: 800;
        }
        .policy-toc-related {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .policy-body {
          border-radius: 26px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 16px 16px 36px rgba(0, 0, 0, 0.08), -16px -16px 36px rgba(255, 255, 255, 0.9);
          padding: 14px;
        }
        @media (min-width: 640px) {
          .policy-body {
            padding: 18px;
          }
        }

        .policy-section {
          padding: 14px 6px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .policy-section:last-child {
          border-bottom: none;
        }

        .policy-head {
          margin-bottom: 10px;
        }
        .policy-head-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .policy-head-icon {
          height: 38px;
          width: 38px;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.08), -10px -10px 22px rgba(255, 255, 255, 0.85);
        }
        .policy-head-txt {
          flex: 1;
          padding-top: 2px;
        }
        .policy-kicker {
          font-size: 11px;
          letter-spacing: -0.01em;
          color: rgba(0, 0, 0, 0.55);
          font-weight: 900;
          text-transform: uppercase;
        }
        .policy-h2 {
          font-size: 18px;
          font-weight: 950;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-top: 3px;
        }
        @media (min-width: 640px) {
          .policy-h2 {
            font-size: 20px;
          }
        }

        .policy-p {
          margin-top: 8px;
          font-size: 14.5px;
          line-height: 1.78;
          color: rgba(40, 40, 40, 0.88);
        }
        .policy-ul {
          margin-top: 10px;
          display: grid;
          gap: 10px;
          padding: 0;
          list-style: none;
        }
        .policy-li {
          display: grid;
          grid-template-columns: 10px 1fr;
          gap: 10px;
          align-items: start;
          font-size: 13.8px;
          line-height: 1.75;
          color: rgba(55, 55, 55, 0.95);
        }
        .policy-dot {
          margin-top: 9px;
          height: 6px;
          width: 6px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.55);
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .policy-callout {
          margin-top: 14px;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.7);
          padding: 12px;
          box-shadow: 12px 12px 26px rgba(0, 0, 0, 0.08), -12px -12px 26px rgba(255, 255, 255, 0.85);
        }
        .policy-callout-warn {
          border-color: rgba(0, 0, 0, 0.16);
          background: rgba(255, 255, 255, 0.75);
        }
        .policy-callout-safe {
          border-color: rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.75);
        }
        .policy-callout-row {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 10px;
          align-items: start;
        }
        .policy-callout-ic {
          height: 28px;
          width: 28px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .policy-callout-title {
          font-weight: 950;
          letter-spacing: -0.02em;
          font-size: 13.5px;
          color: rgba(0, 0, 0, 0.85);
        }
        .policy-callout-text {
          margin-top: 4px;
          font-size: 13.2px;
          line-height: 1.7;
          color: rgba(45, 45, 45, 0.9);
        }

        .policy-link {
          font-weight: 900;
          text-decoration: underline;
          text-underline-offset: 3px;
          color: rgba(0, 0, 0, 0.8);
        }

        .policy-bottom-nav {
          margin-top: 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .policy-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.9);
          font-size: 12.5px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.8);
          box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.08), -10px -10px 22px rgba(255, 255, 255, 0.88);
          transition: transform 160ms ease;
        }
        .policy-btn:hover {
          transform: translateY(-1px);
        }

        .policy-fab {
          position: fixed;
          right: 18px;
          bottom: 18px;
          height: 48px;
          width: 48px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 14px 14px 30px rgba(0, 0, 0, 0.14), -14px -14px 30px rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          transition: opacity 200ms ease, transform 200ms ease;
          z-index: 50;
        }
        .policy-fab-on {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
      `}</style>
        </div>
    );
}
