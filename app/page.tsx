// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter, Space_Grotesk } from "next/font/google";
import ProductPreview from "./components/ProductPreview";
import WaitlistModal from "./components/WaitlistModal";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span
    className={[
      "inline-flex items-center gap-2 rounded-full",
      "border border-black/10 bg-white/95 px-3 py-2",
      "text-xs font-medium text-black/90",
      "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
      "max-w-full",
    ].join(" ")}
  >
    <span className="truncate">{children}</span>
  </span>
);

const BevelCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={["water-bevel", className].join(" ")}>{children}</div>;

const Button = ({
  children,
  onClick,
  href,
  variant = "default",
  fullOnMobile = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
  fullOnMobile?: boolean;
}) => {
  const base =
    "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em]";
  const primary = "water-btn-primary";
  const mobileFull = fullOnMobile ? "w-full sm:w-auto" : "";
  const cls = `${base} ${variant === "primary" ? primary : ""} ${mobileFull}`;

  if (href) {
    return (
      <Link className={cls} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type="button" onClick={onClick}>
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
  <div
    className={["reveal", className].join(" ")}
    style={{ animationDelay: `${delayMs}ms` }}
  >
    {children}
  </div>
);

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div
      className={[
        inter.variable,
        spaceGrotesk.variable,
        "min-h-screen bg-white text-black antialiased",
      ].join(" ")}
      style={{
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* HEADER: compact on mobile, same vibe on desktop */}
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-24px))] items-center justify-between py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* IMPORTANT: ensure the file in /public matches this name EXACTLY.
                Rename your file to: public/6logo.png (lowercase) */}
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl border border-black/10 bg-white p-1 shadow-[10px_10px_22px_rgba(0,0,0,0.10),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
              <Image
                src="/6logo.png"
                alt="6chatting logo"
                fill
                sizes="(max-width: 640px) 40px, 48px"
                className="object-contain"
                priority
              />
            </div>

            <div className="leading-tight min-w-0">
              <div
                className="text-sm font-semibold tracking-[-0.01em] text-black truncate"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6chatting
              </div>
              <div className="text-xs font-medium text-neutral-700 truncate">
                Connect. Translate. Communicate.
              </div>
            </div>
          </Link>

          {/* Mobile: keep nav clean, no wrap mess */}
          <nav className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:block">
              <Button href="#how">How it works</Button>
            </div>

            <Button variant="primary" onClick={() => setWaitlistOpen(true)}>
              Get the app
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-12">
        {/* HERO */}
        <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
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
                6chatting removes language barriers for business, friendship, and
                global connection. Choose your language at sign-up — conversations
                are delivered in the receiver’s language instantly.
              </p>

              {/* Mobile CTA: clean stacked buttons */}
              <div id="download" className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-2">
                <Button
                  variant="primary"
                  onClick={() => setWaitlistOpen(true)}
                  fullOnMobile
                >
                  Download (Coming Soon)
                </Button>

                {/* On mobile, show "How it works" here instead of header */}
                <div className="sm:hidden">
                  <Button href="#how" fullOnMobile>
                    How it works
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Instant chat translation</Pill>
                <Pill>Voice & calling translation</Pill>
                <Pill>Cross-border business friendly</Pill>
                <Pill>Policy-driven safety</Pill>
              </div>
            </BevelCard>
          </FadeIn>

          <FadeIn delayMs={90}>
            <ProductPreview />
          </FadeIn>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="pt-8">
          <FadeIn delayMs={0}>
            <h2
              className="text-lg font-bold tracking-[-0.02em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How 6chatting works
            </h2>
          </FadeIn>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <FadeIn delayMs={60}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  1) Choose your language
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Pick your preferred language at sign-up. Change it anytime in settings.
                  Sign-up using your email, create a unique password, verify your email.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={120}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  2) Chat or call normally
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Start a chat — search for users via their email address. Type or speak
                  naturally. Text translates automatically.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={180}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  3) Delivered in the receiver’s language
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  The receiver automatically gets your text translated in real time. This
                  is the future of communication.
                </p>
              </BevelCard>
            </FadeIn>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="pt-8">
          <FadeIn delayMs={0}>
            <h2
              className="text-lg font-bold tracking-[-0.02em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What’s inside
            </h2>
          </FadeIn>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <FadeIn delayMs={60}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Instant translation chat
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Real-time multilingual messaging for personal and business use.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={120}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Voice + calling translation
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Designed to reduce misunderstanding across languages.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={180}>
              <BevelCard className="p-5 sm:p-6">
                <h3
                  className="text-base font-bold text-black"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Safety and trust
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Public policies, community rules, and anti-fraud protections aligned with the app.
                </p>
              </BevelCard>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER (already good; keep centered) */}
        <footer className="pt-10 text-neutral-700">
          <div className="border-t border-black/10 pt-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
              <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
              <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
              <Link
                href="/policies/subscription-billing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscription & Billing
              </Link>
              <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer">
                Refund & Cancellation
              </Link>
              <Link
                href="/policies/acceptable-use"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acceptable Use
              </Link>
              <Link href="/policies/contact" target="_blank" rel="noopener noreferrer">
                Contact
              </Link>
            </div>

            <div className="mt-5 text-center text-xs font-normal text-neutral-600">
              © {new Date().getFullYear()} 6chatting.{" "}
              <span className="mx-1">A 6clement Joshua Service.</span>
              All rights reserved.
            </div>
          </div>
        </footer>

        <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

        {/* Faster, premium reveal */}
        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(6px);
            animation: reveal-in 360ms ease forwards;
          }
          @keyframes reveal-in {
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal { opacity: 1; transform: none; animation: none; }
          }
        `}</style>

        {/* Typography tokens */}
        <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }
          html {
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </main>
    </div>
  );
}
