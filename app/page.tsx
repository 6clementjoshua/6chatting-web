"use client";

import { useState } from "react";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import ProductPreview from "./components/ProductPreview";
import WaitlistModal from "./components/WaitlistModal";

// Premium pairing:
// - Inter for body (clean, highly legible)
// - Space Grotesk for headings/brand (modern, premium tech)
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
      "border border-black/10 bg-white/90 px-3 py-2",
      "text-xs font-medium text-black/90",
      "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
    ].join(" ")}
  >
    {children}
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
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}) => {
  // Premium tweak: avoid extra-heavy weight everywhere; keep crisp, slightly tracked.
  const base =
    "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em]";
  const primary = "water-btn-primary";
  const cls = `${base} ${variant === "primary" ? primary : ""}`;

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
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-32px))] items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/6logo.png"
              alt="6chatting logo"
              className="h-12 w-12 rounded-2xl border border-black/10 bg-white object-contain p-1 shadow-[10px_10px_22px_rgba(0,0,0,0.10),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
            />

            <div className="leading-tight">
              <div
                className="text-sm font-semibold tracking-[-0.01em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6chatting
              </div>
              <div className="text-xs font-medium text-neutral-700">
                Connect. Translate. Communicate.
              </div>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <Button href="#how">How it works</Button>

            <Button variant="primary" onClick={() => setWaitlistOpen(true)}>
              Get the app
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-[min(1120px,calc(100%-32px))] pb-12">
        <section className="grid gap-4 pt-10 md:grid-cols-[1.05fr_.95fr]">
          <FadeIn delayMs={0}>
            <BevelCard className="p-7">
              <Pill>Real-time translation • Text + Voice + Calls</Pill>

              <h1
                className="mt-4 text-[clamp(32px,4.2vw,54px)] font-extrabold leading-[1.03] tracking-[-0.045em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Chat in your language.
                <br />
                They receive it in theirs.
              </h1>

              {/* Premium tweak: use normal/medium weight for body copy, not semibold everywhere */}
              <p className="mt-3 max-w-xl text-[15.5px] font-normal leading-[1.75] text-neutral-700">
                6chatting removes language barriers for business, friendship, and
                global connection. Choose your language at sign-up — conversations
                are delivered in the receiver’s language instantly.
              </p>

              <div id="download" className="mt-6 flex flex-wrap gap-2">
                <Button variant="primary" onClick={() => setWaitlistOpen(true)}>
                  Download (Coming Soon)
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Instant chat translation</Pill>
                <Pill>Voice & calling translation</Pill>
                <Pill>Cross-border business friendly</Pill>
                <Pill>Policy-driven safety</Pill>
              </div>
            </BevelCard>
          </FadeIn>

          <FadeIn delayMs={120}>
            <ProductPreview />
          </FadeIn>
        </section>

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
            <FadeIn delayMs={80}>
              <BevelCard className="p-6">
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

            <FadeIn delayMs={140}>
              <BevelCard className="p-6">
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

            <FadeIn delayMs={200}>
              <BevelCard className="p-6">
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
            <FadeIn delayMs={80}>
              <BevelCard className="p-6">
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

            <FadeIn delayMs={140}>
              <BevelCard className="p-6">
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

            <FadeIn delayMs={200}>
              <BevelCard className="p-6">
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

        <footer className="pt-10 text-neutral-700">
          <div className="border-t border-black/10 pt-6">
            {/* Policies */}
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              <Link
                href="/policies/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Terms of Service
              </Link>

              <Link
                href="/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Privacy Policy
              </Link>

              <Link
                href="/policies/subscription-billing"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Subscription & Billing
              </Link>

              <Link
                href="/policies/refunds"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Refund & Cancellation
              </Link>

              <Link
                href="/policies/acceptable-use"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Acceptable Use
              </Link>

              <Link
                href="/policies/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:no-underline"
              >
                Contact
              </Link>
            </div>

            {/* Trademark */}
            <div className="mt-5 text-center text-xs font-normal text-neutral-600">
              © {new Date().getFullYear()} 6chatting.
              <span className="mx-1">A 6clement Joshua Service.</span>
              All rights reserved.
            </div>
          </div>
        </footer>


        <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(8px);
            animation: reveal-in 520ms ease forwards;
          }
          @keyframes reveal-in {
            to { opacity: 1; transform: translateY(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal { opacity: 1; transform: none; animation: none; }
          }
        `}</style>

        {/* Consistent typography tokens */}
        <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }
          /* Premium defaults */
          html {
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </main>
    </div>
  );
}
