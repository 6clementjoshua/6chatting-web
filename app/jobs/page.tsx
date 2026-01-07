// app/jobs/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

function LogoBadge({ size = 36, className = "" }: { size?: number; className?: string }) {
    return (
        <div
            className={cx(
                "relative shrink-0 rounded-2xl border border-black/10 bg-white p-1",
                "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
                className
            )}
            style={{ width: size, height: size }}
        >
            <Image src="/6logo.PNG" alt="6chatting" fill sizes={`${size}px`} className="object-contain" />
        </div>
    );
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex items-center justify-center rounded-full",
            "border border-black/10 bg-white/95 px-3 py-2",
            "text-xs font-semibold text-black/90 text-center leading-snug",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            className
        )}
    >
        {children}
    </span>
);

type WorkMode = "Onsite" | "Hybrid" | "Remote";
type EmploymentType = "Full-time" | "Part-time" | "Remote";
type Shift = "Day" | "Night" | "Rotational";

type PayBandUSD = {
    fullTime: { min: number; max: number };
    partTime: { min: number; max: number };
    /** optional, for future (disabled now) */
    remote?: { min: number; max: number };
    period: "month";
};

type Job = {
    id: string;
    title: string;
    dept: string;
    location: string;
    workMode: WorkMode;

    isOpen: boolean; // green dot
    remoteAvailable: boolean; // remote availability (should be false for now)

    employmentTypes: EmploymentType[]; // still shows all (remote disabled visually)
    shifts: Shift[];

    payUSD: PayBandUSD;

    summary: string;
    qualifications: string[];
    responsibilities: string[];
};

/**
 * Salary policy (monthly):
 * - Keep within your hints: min >= ~₦25k, max <= ~₦5m
 * - Part-time should be clearly lower than full-time
 *
 * Note: Pay is shown as a range for transparency.
 */
