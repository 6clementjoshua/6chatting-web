// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import ProductPreview from "./components/ProductPreview";
import WaitlistModal from "./components/WaitlistModal";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });

const FEATURE_PILLS = [
  "Instant chat translation",
  "Voice & calling translation",
  "Cross-border business friendly",
  "Premier & Premium plans",
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

      <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-12">
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
                6chatting removes language barriers for business, friendship, and global connection. Choose your language
                at sign-up — conversations are delivered in the receiver’s language instantly.
              </p>

              <div id="download" className="mt-6 grid gap-2">
                <Button
                  variant="primary"
                  onClick={() => setWaitlistOpen(true)}
                  className="w-full max-w-[720px] mx-auto"
                >
                  Download Now
                </Button>

                {/* ✅ Only "How it works" control (mobile CTA under Download) */}
                <div className="sm:hidden">
                  <Button
                    href="#how"
                    className="w-full"
                    onClick={() => scrollToId("how")}
                    ariaLabel="Scroll to How it works"
                  >
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

        <section id="how" className="pt-8 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2 className="text-lg font-bold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
              How 6chatting works
            </h2>
          </FadeIn>

          {/* Keep the rest of your sections exactly as they are below */}
          {/* ... */}
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

        {/* ✅ Keep the waitlist here ONLY if your global Header does NOT include it.
            If Header.tsx already contains <WaitlistModal />, remove the modal below to avoid duplicates. */}
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
