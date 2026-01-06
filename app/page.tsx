// app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

/** Premium desktop links (shown on md+) */
const DESKTOP_NAV = [
  { label: "Personal", href: "/personal" },
  { label: "Business", href: "/business" },
  { label: "Blog", href: "/blog" },
  { label: "Help Center", href: "/help" },
  { label: "Jobs", href: "/jobs" },

  // Extra buttons that fit 6chatting and your Premier/Premium flow:
  { label: "Pricing", href: "/pricing" }, // Premier & Premium plans live here
  { label: "Status", href: "/status" }, // trust + transparency
  { label: "Developers", href: "/developers" }, // APIs/SDK in future (also signals “serious product”)
];

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function useOnClickOutside(
  refs: React.RefObject<any>[],
  handler: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const isInside = refs.some((r) => r.current && (r.current as Node).contains(target));
      if (!isInside) handler();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [refs, handler, enabled]);
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span
    className={cx(
      "inline-flex items-center gap-2 rounded-full",
      "border border-black/10 bg-white/95 px-3 py-2",
      "text-xs font-medium text-black/90",
      "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
      "max-w-full"
    )}
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
}) => <div className={cx("water-bevel", className)}>{children}</div>;

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
    <button
      className={cls}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
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
    className={cx("reveal", className)}
    style={{ animationDelay: `${delayMs}ms` }}
  >
    {children}
  </div>
);

/** Simple inline SVG icons (no extra deps) */
function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClose({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Close menu on outside click / touch
  useOnClickOutside([menuPanelRef, menuBtnRef], () => setMenuOpen(false), menuOpen);

  // Close menu on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  return (
    <div
      className={cx(
        inter.variable,
        spaceGrotesk.variable,
        "min-h-screen bg-white text-black antialiased"
      )}
      style={{
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* HEADER: compact & premium on mobile, full nav on desktop */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-24px))] items-center justify-between py-3 sm:py-4">
          {/* Left: logo + wordmark */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl border border-black/10 bg-white p-1 shadow-[10px_10px_22px_rgba(0,0,0,0.10),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
              <Image
                src="/6logo.PNG"
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

          {/* Center: desktop nav (md+) */}
          <nav className="hidden md:flex items-center gap-2">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-3 py-2 text-sm font-semibold text-neutral-800",
                  "rounded-full border border-black/10 bg-white/80",
                  "shadow-[6px_6px_14px_rgba(0,0,0,0.08),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
                  "hover:bg-white focus:outline-none focus:ring-2 focus:ring-black/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop: keep "How it works" + Get the app */}
            <div className="hidden sm:block">
              <Button href="#how">How it works</Button>
            </div>

            <Button
              variant="primary"
              onClick={() => setWaitlistOpen(true)}
              className="get-app-btn"
            >
              Get the app
            </Button>

            {/* Mobile: menu button (smaller, premium) */}
            <button
              ref={menuBtnRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => setMenuOpen((s) => !s)}
              className={cx(
                "md:hidden",
                "inline-flex items-center justify-center",
                "h-10 w-10 rounded-2xl border border-black/10 bg-white/90",
                "shadow-[10px_10px_22px_rgba(0,0,0,0.10),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                "active:scale-[0.98] transition-transform"
              )}
            >
              {menuOpen ? (
                <IconClose className="text-black/80" />
              ) : (
                <IconMenu className="text-black/80" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={cx(
            "md:hidden",
            menuOpen ? "pointer-events-auto" : "pointer-events-none"
          )}
          aria-hidden={!menuOpen}
        >
          {/* Backdrop */}
          <div
            className={cx(
              "fixed inset-0 z-20 bg-black/20 backdrop-blur-[2px] transition-opacity",
              menuOpen ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Panel */}
          <div
            id="mobile-menu-panel"
            ref={menuPanelRef}
            className={cx(
              "fixed left-1/2 top-[68px] z-30 w-[min(560px,calc(100%-24px))] -translate-x-1/2",
              "rounded-[28px] border border-black/10 bg-white/92 backdrop-blur-md",
              "shadow-[18px_18px_40px_rgba(0,0,0,0.12),_-18px_-18px_40px_rgba(255,255,255,0.95)]",
              "transition-all duration-200",
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          >
            <div className="p-3">
              {/* Top row: quick actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  href="#how"
                  className="w-full py-2.5"
                  ariaLabel="Go to how it works"
                  onClick={() => setMenuOpen(false)}
                >
                  How it works
                </Button>
                <Button
                  href="/pricing"
                  className="w-full py-2.5"
                  ariaLabel="View pricing"
                  onClick={() => setMenuOpen(false)}
                >
                  Pricing
                </Button>
              </div>

              {/* Links */}
              <div className="mt-2 grid gap-2">
                {DESKTOP_NAV.filter((x) => x.href !== "/pricing").map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cx(
                      "flex items-center justify-between gap-3",
                      "rounded-2xl border border-black/10 bg-white/90 px-4 py-3",
                      "text-sm font-semibold text-neutral-900",
                      "shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]",
                      "active:scale-[0.99] transition-transform"
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="text-neutral-500">›</span>
                  </Link>
                ))}
              </div>

              {/* Bottom: legal */}
              <div className="mt-3 rounded-2xl border border-black/10 bg-white/80 p-3">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-neutral-700">
                  <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                    Terms
                  </Link>
                  <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy
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
              </div>
            </div>
          </div>
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
                6chatting removes language barriers for business, friendship, and global
                connection. Choose your language at sign-up — conversations are delivered
                in the receiver’s language instantly.
              </p>

              {/* CTA */}
              <div id="download" className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-2">
                <Button
                  variant="primary"
                  onClick={() => setWaitlistOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Download (Coming Soon)
                </Button>

                <div className="sm:hidden">
                  <Button href="#how" className="w-full" onClick={() => setMenuOpen(false)}>
                    How it works
                  </Button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Instant chat translation</Pill>
                <Pill>Voice & calling translation</Pill>
                <Pill>Cross-border business friendly</Pill>
                <Pill>Premier & Premium plans</Pill>
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
                  Public policies, community rules, and anti-fraud protections aligned with
                  the app.
                </p>
              </BevelCard>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
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
              © {year} 6chatting. <span className="mx-1">A 6clement Joshua Service.</span>
              All rights reserved.
            </div>
          </div>
        </footer>

        <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

        {/* Animations */}
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

        {/* Global: fonts + premium iOS-safe touch + mobile header spacing */}
        <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }

          html {
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
          }

          /* iOS/Safari polish */
          button,
          a {
            -webkit-tap-highlight-color: transparent;
          }

          /* ✅ Mobile-only: smaller pill button for header CTA */
          @media (max-width: 640px) {
            .get-app-btn {
              padding: 8px 14px !important;
              font-size: 13px !important;
              border-radius: 999px !important;
              min-height: auto !important;
            }
          }
        `}</style>
      </main>
    </div>
  );
}