const JOBS: Job[] = [
    // Executive / Leadership (Full-time only; part-time shown but realistically low/rare; remote disabled)
    {
        id: "coo",
        title: "Chief Operating Officer (COO)",
        dept: "Executive",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 1800, max: 3000 }, // ≈ ₦2.9m–₦4.8m
            partTime: { min: 700, max: 1200 },  // ≈ ₦1.1m–₦1.9m (advisory/partial)
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Own operations, execution, hiring velocity, and delivery across teams.",
        qualifications: [
            "8+ years leadership experience (operations or scaling tech orgs)",
            "Excellent cross-functional execution and stakeholder management",
            "Strong process design, hiring, and performance systems",
            "Integrity-first leadership and high operational standards",
        ],
        responsibilities: [
            "Build operating cadence: weekly metrics, OKRs, and delivery review",
            "Coordinate Engineering, Product, Support, Trust & Safety operations",
            "Hire and manage leads; implement SOPs and QA across functions",
            "Improve reliability: uptime process, incident handling, escalation paths",
        ],
    },
    {
        id: "cto",
        title: "Chief Technology Officer (CTO)",
        dept: "Executive",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 2000, max: 3125 }, // ≈ ₦3.2m–₦5.0m
            partTime: { min: 800, max: 1400 },  // ≈ ₦1.3m–₦2.2m
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Lead architecture, security posture, and engineering excellence at scale.",
        qualifications: [
            "10+ years engineering experience; 4+ leading teams",
            "Strong system design, security fundamentals, and operational maturity",
            "Experience scaling products with real-time features (chat/calls)",
            "Ability to recruit and mentor high-performing engineers",
        ],
        responsibilities: [
            "Define architecture roadmap: chat, translation, calls, verification",
            "Own engineering standards: reviews, CI/CD, observability, reliability",
            "Security-by-design across apps and infra",
            "Drive hiring and technical leadership across domains",
        ],
    },

    // Engineering (Full-time + Part-time; remote disabled)
    {
        id: "frontend-nextjs",
        title: "Frontend Engineer (Next.js)",
        dept: "Engineering",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 500, max: 1000 }, // ≈ ₦800k–₦1.6m
            partTime: { min: 200, max: 450 },  // ≈ ₦320k–₦720k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Build premium web UX, performance, and UI systems.",
        qualifications: [
            "Strong React + Next.js (App Router) experience",
            "Tailwind CSS and component-driven development",
            "Performance-first mindset (LCP, CLS, caching, bundling)",
            "Clean code, tests, and UI polish discipline",
        ],
        responsibilities: [
            "Implement responsive, premium UI across marketing and product surfaces",
            "Own UI patterns (bevel/glass) and component library consistency",
            "Ship performance improvements and SEO hygiene",
            "Collaborate with Product/Design on interaction quality",
        ],
    },
    {
        id: "flutter-mobile",
        title: "Mobile Engineer (Flutter)",
        dept: "Engineering",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 500, max: 1000 },
            partTime: { min: 200, max: 450 },
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Ship the mobile app: chat UX, performance, and platform integrations.",
        qualifications: [
            "Flutter + Dart proficiency; state management patterns",
            "API integration, auth, and offline-friendly UX patterns",
            "Good UI craftsmanship and performance profiling",
            "Experience with notifications and real-time updates is a plus",
        ],
        responsibilities: [
            "Build core chat screens, onboarding, and settings",
            "Integrate translation/calls and verification flows as product evolves",
            "Maintain app stability and release discipline",
            "Work closely with backend for API contracts",
        ],
    },
    {
        id: "backend",
        title: "Backend Engineer",
        dept: "Engineering",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 650, max: 1250 }, // ≈ ₦1.0m–₦2.0m
            partTime: { min: 260, max: 520 },  // ≈ ₦416k–₦832k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Build APIs, data models, and scalable services (chat, verification, moderation).",
        qualifications: [
            "Strong backend fundamentals (APIs, DB, caching, queues)",
            "Experience with Node.js/TypeScript or Go (either is fine)",
            "Security fundamentals: auth, rate limiting, input validation",
            "Comfort with logging, metrics, and incident response",
        ],
        responsibilities: [
            "Design and implement APIs for chat, profiles, jobs, and admin ops",
            "Implement rate limits and abuse prevention",
            "Support real-time features and scalable persistence",
            "Work with DevOps for monitoring and reliability improvements",
        ],
    },
    {
        id: "devops-sre",
        title: "DevOps / SRE Engineer",
        dept: "Engineering",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Rotational"],
        payUSD: {
            fullTime: { min: 700, max: 1400 }, // ≈ ₦1.1m–₦2.2m
            partTime: { min: 280, max: 600 },  // ≈ ₦448k–₦960k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Uptime, deployments, monitoring, and incident response—done professionally.",
        qualifications: [
            "CI/CD, monitoring, logs, tracing fundamentals",
            "Cloud infrastructure experience (AWS/GCP/Azure) is a plus",
            "Security mindset: least privilege, secrets management",
            "Comfort handling incidents and postmortems",
        ],
        responsibilities: [
            "Build deployment pipeline, environments, and observability",
            "Define SLOs and on-call readiness",
            "Improve reliability of chat/translation workloads",
            "Automate infrastructure and reduce operational toil",
        ],
    },

    // Trust & Safety / Support (shift-based; full-time + part-time; remote disabled)
    {
        id: "trust-safety-moderator",
        title: "Trust & Safety Moderator (Shift-based)",
        dept: "Trust & Safety",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Night", "Rotational"],
        payUSD: {
            fullTime: { min: 150, max: 300 }, // ≈ ₦240k–₦480k
            partTime: { min: 80, max: 140 },  // ≈ ₦128k–₦224k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Review reports, enforce policy, and keep the platform safe.",
        qualifications: [
            "Strong judgment, calm decision making, high integrity",
            "Ability to follow policy and document decisions clearly",
            "Comfort with shift work and sensitive content exposure",
            "Basic computer literacy and written communication",
        ],
        responsibilities: [
            "Handle user reports and moderation queues",
            "Escalate high-risk threats and fraud signals",
            "Maintain quality and consistency of enforcement",
            "Contribute feedback to improve policy clarity and tooling",
        ],
    },
    {
        id: "customer-support",
        title: "Customer Support Representative (Shift-based)",
        dept: "Support",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Night", "Rotational"],
        payUSD: {
            fullTime: { min: 140, max: 280 }, // ≈ ₦224k–₦448k
            partTime: { min: 70, max: 130 },  // ≈ ₦112k–₦208k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Support users, resolve issues, and protect quality of experience.",
        qualifications: [
            "Excellent communication and patience",
            "Basic troubleshooting and ability to follow SOPs",
            "Comfort with ticket queues and response SLAs",
            "Professionalism with sensitive user cases",
        ],
        responsibilities: [
            "Respond to tickets: onboarding, billing, account issues",
            "Escalate technical issues and track resolution",
            "Document common issues and improve help articles",
            "Maintain user trust through high-quality support",
        ],
    },

    // Operations / Facilities / Logistics (full-time + part-time; remote disabled)
    {
        id: "cleaner",
        title: "Office Cleaner",
        dept: "Facilities",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 40, max: 90 }, // ≈ ₦64k–₦144k
            partTime: { min: 25, max: 55 }, // ≈ ₦40k–₦88k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Maintain a clean, professional office environment.",
        qualifications: ["Reliable and punctual", "Basic hygiene and cleaning standards", "Respectful and trustworthy"],
        responsibilities: ["Daily cleaning and waste disposal", "Sanitize common areas", "Restock basic supplies"],
    },
    {
        id: "chef",
        title: "Office Chef / Kitchen Staff",
        dept: "Facilities",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 90, max: 200 },  // ≈ ₦144k–₦320k
            partTime: { min: 45, max: 110 },  // ≈ ₦72k–₦176k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Provide meals and maintain kitchen cleanliness.",
        qualifications: ["Food hygiene knowledge", "Ability to plan simple menus", "Cleanliness and consistency"],
        responsibilities: ["Prepare meals and beverages", "Maintain kitchen hygiene", "Manage pantry inventory"],
    },
    {
        id: "driver",
        title: "Company Driver (Executive/Dispatch)",
        dept: "Logistics",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Rotational"],
        payUSD: {
            fullTime: { min: 80, max: 160 }, // ≈ ₦128k–₦256k
            partTime: { min: 40, max: 90 },  // ≈ ₦64k–₦144k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Transport staff/execs and handle dispatch logistics responsibly.",
        qualifications: ["Valid driver’s license", "Knowledge of Calabar routes", "Professional conduct and safety-first driving"],
        responsibilities: ["Executive transport", "Dispatch errands", "Vehicle cleanliness and basic maintenance checks"],
    },
    {
        id: "security-guard",
        title: "Security Guard (Shift-based)",
        dept: "Security",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Night", "Rotational"],
        payUSD: {
            fullTime: { min: 90, max: 180 }, // ≈ ₦144k–₦288k
            partTime: { min: 45, max: 95 },  // ≈ ₦72k–₦152k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Protect premises, manage access control, and support incident response.",
        qualifications: ["Alertness and discipline", "Basic incident reporting", "Ability to work night shifts"],
        responsibilities: ["Access control", "Patrols and monitoring", "Incident logging and escalation"],
    },
    {
        id: "cctv-operator",
        title: "CCTV Operator (Shift-based)",
        dept: "Security",
        location: "Calabar, Nigeria",
        workMode: "Onsite",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day", "Night", "Rotational"],
        payUSD: {
            fullTime: { min: 110, max: 220 }, // ≈ ₦176k–₦352k
            partTime: { min: 55, max: 120 },  // ≈ ₦88k–₦192k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Monitor CCTV feeds and coordinate alerts with on-ground security.",
        qualifications: ["Attention to detail", "Comfort with long monitoring sessions", "Clear reporting and escalation discipline"],
        responsibilities: ["Monitor cameras", "Log suspicious activity", "Coordinate response with guards"],
    },

    // Marketing (hybrid; full-time + part-time; remote disabled)
    {
        id: "growth-marketer",
        title: "Growth Marketer",
        dept: "Marketing",
        location: "Calabar, Nigeria",
        workMode: "Hybrid",
        isOpen: true,
        remoteAvailable: false,
        employmentTypes: ["Full-time", "Part-time", "Remote"],
        shifts: ["Day"],
        payUSD: {
            fullTime: { min: 250, max: 550 }, // ≈ ₦400k–₦880k
            partTime: { min: 120, max: 280 }, // ≈ ₦192k–₦448k
            remote: { min: 0, max: 0 },
            period: "month",
        },
        summary: "Drive acquisition, conversion, and retention through measurable campaigns.",
        qualifications: ["Performance marketing basics", "Analytics discipline", "Strong copy + positioning skills"],
        responsibilities: ["Run experiments and funnels", "Measure and improve conversion", "Coordinate campaigns with design/content"],
    },
];

type CurrencyInfo = {
    code: string;
    symbol?: string;
    locale?: string;
    approxRateFromUSD: number; // estimate only
};

const CURRENCY_TABLE: Record<string, CurrencyInfo> = {
    NG: { code: "NGN", symbol: "₦", locale: "en-NG", approxRateFromUSD: 1600 },
    US: { code: "USD", symbol: "$", locale: "en-US", approxRateFromUSD: 1 },
    GB: { code: "GBP", symbol: "£", locale: "en-GB", approxRateFromUSD: 0.79 },
    CA: { code: "CAD", symbol: "CA$", locale: "en-CA", approxRateFromUSD: 1.35 },
    AU: { code: "AUD", symbol: "A$", locale: "en-AU", approxRateFromUSD: 1.55 },
    DE: { code: "EUR", symbol: "€", locale: "de-DE", approxRateFromUSD: 0.92 },
    FR: { code: "EUR", symbol: "€", locale: "fr-FR", approxRateFromUSD: 0.92 },
    ES: { code: "EUR", symbol: "€", locale: "es-ES", approxRateFromUSD: 0.92 },
    IT: { code: "EUR", symbol: "€", locale: "it-IT", approxRateFromUSD: 0.92 },
};

function formatMoney(amount: number, c: CurrencyInfo) {
    const locale = c.locale || undefined;
    return new Intl.NumberFormat(locale, { style: "currency", currency: c.code, maximumFractionDigits: 0 }).format(amount);
}

function dotClass(open: boolean) {
    return open
        ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]"
        : "bg-neutral-400 shadow-[0_0_0_3px_rgba(115,115,115,0.16)]";
}

function payRangeLabel(job: Job, selectedType: EmploymentType, currency: CurrencyInfo) {
    const rate = currency.approxRateFromUSD || 1;

    const band =
        selectedType === "Part-time"
            ? job.payUSD.partTime
            : selectedType === "Remote"
                ? job.payUSD.remote || job.payUSD.fullTime
                : job.payUSD.fullTime;

    const min = band.min * rate;
    const max = band.max * rate;
    return `${formatMoney(min, currency)} – ${formatMoney(max, currency)} /month`;
}

export default function JobsPage() {
    const year = useMemo(() => new Date().getFullYear(), []);
    const [openId, setOpenId] = useState<string | null>(null);

    const [currency, setCurrency] = useState<CurrencyInfo>(CURRENCY_TABLE.NG);
    const [country, setCountry] = useState<string>("NG");

    const [applyJob, setApplyJob] = useState<Job | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState<string | null>(null);

    const [selectedEmploymentType, setSelectedEmploymentType] = useState<EmploymentType>("Full-time");

    // Basic Geo/IP currency detection (client-side). Falls back to NGN.
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
                if (!res.ok) throw new Error("geo failed");
                const data = await res.json();
                const cc = (data?.country_code || "NG").toUpperCase();
                const info = CURRENCY_TABLE[cc] || CURRENCY_TABLE.NG;
                if (!mounted) return;
                setCountry(cc);
                setCurrency(info);
            } catch {
                // keep default NGN
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    async function submitApplication(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitMsg(null);
        setSubmitting(true);

        try {
            const fd = new FormData(e.currentTarget);
            if (!applyJob) throw new Error("No job selected");

            fd.set("jobId", applyJob.id);
            fd.set("jobTitle", applyJob.title);

            const file = fd.get("cv");
            if (!(file instanceof File) || !file.name) {
                throw new Error("CV is required.");
            }

            const res = await fetch("/api/jobs/apply", { method: "POST", body: fd });
            const out = await res.json().catch(() => ({}));

            if (!res.ok) throw new Error(out?.error || "Application failed. Please try again.");

            setSubmitMsg("Application submitted successfully. We will review and get back to you.");
            (e.currentTarget as HTMLFormElement).reset();
            setApplyJob(null);
        } catch (err: any) {
            setSubmitMsg(err?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="mx-auto w-[min(1100px,calc(100%-24px))] pb-14">
            <section className="pt-6 sm:pt-10">
                <BevelCard className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Pill>6chatting Jobs</Pill>
                                <Pill>Country: {country}</Pill>
                                <Pill>Currency: {currency.code}</Pill>
                                <Pill>Remote: unavailable for now</Pill>
                            </div>

                            <h1
                                className="mt-4 text-[clamp(26px,4.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Join 6chatting
                            </h1>

                            <p className="mt-3 text-[14px] leading-[1.9] text-neutral-700 max-w-[78ch]">
                                We are building a premium translation-first communication platform. Browse open roles below. Tap any card to view qualifications and apply.
                                CV upload is required for every application.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/" className="water-btn inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none">
                                    Back Home
                                </Link>
                                <Link href="/blog" className="water-btn water-btn-primary inline-flex items-center justify-center px-4 py-3 text-sm font-semibold select-none">
                                    Read Blog
                                </Link>
                            </div>
                        </div>

                        <LogoBadge />
                    </div>
                </BevelCard>
            </section>

            <section className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {JOBS.map((job) => {
                        const expanded = openId === job.id;
                        const remoteDisabled = !job.remoteAvailable;

                        // card-level salary shows full-time by default (more standard)
                        const defaultCardPay = payRangeLabel(job, "Full-time", currency);

                        return (
                            <button
                                key={job.id}
                                type="button"
                                onClick={() => setOpenId((prev) => (prev === job.id ? null : job.id))}
                                className={cx(
                                    "text-left rounded-[22px] border border-black/10 bg-white/85 p-5",
                                    "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                                    "transition-transform duration-150 hover:translate-y-[1px] focus:outline-none",
                                    expanded && "ring-2 ring-black/10"
                                )}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={cx("h-2.5 w-2.5 rounded-full", dotClass(job.isOpen))} />
                                            <span className={cx("text-[12px] font-bold", job.isOpen ? "text-emerald-700" : "text-neutral-600")}>
                                                {job.isOpen ? "OPEN" : "CLOSED"}
                                            </span>

                                            <span className={cx("ml-2 text-[12px] font-semibold", "text-neutral-700")}>{job.dept}</span>
                                        </div>

                                        <div className="mt-2 text-[15px] font-extrabold tracking-[-0.01em] text-neutral-950">{job.title}</div>

                                        <div className="mt-1 text-[12.5px] font-semibold text-neutral-700">
                                            {job.location} • {job.workMode}
                                        </div>

                                        <div className="mt-3 text-[12.5px] font-medium leading-[1.75] text-neutral-700">{job.summary}</div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-semibold text-neutral-900">
                                                Pay (Full-time): {defaultCardPay}
                                            </span>

                                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-semibold text-neutral-900">
                                                Shifts: {job.shifts.join(", ")}
                                            </span>

                                            <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-semibold text-neutral-900">
                                                Types: {job.employmentTypes.join(", ")}
                                            </span>

                                            <span
                                                className={cx(
                                                    "rounded-full border border-black/10 px-3 py-1 text-[12px] font-semibold",
                                                    remoteDisabled ? "bg-neutral-200 text-neutral-500" : "bg-white text-neutral-900"
                                                )}
                                            >
                                                Remote: {remoteDisabled ? "Unavailable" : "Available"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="shrink-0">
                                        <div className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-[12px] font-bold text-neutral-900 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]">
                                            {expanded ? "Hide" : "View"}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded details */}
                                <div
                                    className={cx(
                                        "grid gap-4 overflow-hidden transition-[max-height,opacity] duration-200",
                                        expanded ? "max-h-[1400px] opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
                                    )}
                                >
                                    <div className="rounded-2xl border border-black/10 bg-white/90 p-4">
                                        <div className="text-[12px] font-extrabold text-neutral-950">Qualifications</div>
                                        <div className="mt-2 grid gap-2">
                                            {job.qualifications.map((q) => (
                                                <div key={q} className="rounded-xl border border-black/10 bg-white px-3 py-2 text-[12.5px] font-semibold text-neutral-900">
                                                    {q}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-black/10 bg-white/90 p-4">
                                        <div className="text-[12px] font-extrabold text-neutral-950">Responsibilities</div>
                                        <div className="mt-2 grid gap-2">
                                            {job.responsibilities.map((r) => (
                                                <div key={r} className="rounded-xl border border-black/10 bg-white px-3 py-2 text-[12.5px] font-semibold text-neutral-900">
                                                    {r}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div className="text-[12px] font-semibold text-neutral-600">
                                            Note: Remote applications are disabled for now and will show as unavailable.
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(ev) => {
                                                ev.stopPropagation();
                                                setApplyJob(job);
                                                setSelectedEmploymentType("Full-time");
                                                setSubmitMsg(null);
                                            }}
                                            className={cx(
                                                "water-btn water-btn-primary inline-flex items-center justify-center px-4 py-3 text-sm font-semibold",
                                                !job.isOpen && "opacity-60 pointer-events-none"
                                            )}
                                        >
                                            Apply (CV required)
                                        </button>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Apply Modal */}
            {applyJob ? (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setApplyJob(null)}
                >
                    <div className="absolute inset-0 bg-black/30" />
                    <div
                        className="relative w-[min(720px,100%)] rounded-[26px] border border-black/10 bg-white/90 p-6 shadow-[18px_18px_40px_rgba(0,0,0,0.18),_-18px_-18px_40px_rgba(255,255,255,0.90)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <div className="text-[12px] font-bold text-neutral-700">Apply for</div>
                                <div className="mt-1 text-[18px] font-extrabold tracking-[-0.02em] text-neutral-950">{applyJob.title}</div>
                                <div className="mt-1 text-[12.5px] font-semibold text-neutral-700">
                                    {applyJob.dept} • {applyJob.location} • {applyJob.workMode}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setApplyJob(null)}
                                className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-extrabold text-neutral-900 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Salary chooser (Full-time vs Part-time; Remote disabled) */}
                        <div className="mt-4 rounded-2xl border border-black/10 bg-white/85 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="text-[12px] font-extrabold text-neutral-950">Select employment type to view salary</div>

                                <div className="flex flex-wrap gap-2">
                                    {(["Full-time", "Part-time", "Remote"] as EmploymentType[]).map((t) => {
                                        const disabled = t === "Remote" && !applyJob.remoteAvailable;
                                        const active = selectedEmploymentType === t;

                                        return (
                                            <button
                                                key={t}
                                                type="button"
                                                disabled={disabled}
                                                onClick={() => setSelectedEmploymentType(t)}
                                                className={cx(
                                                    "rounded-full border border-black/10 px-4 py-2 text-[12px] font-extrabold",
                                                    active ? "bg-white text-neutral-950" : "bg-white/70 text-neutral-700",
                                                    disabled && "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                                                )}
                                            >
                                                {disabled ? "Remote (Unavailable)" : t}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-3 text-[12.5px] font-semibold text-neutral-800">
                                Salary ({selectedEmploymentType}):{" "}
                                <span className="font-extrabold">
                                    {selectedEmploymentType === "Remote" && !applyJob.remoteAvailable
                                        ? "Remote unavailable"
                                        : payRangeLabel(applyJob, selectedEmploymentType, currency)}
                                </span>
                                <span className="ml-2 text-[12px] font-semibold text-neutral-600">(Estimated by IP-based currency)</span>
                            </div>
                        </div>

                        <form className="mt-4 grid gap-3" onSubmit={submitApplication}>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Full Name</span>
                                    <input
                                        name="fullName"
                                        required
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                        placeholder="Your full name"
                                    />
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                        placeholder="name@email.com"
                                    />
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Phone</span>
                                    <input
                                        name="phone"
                                        required
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                        placeholder="+234..."
                                    />
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Location</span>
                                    <input
                                        name="location"
                                        required
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                        placeholder="City, Country"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Employment Type</span>
                                    <select
                                        name="employmentType"
                                        required
                                        value={selectedEmploymentType}
                                        onChange={(e) => setSelectedEmploymentType(e.target.value as EmploymentType)}
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                    >
                                        {applyJob.employmentTypes.map((t) => (
                                            <option key={t} value={t} disabled={t === "Remote" && !applyJob.remoteAvailable}>
                                                {t === "Remote" && !applyJob.remoteAvailable ? "Remote (Unavailable)" : t}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-[12px] font-bold text-neutral-700">Preferred Shift</span>
                                    <select
                                        name="shift"
                                        required
                                        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                    >
                                        {applyJob.shifts.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className="grid gap-1">
                                <span className="text-[12px] font-bold text-neutral-700">LinkedIn / Portfolio (optional)</span>
                                <input
                                    name="portfolio"
                                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                    placeholder="https://..."
                                />
                            </label>

                            <label className="grid gap-1">
                                <span className="text-[12px] font-bold text-neutral-700">Cover Note (optional)</span>
                                <textarea
                                    name="coverNote"
                                    rows={4}
                                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                    placeholder="Briefly tell us why you’re a fit..."
                                />
                            </label>

                            <label className="grid gap-1">
                                <span className="text-[12px] font-bold text-neutral-700">Upload CV (required — all file types allowed)</span>
                                <input
                                    name="cv"
                                    required
                                    type="file"
                                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none"
                                />
                            </label>

                            {submitMsg ? (
                                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-[12.5px] font-semibold text-neutral-800">{submitMsg}</div>
                            ) : null}

                            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                                <div className="text-[12px] font-semibold text-neutral-600">Pay shown is estimated by IP-based currency selection.</div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={cx(
                                        "water-btn water-btn-primary inline-flex items-center justify-center px-5 py-3 text-sm font-extrabold",
                                        submitting && "opacity-70"
                                    )}
                                >
                                    {submitting ? "Submitting..." : "Submit Application"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}

            <footer className="pt-10 text-neutral-700">
                <div className="border-t border-black/10 pt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
                        <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </Link>
                        <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </Link>
                        <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">
                            Contact
                        </Link>
                    </div>

                    <div className="mt-5 text-center text-xs font-normal text-neutral-600">
                        © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span> All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
