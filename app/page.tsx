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
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
  className?: string;
}) => {
  const base =
    "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em]";
  const primary = "water-btn-primary";
  const cls = `${base} ${variant === "primary" ? primary : ""} ${className}`;

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
    <div className={[inter.variable, spaceGrotesk.variable].join(" ")}>
      <div className="page-shell">
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand">
              <div className="brand-logo">
                {/* IMPORTANT: your file name in /public must match this EXACTLY */}
                <Image
                  src="/6logo.PNG"
                  alt="6chatting logo"
                  fill
                  sizes="(max-width: 640px) 40px, 48px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="brand-text">
                <div className="brand-name">6chatting</div>
                <div className="brand-tagline">Connect. Translate. Communicate.</div>
              </div>
            </Link>

            <nav className="nav-actions">
              <div className="hide-on-mobile">
                <Button href="#how">How it works</Button>
              </div>

              {/* ✅ VERY SMALL on mobile */}
              <Button
                variant="primary"
                onClick={() => setWaitlistOpen(true)}
                className="get-app-btn"
              >
                Get the app
              </Button>
            </nav>
          </div>
        </header>

        <main className="container main">
          <section className="hero">
            <FadeIn delayMs={0}>
              <BevelCard className="p-5 sm:p-7">
                <Pill>Real-time translation • Text + Voice + Calls</Pill>

                <h1 className="hero-title">
                  Chat in your language.
                  <br />
                  They receive it in theirs.
                </h1>

                <p className="hero-copy">
                  6chatting removes language barriers for business, friendship, and
                  global connection. Choose your language at sign-up — conversations
                  are delivered in the receiver’s language instantly.
                </p>

                <div id="download" className="hero-cta">
                  <Button
                    variant="primary"
                    onClick={() => setWaitlistOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    Download (Coming Soon)
                  </Button>

                  <div className="mobile-only">
                    <Button href="#how" className="w-full">
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

          <section id="how" className="pt-8">
            <FadeIn delayMs={0}>
              <h2 className="section-title">How 6chatting works</h2>
            </FadeIn>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <FadeIn delayMs={60}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">1) Choose your language</h3>
                  <p className="card-copy">
                    Pick your preferred language at sign-up. Change it anytime in settings.
                    Sign-up using your email, create a unique password, verify your email.
                  </p>
                </BevelCard>
              </FadeIn>

              <FadeIn delayMs={120}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">2) Chat or call normally</h3>
                  <p className="card-copy">
                    Start a chat — search for users via their email address. Type or speak
                    naturally. Text translates automatically.
                  </p>
                </BevelCard>
              </FadeIn>

              <FadeIn delayMs={180}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">3) Delivered in the receiver’s language</h3>
                  <p className="card-copy">
                    The receiver automatically gets your text translated in real time. This
                    is the future of communication.
                  </p>
                </BevelCard>
              </FadeIn>
            </div>
          </section>

          <section className="pt-8">
            <FadeIn delayMs={0}>
              <h2 className="section-title">What’s inside</h2>
            </FadeIn>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <FadeIn delayMs={60}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">Instant translation chat</h3>
                  <p className="card-copy">
                    Real-time multilingual messaging for personal and business use.
                  </p>
                </BevelCard>
              </FadeIn>

              <FadeIn delayMs={120}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">Voice + calling translation</h3>
                  <p className="card-copy">
                    Designed to reduce misunderstanding across languages.
                  </p>
                </BevelCard>
              </FadeIn>

              <FadeIn delayMs={180}>
                <BevelCard className="p-5 sm:p-6">
                  <h3 className="card-title">Safety and trust</h3>
                  <p className="card-copy">
                    Public policies, community rules, and anti-fraud protections aligned with the app.
                  </p>
                </BevelCard>
              </FadeIn>
            </div>
          </section>

          <footer className="site-footer">
            <div className="footer-inner">
              <div className="footer-links">
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

              <div className="footer-copy">
                © {new Date().getFullYear()} 6chatting. A 6clement Joshua Service. All rights reserved.
              </div>
            </div>
          </footer>

          <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

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
        </main>
      </div>
    </div>
  );
}
