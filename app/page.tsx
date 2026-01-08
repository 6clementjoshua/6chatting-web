// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import ProductPreview from "./components/ProductPreview";
import WaitlistModal from "./components/WaitlistModal";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

const FEATURE_PILLS = [
  "Instant chat translation",
  "Voice & calling translation",
  "Cross-border business friendly",
  "Personal & Business Premium plans",
];

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span
    className={cx(
      "inline-flex items-center justify-center rounded-full",
      "border border-black/10 bg-white/95 px-3 py-2",
      "text-xs font-medium text-black/90",
      "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
      "max-w-full",
      className
    )}
  >
    <span className="truncate">{children}</span>
  </span>
);

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
  children,
  onClick,
  href,
  variant = "default",
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
  className?: string;
  ariaLabel?: string;
}) => {
  const base =
    "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
  const primary = "water-btn-primary";
  const cls = cx(base, variant === "primary" && primary, className);

  if (href) {
    return (
      <Link className={cls} href={href} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type="button" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

const FadeIn = ({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) => (
  <div className={cx("reveal", className)} style={{ animationDelay: `${delayMs}ms` }}>
    {children}
  </div>
);

function FeatureCard({
  id,
  title,
  summary,
  imageSrc,
  imageAlt,
  learnMoreLabel = "Learn more",
  learnMoreHref,
  hideLearnMore = false,
  imageBoxClassName = "",
  imageSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 560px",
}: {
  id?: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreLabel?: string;
  learnMoreHref?: string; // ✅ NEW: route to another page
  hideLearnMore?: boolean;
  imageBoxClassName?: string;
  imageSizes?: string;
}) {
  return (
    <BevelCard className="p-4 sm:p-5">
      {id ? <div id={id} className="scroll-mt-28" /> : null}

      <div className="flex flex-col gap-4">
        <div
          className={cx(
            "relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white",
            "h-[220px] sm:h-[260px]",
            imageBoxClassName
          )}
        >
          <Image src={imageSrc} alt={imageAlt} fill className="object-contain" sizes={imageSizes} />
        </div>

        <div className="flex flex-col gap-2">
          <h3
            className="text-[15px] sm:text-base font-extrabold tracking-[-0.02em] text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </h3>

          <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">{summary}</p>

          {!hideLearnMore ? (
            <div className="pt-1">
              <Button
                href={learnMoreHref || "/"}
                ariaLabel={learnMoreLabel}
                className="w-full sm:w-fit"
              >
                {learnMoreLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </BevelCard>
  );
}

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div
      className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-black antialiased")}
      style={{
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* ✅ Header removed: now handled globally in app/layout.tsx via <Header /> */}

      <main
        className={cx("mx-auto w-[min(1120px,calc(100%-24px))] pb-12", "pt-16 sm:pt-18 md:pt-20")}
        style={{ paddingTop: "calc(var(--header-h, 64px) + 2px)" }}
      >
        {/* ✅ FIRST AFTER HEADER: Multi-device hero (must never crop) */}
        <section className="-mt-2 sm:-mt-3">
          <FadeIn delayMs={0}>
            <BevelCard className="p-5 sm:p-7">
              <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[min(46vh,440px)] sm:h-[min(48vh,520px)]">
                <Image
                  src="/images/multi-device-chat.png"
                  alt="6chatting multi-device chat on phone, tablet, and laptop"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1120px"
                />
              </div>

              <div className="mt-5 text-center">
                <h2
                  className="text-[clamp(22px,3.6vw,34px)] font-extrabold leading-[1.12] tracking-[-0.04em] text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Connect. Translate. Communicate.
                </h2>
                <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                  A premium translation chat experience across phone, tablet, and desktop — built for modern global
                  conversations.
                </p>
              </div>
            </BevelCard>
          </FadeIn>
        </section>

        {/* ✅ Global languages hero card (Learn more now goes to its own page) */}
        <section className="pt-5 sm:pt-6">
          <FadeIn delayMs={40}>
            <BevelCard className="p-5 sm:p-7">
              <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr] md:items-center">
                <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[240px] sm:h-[300px]">
                  <Image
                    src="/images/global-languages-support.png"
                    alt="Global language support illustration with flags and translation icon"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 720px"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    className="text-[clamp(18px,2.2vw,24px)] font-extrabold tracking-[-0.03em] text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Global language support
                  </h3>
                  <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                    See the languages 6chatting supports and how real-time translation works across regions — designed to
                    keep conversations natural, accurate, and instant.
                  </p>

                  <div className="pt-1">
                    <Button href="/learn/languages" ariaLabel="Learn more about language support">
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
            </BevelCard>
          </FadeIn>
        </section>

        {/* ✅ Hero + Product Preview */}
        <section className="grid gap-4 pt-6 sm:pt-8 md:grid-cols-[1.05fr_.95fr]">
          <FadeIn delayMs={0}>
            <BevelCard className="p-5 sm:p-7">
              <Pill>Real-time translation • Text + Voice + Calls</Pill>

              <h1
                className="mt-4 text-[clamp(28px,6vw,54px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Chat in your language.
                <br />
                They receive it in theirs.
              </h1>

              <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700">
                6chatting removes language barriers for business, friendship, and global connection. Choose your language
                at sign-up — conversations are delivered in the receiver’s language instantly.
              </p>

              <div id="download" className="mt-6 grid gap-2">
                <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full max-w-[720px] mx-auto">
                  Download Now
                </Button>

                <div className="sm:hidden">
                  <Button href="#how" className="w-full" onClick={() => scrollToId("how")} ariaLabel="Scroll to How it works">
                    How it works
                  </Button>
                </div>
              </div>

              <div className="mt-5 v-pills-all">
                {FEATURE_PILLS.map((txt) => (
                  <Pill key={txt} className="v-pill">
                    {txt}
                  </Pill>
                ))}
              </div>
            </BevelCard>
          </FadeIn>

          <FadeIn delayMs={90}>
            <ProductPreview />
          </FadeIn>
        </section>

        {/* ✅ After Product Preview: Know your users (Learn more -> its own page) */}
        <section id="know-your-users" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2
              className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Know your users
            </h2>
            <p className="mt-2 max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
              Verification helps people trust who they are chatting with. Ticks clearly indicate account type and verification
              level — so users can communicate with confidence.
            </p>
          </FadeIn>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FadeIn delayMs={40}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="verify-personal"
                  title="Personal verification (Blue tick)"
                  summary="Blue tick confirms an individual identity. Best for creators, professionals, and everyday users who want trusted interactions."
                  imageSrc="/images/verify-personal-blue.png"
                  imageAlt="Personal verification blue tick on profile screen"
                  learnMoreHref="/learn/verification/personal"
                  imageBoxClassName="h-[190px] sm:h-[210px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>

            <FadeIn delayMs={70}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="verify-business-white"
                  title="Business verification (White tick)"
                  summary="White tick is for verified businesses. Ideal for brands that need a credible presence and professional customer conversations."
                  imageSrc="/images/verify-business-white.png"
                  imageAlt="Business verification white tick on profile screen"
                  learnMoreHref="/learn/verification/business-white"
                  imageBoxClassName="h-[190px] sm:h-[210px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>

            <FadeIn delayMs={100}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="verify-business-gold"
                  title="Business verification (Gold tick)"
                  summary="Gold tick is premium business verification. Built for higher-trust commerce, partnerships, and cross-border communication."
                  imageSrc="/images/verify-business-gold.png"
                  imageAlt="Business verification gold tick on profile screen"
                  learnMoreHref="/learn/verification/business-gold"
                  imageBoxClassName="h-[190px] sm:h-[210px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>

            <FadeIn delayMs={130}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="verify-government"
                  title="Government verification (Black tick)"
                  summary="Black tick is reserved for verified government/public institutions. Enhanced requirements apply and additional fields may be requested."
                  imageSrc="/images/verify-government-black.png"
                  imageAlt="Government verification black tick on profile screen"
                  learnMoreHref="/learn/verification-government"
                  imageBoxClassName="h-[190px] sm:h-[210px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ✅ Remaining images (Learn more -> their own pages) */}
        <section id="more-translation" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2
              className="text-[clamp(18px,3vw,26px)] font-extrabold tracking-[-0.04em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Translation that fits how people communicate
            </h2>
            <p className="mt-2 max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
              Whether you type or speak, 6chatting keeps the conversation flowing naturally across languages.
            </p>
          </FadeIn>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FadeIn delayMs={60}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="voice-translation"
                  title="Voice & calling translation"
                  summary="Speak normally and let 6chatting translate in real-time. Perfect for meetings, travel, sales calls, and international teams."
                  imageSrc="/images/voice-translation-devices.png"
                  imageAlt="Voice translation on mobile and laptop devices"
                  learnMoreHref="/learn/voice-calls"
                  imageBoxClassName="h-[210px] sm:h-[240px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>

            <FadeIn delayMs={90}>
              <div className="mx-auto w-full max-w-[560px]">
                <FeatureCard
                  id="dual-text"
                  title="Dual-language text bubbles"
                  summary="Messages display clearly with translation status, so both sides understand what was sent and what was translated."
                  imageSrc="/images/text-translation-dual.png"
                  imageAlt="Two phones showing text translated from English to Chinese"
                  learnMoreHref="/learn/text-bubbles"
                  imageBoxClassName="h-[210px] sm:h-[240px]"
                  imageSizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 520px"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Existing How section stays */}
        <section id="how" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2 className="text-lg font-bold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
              How 6chatting works
            </h2>
          </FadeIn>
          {/* ... keep your existing How content ... */}
        </section>

        <footer className="pt-10 text-neutral-700">
          <div className="border-t border-black/10 pt-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[12px] font-semibold">
              <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
              <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
              <Link href="/policies/subscription-billing" target="_blank" rel="noopener noreferrer">
                Subscription & Billing
              </Link>
              <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer">
                Refund & Cancellation
              </Link>
              <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                Acceptable Use
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

        <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

        <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }

          .v-pills-all {
            display: grid;
            justify-items: center;
            gap: 10px;
          }
          .v-pills-all .v-pill:nth-child(1) {
            width: min(720px, 98%);
          }
          .v-pills-all .v-pill:nth-child(2) {
            width: min(680px, 92%);
          }
          .v-pills-all .v-pill:nth-child(3) {
            width: min(640px, 86%);
          }
          .v-pills-all .v-pill:nth-child(4) {
            width: min(600px, 80%);
          }

          @media (max-width: 640px) {
            .v-pills-all .v-pill:nth-child(1) {
              width: 96%;
            }
            .v-pills-all .v-pill:nth-child(2) {
              width: 90%;
            }
            .v-pills-all .v-pill:nth-child(3) {
              width: 84%;
            }
            .v-pills-all .v-pill:nth-child(4) {
              width: 78%;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
