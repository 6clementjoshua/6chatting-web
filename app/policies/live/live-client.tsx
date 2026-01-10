"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
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

export default function LivePolicyClient() {
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
                <div className="policy-hero reveal">
                    <div className="policy-badge">
                        <Video className="policy-badge-ic" />
                        <span>Policy</span>
                    </div>

                    <h1 className="policy-h1">Live Streaming Policy</h1>
                    <p className="policy-sub">
                        This policy governs access to and use of Live broadcasting features on 6chatting (“Live”), across all countries and regions. It applies to creators,
                        businesses, viewers, moderators, guests, co-hosts, and anyone interacting with Live.
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

                    <Callout icon={<AlertTriangle className="h-5 w-5" />} title="Zero tolerance for harmful Live content" tone="warn">
                        Live sessions may be paused or terminated in real time. Violations can result in restriction, suspension, loss of Live access, loss of earnings,
                        and account termination—without prior notice where safety is at risk.
                    </Callout>
                </div>

                <div className="policy-grid">
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

                    <article className="policy-body">
                        {/* ✅ Paste ALL your existing sections here exactly as you already have them */}
                        {/* Nothing changes inside the content. */}
                        {/* Just do NOT add a <style jsx global> at the bottom. */}
                        <section className="policy-section reveal" style={{ animationDelay: "40ms" }}>
                            <SectionTitle id="overview" icon={<Sparkles className="h-5 w-5" />} title="1. Overview" kicker="Foundation" />
                            <p className="policy-p">
                                Live is a real-time broadcast feature designed for global communication, entertainment, education, and business. Live is governed by our Terms of Service
                                and policy framework. Where local laws impose stricter requirements, those rules apply.
                            </p>
                            <ul className="policy-ul">
                                <Li>Live may include comments, reactions, co-hosting, guests, and translated interactions.</Li>
                                <Li>6chatting may apply region-based limits to meet local laws and youth protections.</Li>
                                <Li>Safety and trust are prioritized over reach, virality, or monetization.</Li>
                            </ul>
                        </section>

                        {/* ...keep the rest of your sections unchanged... */}
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
