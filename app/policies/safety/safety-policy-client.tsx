"use client";

// app/policies/safety/safety-policy-client.tsx
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

type TocItem = { id: string; label: string; badge?: string };

const BRAND = "6chatting";
const SUPPORT_EMAIL = "support@6chatting.com";

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}
function formatISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 shadow-sm">
      {children}
    </span>
  );
}

function Callout({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "info" | "warning";
}) {
  const styles =
    tone === "warning"
      ? "border-amber-200 bg-amber-50/60 text-amber-950"
      : tone === "info"
      ? "border-sky-200 bg-sky-50/60 text-sky-950"
      : "border-neutral-200 bg-white/70 text-neutral-900";

  return (
    <div className={cx("rounded-2xl border p-4 shadow-sm", styles)}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-[14px] leading-[1.75]">{children}</div>
    </div>
  );
}

function PolicyCard({
  id,
  title,
  children,
  rightSlot,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-3xl border border-neutral-200 bg-white/70 shadow-sm backdrop-blur">
        <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-black" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
          {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
        </div>
        <div className="px-5 py-4 text-[14.5px] leading-[1.85] text-neutral-800">{children}</div>
      </div>
    </section>
  );
}

function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/70 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold text-neutral-900">{title}</span>
        <span className="text-[12px] font-semibold text-neutral-500">{open ? "Hide" : "Show"}</span>
      </button>
      {open ? (
        <div className="border-t border-neutral-200 px-4 py-3 text-[14px] leading-[1.75] text-neutral-800">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function RuleList({
  allowed,
  notAllowed,
}: {
  allowed: Array<string>;
  notAllowed: Array<string>;
}) {
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge>Allowed</Badge>
          <span className="text-[13px] font-semibold text-neutral-900">What we support</span>
        </div>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          {allowed.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white/70 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Badge>Not allowed</Badge>
          <span className="text-[13px] font-semibold text-neutral-900">What we remove / restrict</span>
        </div>
        <ul className="mt-2 ml-5 list-disc space-y-1">
          {notAllowed.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SafetyPolicyClient() {
  const prefersReducedMotion = useReducedMotion();
  const lastUpdated = useMemo(() => formatISODate(new Date()), []);

  const toc: TocItem[] = useMemo(
    () => [
      { id: "overview", label: "Overview", badge: "Read first" },
      { id: "who-this-is-for", label: "Who this policy is for" },
      { id: "core-rules", label: "Core safety rules" },
      { id: "harm-illegal", label: "Violence, threats & illegal activity" },
      { id: "harassment", label: "Harassment, bullying & hate" },
      { id: "sexual", label: "Sexual content & exploitation" },
      { id: "children", label: "Child safety & minors", badge: "Critical" },
      { id: "self-harm", label: "Self-harm & crisis guidance", badge: "Sensitive" },
      { id: "privacy-doxxing", label: "Privacy, doxxing & impersonation" },
      { id: "scams", label: "Scams, fraud & financial safety" },
      { id: "extremism", label: "Extremism & violent organizations" },
      { id: "misinfo", label: "Misinformation & manipulation" },
      { id: "translation", label: "Translation safety & context" },
      { id: "reporting", label: "Reporting & user tools" },
      { id: "enforcement", label: "Enforcement & penalties" },
      { id: "appeals", label: "Appeals" },
      { id: "regional", label: "Regional considerations" },
      { id: "law", label: "Law enforcement & legal requests" },
      { id: "updates", label: "Policy updates" },
      { id: "contact", label: "Contact" },
      { id: "faqs", label: "FAQs" },
    ],
    []
  );

  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "overview");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = toc.map((t) => t.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.08, 0.15, 0.22], rootMargin: "-15% 0px -70% 0px" }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [toc]);

  const containerAnim = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Safety Policy",
      url: "https://6chatting.com/policies/safety",
      isPartOf: { "@type": "WebSite", name: BRAND, url: "https://6chatting.com" },
      about: { "@type": "Thing", name: "Online Safety & Community Standards" },
      dateModified: lastUpdated,
      publisher: { "@type": "Organization", name: "6clement Joshua Service" },
    };
  }, [lastUpdated]);

  return (
    <main
      className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-neutral-900 antialiased")}
      style={{
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-neutral-100 blur-3xl" />
        <div className="absolute top-52 right-[-120px] h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
        <div className="absolute top-72 left-[-160px] h-72 w-72 rounded-full bg-neutral-100 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {/* Header */}
        <motion.header {...containerAnim} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-[12px] font-semibold text-neutral-700 shadow-sm backdrop-blur">
            <span className="tracking-[-0.01em]">{BRAND}</span>
            <span className="text-neutral-400">•</span>
            <span>Policy Center</span>
          </div>

          <h1
            className="mt-4 text-3xl font-bold tracking-[-0.03em] text-black sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Safety Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[14.5px] leading-[1.75] text-neutral-600">
            This Safety Policy describes how we work to keep {BRAND} safe for users worldwide, including children and families.
            It complements our{" "}
            <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
              Acceptable Use
            </Link>{" "}
            and{" "}
            <Link className="font-semibold underline underline-offset-2" href="/policies/terms">
              Terms of Service
            </Link>
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <Badge>Last updated: {lastUpdated}</Badge>
            <Badge>Global users</Badge>
            <Badge>Kids protections</Badge>
            <Badge>Reporting & enforcement</Badge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Callout title="Zero tolerance areas" tone="warning">
              We do not allow content involving child sexual exploitation, credible threats of violence, or instructions to commit
              serious wrongdoing. We may remove content, restrict accounts, and report to authorities when legally required.
            </Callout>
            <Callout title="Context matters" tone="info">
              Translation can change meaning. We consider context, user intent, and patterns of behavior. If a translation is
              inaccurate or causes harm, report it so we can review.
            </Callout>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[13px]">
            <Link
              href="/policies/acceptable-use"
              className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
            >
              Acceptable Use
            </Link>
            <Link
              href="/policies/privacy"
              className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/ai-translation"
              className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
            >
              AI & Translation
            </Link>
            <Link
              href="/policies/contact"
              className="rounded-full border border-neutral-200 bg-white/70 px-3 py-1.5 font-semibold text-neutral-800 shadow-sm hover:bg-white"
            >
              Contact
            </Link>
          </div>
        </motion.header>

        {/* Layout */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
          {/* TOC */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-3xl border border-neutral-200 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-neutral-900">On this page</div>
                <a href="#reporting" className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-800">
                  Report something
                </a>
              </div>

              <nav className="mt-3 space-y-1">
                {toc.map((item) => {
                  const active = item.id === activeId;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cx(
                        "flex items-center justify-between gap-3 rounded-2xl px-3 py-2 text-[13px] font-semibold transition",
                        active ? "bg-neutral-900 text-white shadow-sm" : "bg-white/60 text-neutral-800 hover:bg-white"
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                      {item.badge ? (
                        <span className={cx("shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold", active ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-700")}>
                          {item.badge}
                        </span>
                      ) : null}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-4">
                <Callout title="Cross-reference" tone="neutral">
                  Safety standards work together with{" "}
                  <Link className="font-semibold underline underline-offset-2" href="/policies/acceptable-use">
                    Acceptable Use
                  </Link>{" "}
                  (behavior rules) and{" "}
                  <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                    Privacy Policy
                  </Link>{" "}
                  (how data is handled).
                </Callout>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-5">
            <PolicyCard id="overview" title="Overview" rightSlot={<Badge>Safety-first</Badge>}>
              <p>
                Our goal is to create a safe environment for communication and translation across borders. This means:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Reducing harm (abuse, harassment, exploitation, fraud).</li>
                <li>Protecting minors and vulnerable users.</li>
                <li>Preventing misuse of translation/communication tools for wrongdoing.</li>
                <li>Providing clear reporting channels and consistent enforcement.</li>
              </ul>
            </PolicyCard>

            <PolicyCard id="who-this-is-for" title="Who this policy is for" rightSlot={<Badge>Everyone</Badge>}>
              <p>This policy applies to:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>All users worldwide (all countries/regions).</li>
                <li>All content types: chats, calls, usernames, profiles, images, links, and shared files.</li>
                <li>All surfaces: web, mobile apps, and any integrations we provide.</li>
              </ul>
              <div className="mt-4">
                <Callout title="If you see something unsafe" tone="info">
                  Use in-product reporting (where available) or contact <strong>{SUPPORT_EMAIL}</strong> with evidence (screenshots,
                  message IDs, timestamps). See <a className="font-semibold underline underline-offset-2" href="#reporting">Reporting & user tools</a>.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="core-rules" title="Core safety rules" rightSlot={<Badge>Baseline</Badge>}>
              <p>These rules apply everywhere on {BRAND}:</p>
              <RuleList
                allowed={[
                  "Respectful communication across languages and cultures",
                  "Reporting harmful content or suspicious behavior",
                  "Protecting your account and personal information",
                  "Educational discussion of difficult topics (with care and context)",
                ]}
                notAllowed={[
                  "Threats, incitement, or encouragement of violence",
                  "Harassment, hate-based attacks, or targeted bullying",
                  "Sexual exploitation (especially involving minors) — zero tolerance",
                  "Fraud, scams, impersonation, doxxing, or blackmail",
                ]}
              />
              <div className="mt-4">
                <Callout title="Policy priority" tone="warning">
                  In case of conflict, the stricter rule applies. Repeated borderline behavior may be treated as a pattern of abuse.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="harm-illegal" title="Violence, threats & illegal activity" rightSlot={<Badge>Strict</Badge>}>
              <p>We remove or restrict content that includes:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Credible threats of violence, stalking, or harm to people or property.</li>
                <li>Incitement to violence or instructions to plan violent wrongdoing.</li>
                <li>Promotion of serious criminal activity (e.g., weapons trafficking, terrorism-related facilitation).</li>
                <li>Graphic violence intended to shock or glorify harm (context exceptions may apply for news/education).</li>
              </ul>
              <div className="mt-4">
                <Callout title="Emergency guidance" tone="warning">
                  If you believe someone is in immediate danger, contact your local emergency services first. Then report to us so we
                  can review account activity.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="harassment" title="Harassment, bullying & hate" rightSlot={<Badge>Protected groups</Badge>}>
              <p>We do not allow:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Targeted harassment (insults, humiliation, intimidation, repeated unwanted contact).</li>
                <li>Hate speech or degrading content directed at protected groups.</li>
                <li>Calls for exclusion, segregation, or violence against a group.</li>
                <li>Coordinated harassment or dogpiling.</li>
              </ul>
              <div className="mt-4">
                <Callout title="What you can do" tone="info">
                  Block the user, report the content, and avoid escalating. Keep evidence if there is a credible threat.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="sexual" title="Sexual content & exploitation" rightSlot={<Badge>Safety</Badge>}>
              <p>
                We restrict sexual content and remove sexual exploitation. Prohibited categories include:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Any sexual content involving minors (or that appears to involve minors) — immediate removal and escalation.</li>
                <li>Non-consensual sexual content, sexual extortion, or coercion.</li>
                <li>Solicitation of sexual services where unlawful, or exploitative/trafficking-related behavior.</li>
                <li>Sharing intimate images without consent.</li>
              </ul>
              <div className="mt-4">
                <Callout title="If you are a victim" tone="warning">
                  If you are being threatened or blackmailed, preserve evidence, stop engagement, and seek local support resources.
                  Report to us at <strong>{SUPPORT_EMAIL}</strong>.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="children" title="Child safety & minors" rightSlot={<Badge>Critical</Badge>}>
              <p>
                Child safety is a top priority. We prohibit any content that exploits or endangers minors, including grooming,
                sexualization, or attempts to obtain private contact information for abusive purposes.
              </p>

              <RuleList
                allowed={[
                  "Family-safe conversations and supervised use where permitted",
                  "Age-appropriate content and respectful communication",
                  "Parents/guardians reviewing safety settings and usage",
                ]}
                notAllowed={[
                  "Child sexual exploitation material (CSEM) or anything sexual involving minors",
                  "Grooming, luring, or attempts to move minors to off-platform contact",
                  "Requests for nude images, sexual chat, or private meet-ups involving minors",
                  "Targeting minors for scams, coercion, or manipulation",
                ]}
              />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Callout title="Parents/guardians" tone="info">
                  If you suspect a child is at risk, contact local authorities and email <strong>{SUPPORT_EMAIL}</strong> so we can
                  review and take action.
                </Callout>
                <Callout title="Age and consent" tone="warning">
                  Minimum age requirements and consent rules vary by country. Where required by law, we may request parental consent
                  and limit features for minors.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="self-harm" title="Self-harm & crisis guidance" rightSlot={<Badge>Sensitive</Badge>}>
              <p>
                We aim to support user safety. Content that encourages self-harm or provides instructions to self-harm may be removed
                and may trigger safety interventions.
              </p>
              <div className="mt-4">
                <Callout title="If you or someone you know is in crisis" tone="warning">
                  Contact local emergency services or a local crisis hotline immediately. If you share imminent intent to self-harm,
                  we may take steps to protect safety consistent with applicable law.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="privacy-doxxing" title="Privacy, doxxing & impersonation" rightSlot={<Badge>Account safety</Badge>}>
              <p>We prohibit privacy violations and identity misuse, including:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Doxxing (sharing someone’s private info like address, phone number, bank details).</li>
                <li>Impersonation intended to deceive or cause harm (including fake support/admin accounts).</li>
                <li>Blackmail, extortion, or coercion using private information or content.</li>
              </ul>
              <div className="mt-4">
                <Callout title="Protect yourself" tone="info">
                  Use strong passwords, enable device-level protections, and never share OTPs or recovery codes. {BRAND} support will
                  not ask for your password.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="scams" title="Scams, fraud & financial safety" rightSlot={<Badge>Anti-fraud</Badge>}>
              <p>We remove or restrict fraud and scam behavior, including:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Advance-fee scams, fake giveaways, and “urgent money” requests.</li>
                <li>Phishing attempts (links that steal login/payment details).</li>
                <li>Investment scams, impersonation of brands, or fake job offers designed to steal funds.</li>
                <li>Requests for sensitive financial information.</li>
              </ul>
              <div className="mt-4">
                <Callout title="Common warning signs" tone="warning">
                  Pressure, urgency, secrecy, or requests to move the conversation off-platform quickly are common indicators of scam
                  behavior. Report immediately.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="extremism" title="Extremism & violent organizations" rightSlot={<Badge>Not allowed</Badge>}>
              <p>
                We prohibit support for violent extremist organizations, including recruitment, praise, propaganda distribution, or
                facilitation. We may remove content and restrict accounts.
              </p>
            </PolicyCard>

            <PolicyCard id="misinfo" title="Misinformation & manipulation" rightSlot={<Badge>Integrity</Badge>}>
              <p>
                We discourage harmful misinformation that may lead to real-world harm (e.g., dangerous “medical cures,” violence
                incitement, or coordinated deception). Enforcement depends on severity, intent, and impact.
              </p>
              <div className="mt-4">
                <Callout title="What we consider" tone="info">
                  We evaluate credibility, context, whether the claim could cause harm, and whether the user is coordinating
                  manipulation or abuse.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="translation" title="Translation safety & context" rightSlot={<Badge>Cross-language</Badge>}>
              <p>
                Translation can introduce misunderstandings. Our safety approach includes:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Considering context and user intent where language is ambiguous.</li>
                <li>Reviewing reports of harmful translations and improving safety detection.</li>
                <li>Encouraging users to verify sensitive messages (legal, medical, financial) with qualified professionals.</li>
              </ul>
              <div className="mt-4">
                <Callout title="More details" tone="neutral">
                  See{" "}
                  <Link className="font-semibold underline underline-offset-2" href="/policies/ai-translation">
                    AI & Translation
                  </Link>{" "}
                  for AI usage, limitations, and responsibility guidance.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="reporting" title="Reporting & user tools" rightSlot={<Badge>Report</Badge>}>
              <p>You can help keep the platform safe by using these tools:</p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li><strong>Report:</strong> flag content, profiles, or messages for review.</li>
                <li><strong>Block:</strong> stop someone from contacting you.</li>
                <li><strong>Mute:</strong> reduce unwanted notifications.</li>
                <li><strong>Safety tips:</strong> avoid clicking unknown links or sharing sensitive info.</li>
              </ul>
              <div className="mt-4">
                <Callout title="How to send a good report" tone="info">
                  Include what happened, who was involved, dates/times, and any screenshots or message identifiers. Email{" "}
                  <strong>{SUPPORT_EMAIL}</strong> if in-product reporting is unavailable.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="enforcement" title="Enforcement & penalties" rightSlot={<Badge>Consistent</Badge>}>
              <p>
                Enforcement depends on severity, intent, repetition, and user risk. Actions may include:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>Content removal or reduced visibility.</li>
                <li>Warnings and feature restrictions (e.g., messaging limits).</li>
                <li>Temporary suspensions.</li>
                <li>Permanent bans for severe or repeated violations.</li>
              </ul>
              <div className="mt-4">
                <Callout title="Child exploitation and credible violence threats" tone="warning">
                  These categories may result in immediate restriction and escalation, including reporting to relevant authorities
                  where legally required.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="appeals" title="Appeals" rightSlot={<Badge>Fair review</Badge>}>
              <p>
                If you believe we took action in error, you may request a review by contacting <strong>{SUPPORT_EMAIL}</strong>. Provide:
              </p>
              <ul className="mt-3 ml-5 list-disc space-y-2">
                <li>The account email/username</li>
                <li>What action occurred and when</li>
                <li>Why you believe it was incorrect</li>
                <li>Any supporting evidence</li>
              </ul>
            </PolicyCard>

            <PolicyCard id="regional" title="Regional considerations" rightSlot={<Badge>Global</Badge>}>
              <p>
                Laws and cultural norms differ by region. We apply global baseline safety rules and may apply additional restrictions
                where required by local law or platform risk assessments.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Callout title="EU/UK-style safety expectations" tone="neutral">
                  We aim to provide reporting and safety processes consistent with emerging online safety expectations, including
                  transparency and risk-based mitigation where applicable.
                </Callout>
                <Callout title="Local law compliance" tone="neutral">
                  If a country requires specific removal or preservation obligations, we will comply to the extent required and
                  lawful, while protecting user rights where possible.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="law" title="Law enforcement & legal requests" rightSlot={<Badge>Due process</Badge>}>
              <p>
                We may respond to valid legal requests from authorities where required by law. We evaluate requests for legality and
                scope, and we may push back on overbroad demands where appropriate.
              </p>
              <div className="mt-4">
                <Callout title="Privacy cross-reference" tone="info">
                  See{" "}
                  <Link className="font-semibold underline underline-offset-2" href="/policies/privacy">
                    Privacy Policy
                  </Link>{" "}
                  for how we handle legal requests and data retention in more detail.
                </Callout>
              </div>
            </PolicyCard>

            <PolicyCard id="updates" title="Policy updates" rightSlot={<Badge>Versioned</Badge>}>
              <p>
                We may update this Safety Policy to reflect product changes, legal requirements, and new safety risks. Updates will
                be posted here with a revised date. Material changes may include additional notice where required.
              </p>
            </PolicyCard>

            <PolicyCard id="contact" title="Contact" rightSlot={<Badge>Safety help</Badge>}>
              <p>
                For safety reports, urgent abuse concerns, or appeals, contact:
              </p>
              <div className="mt-3 rounded-2xl border border-neutral-200 bg-white/70 p-4">
                <p className="text-[13px] font-semibold text-neutral-900">Email</p>
                <p className="mt-1">
                  <a className="font-semibold underline underline-offset-2" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                </p>
                <p className="mt-2 text-neutral-600">
                  Use “Safety Report” or “Appeal” in the subject, include your username and relevant evidence.
                </p>
              </div>
            </PolicyCard>

            <section id="faqs" className="scroll-mt-28">
              <div className="rounded-3xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-[15px] font-semibold text-black" style={{ fontFamily: "var(--font-display)" }}>
                    FAQs
                  </h2>
                  <Badge>Helpful</Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <Disclosure title="How fast do you respond to reports?">
                    Response time depends on severity and volume. High-risk categories (credible threats, child safety, extortion)
                    are prioritized for faster review.
                  </Disclosure>

                  <Disclosure title="Do you read everyone’s messages?">
                    We do not review messages by default for curiosity. We may process content to deliver features (translation,
                    delivery) and review content when reported or when needed to prevent abuse and protect safety, consistent with law.
                  </Disclosure>

                  <Disclosure title="What happens if someone impersonates me?">
                    Report the account with evidence (profile link, screenshots). We may remove the impersonation and restrict the
                    account, especially where deception or harm is involved.
                  </Disclosure>

                  <Disclosure title="How do you protect children?">
                    We enforce strict prohibitions on exploitation, grooming, and sexual content involving minors, and we may restrict
                    features for minors where required. Parents can report concerns to {SUPPORT_EMAIL}.
                  </Disclosure>
                </div>
              </div>
            </section>

            <footer className="pt-6 text-center text-xs text-neutral-500">
              © {new Date().getFullYear()} {BRAND}. A 6clement Joshua Service.
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
