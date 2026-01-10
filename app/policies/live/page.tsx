// app/policies/live/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    Shield,
    Video,
    ScrollText,
    AlertTriangle,
    Users,
    Globe,
    Gavel,
    EyeOff,
    Flag,
    Lock,
    BadgeCheck,
    ChevronUp,
    Sparkles,
    BookOpen,
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
    { id: "eligibility", label: "Eligibility to Go Live" },
    { id: "minors", label: "Minors & Youth Safety (All Regions, incl. Australia)" },
    { id: "live-formats", label: "Live Formats & Features" },
    { id: "prohibited", label: "Prohibited Live Content" },
    { id: "safety-controls", label: "Safety Controls & Moderation" },
    { id: "reporting", label: "Reporting & Enforcement" },
    { id: "monetization", label: "Gifts, Tips & Monetization" },
    { id: "privacy", label: "Privacy, Recording & Data" },
    { id: "law", label: "Legal Compliance (Global)" },
    { id: "appeals", label: "Appeals & Account Actions" },
    { id: "changes", label: "Changes to This Policy" },
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


export default function LivePolicyPage() {
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
                        <Video className="policy-badge-ic" />
                        <span>Policy</span>
                    </div>

                    <h1 className="policy-h1">Live Streaming Policy</h1>
                    <p className="policy-sub">
                        This policy governs access to and use of Live broadcasting features on 6chatting (“Live”), across all countries
                        and regions. It applies to creators, businesses, viewers, moderators, guests, co-hosts, and anyone interacting with Live.
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
                            Safety-first enforcement
                        </span>
                    </div>

                    <Callout
                        icon={<AlertTriangle className="h-5 w-5" />}
                        title="Zero tolerance for harmful Live content"
                        tone="warn"
                    >
                        Live sessions may be paused or terminated in real time. Violations can result in restriction, suspension, loss of Live access,
                        loss of earnings, and account termination—without prior notice where safety is at risk.
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
                                        <Link className="policy-link" href="/policies/safety" target="_blank" rel="noopener noreferrer">
                                            Safety
                                        </Link>
                                        <Link className="policy-link" href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                                            Acceptable Use
                                        </Link>
                                        <Link className="policy-link" href="/policies/creator-monetization" target="_blank" rel="noopener noreferrer">
                                            Creator Monetization
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <article className="policy-body">
                        <section className="policy-section reveal" style={{ animationDelay: "40ms" }}>
                            <SectionTitle
                                id="overview"
                                icon={<Sparkles className="h-5 w-5" />}
                                title="1. Overview"
                                kicker="Foundation"
                            />
                            <p className="policy-p">
                                Live is a real-time broadcast feature designed for global communication, entertainment, education, and business.
                                Live is governed by our Terms of Service and policy framework. Where local laws impose stricter requirements,
                                those rules apply.
                            </p>
                            <ul className="policy-ul">
                                <Li>Live may include comments, reactions, co-hosting, guests, and translated interactions.</Li>
                                <Li>6chatting may apply region-based limits to meet local laws and youth protections.</Li>
                                <Li>Safety and trust are prioritized over reach, virality, or monetization.</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "60ms" }}>
                            <SectionTitle
                                id="eligibility"
                                icon={<BadgeCheck className="h-5 w-5" />}
                                title="2. Eligibility to Go Live"
                                kicker="Who can host"
                            />
                            <p className="policy-p">
                                Live hosting is not automatically available to all accounts. Eligibility may vary by country and account type.
                                We may require identity verification, age confirmation, account standing checks, or additional safeguards.
                            </p>
                            <ul className="policy-ul">
                                <Li>Accounts must be in good standing (no active restrictions, serious violations, or ongoing investigations).</Li>
                                <Li>We may require verification for certain Live capabilities (e.g., business Live, monetized Live, high-reach Live).</Li>
                                <Li>We may restrict Live access based on risk signals, repeated reports, or compliance requirements.</Li>
                            </ul>

                            <Callout icon={<Lock className="h-5 w-5" />} title="Safety gating" tone="safe">
                                We may limit reach, disable chat, disable gifting, disable co-hosting, or require additional review before or during Live.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "80ms" }}>
                            <SectionTitle
                                id="minors"
                                icon={<Users className="h-5 w-5" />}
                                title="3. Minors & Youth Safety (All Regions, incl. Australia)"
                                kicker="Kids & teens"
                            />
                            <p className="policy-p">
                                6chatting is committed to protecting minors globally. Youth protections apply across all regions, including
                                Australia, the EU/EEA, the UK, the United States, Canada, and all other jurisdictions with child safety or
                                age-appropriate design requirements.
                            </p>

                            <ul className="policy-ul">
                                <Li>
                                    <strong>Minimum age rules:</strong> Users must meet the minimum age required in their country to use Live features.
                                    In many regions, additional parental consent or youth protections may apply.
                                </Li>
                                <Li>
                                    <strong>Minor safety defaults:</strong> For accounts identified as minors, we may apply stronger defaults such as limited discoverability,
                                    restricted messaging, restricted comments, restricted gifting, and stricter Live eligibility.
                                </Li>
                                <Li>
                                    <strong>Australia:</strong> We follow youth-safety expectations aligned with Australia’s online safety regime and eSafety principles.
                                    Harmful content involving minors is strictly prohibited and may be reported to relevant authorities where required.
                                </Li>
                                <Li>
                                    <strong>Sexual content involving minors:</strong> Zero tolerance. Any sexual content involving minors, grooming behavior,
                                    or exploitation results in immediate enforcement and may be reported to law enforcement.
                                </Li>
                                <Li>
                                    <strong>Adult interaction controls:</strong> We may restrict adult–minor interactions, Live co-hosting, and viewer participation to reduce risk.
                                </Li>
                            </ul>

                            <Callout icon={<Shield className="h-5 w-5" />} title="Child safety commitment" tone="warn">
                                Any attempt to exploit, sexualize, target, or endanger minors results in immediate restriction or termination of accounts and may be escalated for legal reporting.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "100ms" }}>
                            <SectionTitle
                                id="live-formats"
                                icon={<Video className="h-5 w-5" />}
                                title="4. Live Formats & Features"
                                kicker="What Live can include"
                            />
                            <p className="policy-p">
                                Live may support interactive features, subject to region and account eligibility:
                            </p>
                            <ul className="policy-ul">
                                <Li>Creator Live and Business Live broadcasts</Li>
                                <Li>Co-hosting and guest participation (where enabled)</Li>
                                <Li>Comments, reactions, and translated interactions</Li>
                                <Li>Moderation tools (comment filters, blocking, muting, reporting)</Li>
                                <Li>Gifts, tips, or paid features (if eligible under monetization rules)</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "120ms" }}>
                            <SectionTitle
                                id="prohibited"
                                icon={<EyeOff className="h-5 w-5" />}
                                title="5. Prohibited Live Content"
                                kicker="Not allowed"
                            />
                            <p className="policy-p">
                                The following content is prohibited during Live sessions (and may also be prohibited across the platform).
                            </p>
                            <ul className="policy-ul">
                                <Li><strong>Illegal activity</strong>, criminal instruction, or the promotion/sale of illegal goods or services</Li>
                                <Li><strong>Sexual content</strong>, explicit nudity, sexual services, or sexual exploitation</Li>
                                <Li><strong>Child sexual content</strong> or any sexualization of minors (immediate termination and reporting)</Li>
                                <Li><strong>Hate speech</strong>, harassment, bullying, threats, or discrimination</Li>
                                <Li><strong>Violence</strong>, gore, extremist propaganda, or glorification of violence</Li>
                                <Li><strong>Dangerous acts</strong> (self-harm promotion, harmful challenges, reckless behavior)</Li>
                                <Li><strong>Misinformation</strong> that may cause harm (medical, financial, civic, emergency-related)</Li>
                                <Li><strong>Copyright infringement</strong> or unauthorized rebroadcasts</Li>
                                <Li><strong>Impersonation</strong>, deceptive behavior, or fraudulent fundraising</Li>
                            </ul>

                            <Callout icon={<AlertTriangle className="h-5 w-5" />} title="Immediate termination triggers" tone="warn">
                                Content involving exploitation of minors, credible threats of violence, or instructions for wrongdoing may result in immediate Live shutdown and account termination.
                            </Callout>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "140ms" }}>
                            <SectionTitle
                                id="safety-controls"
                                icon={<Shield className="h-5 w-5" />}
                                title="6. Safety Controls & Moderation"
                                kicker="Protection by design"
                            />
                            <p className="policy-p">
                                6chatting uses layered safeguards to protect viewers and hosts, which may include automated detection, human review,
                                and feature controls.
                            </p>
                            <ul className="policy-ul">
                                <Li>Automated systems may reduce reach or stop Live when risk is detected</Li>
                                <Li>Hosts may have moderation tools (block, mute, comment filters, remove participants)</Li>
                                <Li>We may require additional checks (verification, age gating, content review) for certain Live sessions</Li>
                                <Li>We may disable specific features (comments, gifts, guesting) in high-risk contexts</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "160ms" }}>
                            <SectionTitle
                                id="reporting"
                                icon={<Flag className="h-5 w-5" />}
                                title="7. Reporting & Enforcement"
                                kicker="How we act"
                            />
                            <p className="policy-p">
                                Users can report Live sessions during or after broadcasts. Reports are reviewed using a combination of automated
                                signals and human moderation.
                            </p>
                            <ul className="policy-ul">
                                <Li>We may pause, limit, or end Live sessions immediately if safety risk is present</Li>
                                <Li>We may restrict Live access temporarily or permanently</Li>
                                <Li>We may remove monetization privileges and withhold or reverse earnings tied to violations</Li>
                                <Li>Abusive reporting may result in enforcement against the reporter</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "180ms" }}>
                            <SectionTitle
                                id="monetization"
                                icon={<Gavel className="h-5 w-5" />}
                                title="8. Gifts, Tips & Monetization"
                                kicker="Money rules"
                            />
                            <p className="policy-p">
                                Live monetization is subject to eligibility and compliance. Monetization is governed by the{" "}
                                <Link className="policy-link" href="/policies/creator-monetization" target="_blank" rel="noopener noreferrer">
                                    Creator Monetization Policy
                                </Link>
                                .
                            </p>
                            <ul className="policy-ul">
                                <Li>We may disable gifts/tips for certain accounts, regions, or risk signals</Li>
                                <Li>Violation of Live rules can result in earnings forfeiture, holds, or reversals</Li>
                                <Li>Fraud, manipulation, or incentivized harmful behavior results in permanent monetization removal</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "200ms" }}>
                            <SectionTitle
                                id="privacy"
                                icon={<EyeOff className="h-5 w-5" />}
                                title="9. Privacy, Recording & Data"
                                kicker="Respect & consent"
                            />
                            <p className="policy-p">
                                Live sessions may include public or semi-public interaction. You are responsible for respecting privacy rights and
                                obtaining consent where required by law.
                            </p>
                            <ul className="policy-ul">
                                <Li>Do not reveal sensitive personal data (IDs, addresses, bank details, private images) without lawful basis and consent</Li>
                                <Li>Do not livestream others (especially minors) without consent where applicable</Li>
                                <Li>We may retain limited records and logs for safety, fraud prevention, and policy enforcement</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "220ms" }}>
                            <SectionTitle
                                id="law"
                                icon={<Globe className="h-5 w-5" />}
                                title="10. Legal Compliance (Global)"
                                kicker="All countries"
                            />
                            <p className="policy-p">
                                You must comply with all laws applicable to your Live session, including advertising, consumer protection,
                                privacy, and youth safety rules. Where local laws require stricter protections, those protections apply.
                            </p>
                            <ul className="policy-ul">
                                <Li>We may apply country-specific restrictions or feature changes to comply with local regulations</Li>
                                <Li>We may cooperate with lawful requests from authorities consistent with applicable law</Li>
                                <Li>Live access may be unavailable in certain countries or regions</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "240ms" }}>
                            <SectionTitle
                                id="appeals"
                                icon={<Gavel className="h-5 w-5" />}
                                title="11. Appeals & Account Actions"
                                kicker="Enforcement outcomes"
                            />
                            <p className="policy-p">
                                Enforcement actions may include content removal, Live shutdown, feature restrictions, monetization removal,
                                suspension, or termination. Serious violations may result in immediate termination.
                            </p>
                            <ul className="policy-ul">
                                <Li>Appeals may be submitted via our Contact page</Li>
                                <Li>We may request additional context or verification for appeal review</Li>
                                <Li>Repeated or severe violations may be non-appealable where required for safety</Li>
                            </ul>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "260ms" }}>
                            <SectionTitle
                                id="changes"
                                icon={<ScrollText className="h-5 w-5" />}
                                title="12. Changes to This Policy"
                                kicker="Updates"
                            />
                            <p className="policy-p">
                                We may update this policy to reflect product changes, legal requirements, or safety improvements. Continued use of Live
                                after changes constitutes acceptance.
                            </p>
                        </section>

                        <section className="policy-section reveal" style={{ animationDelay: "280ms" }}>
                            <SectionTitle
                                id="contact"
                                icon={<Shield className="h-5 w-5" />}
                                title="13. Contact"
                                kicker="Support"
                            />
                            <p className="policy-p">
                                Questions about Live rules or enforcement can be directed to our support channels:
                            </p>
                            <ul className="policy-ul">
                                <Li>
                                    Contact page:{" "}
                                    <Link className="policy-link" href="/policies/contact" target="_blank" rel="noopener noreferrer">
                                        /policies/contact
                                    </Link>
                                </Li>
                            </ul>

                            <div className="policy-bottom-nav">
                                <button className="policy-btn" type="button" onClick={() => scrollToId("overview")} aria-label="Back to top">
                                    <ChevronUp className="h-4 w-4" />
                                    Back to top
                                </button>

                                <Link className="policy-btn" href="/policies/creator-monetization" aria-label="Go to Creator Monetization Policy">
                                    <Gavel className="h-4 w-4" />
                                    Creator Monetization Policy
                                </Link>
                            </div>
                        </section>
                    </article>
                </div>

                {/* Floating back-to-top */}
                <button
                    type="button"
                    onClick={() => scrollToId("overview")}
                    className={cx("policy-fab", showTop && "policy-fab-on")}
                    aria-label="Back to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            </main>

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
/* ✅ No-flick reveal:
   - Content is visible immediately (no white flash / zoom).
   - Animation only runs after hydration (client paint). */
.reveal {
  opacity: 1;
  transform: none;
}

/* Run the entrance animation only after hydration */
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
