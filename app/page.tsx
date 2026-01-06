// app/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter, Space_Grotesk } from "next/font/google";
import ProductPreview from "./components/ProductPreview";
import WaitlistModal from "./components/WaitlistModal";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const DESKTOP_NAV = [
  { label: "Personal", href: "/personal" },
  { label: "Business", href: "/business" },
  { label: "Blog", href: "/blog" },
  { label: "Help Center", href: "/help" },
  { label: "Jobs", href: "/jobs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Status", href: "/status" },
  { label: "Developers", href: "/developers" },
];

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function useOnClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const isInside = refs.some((r) => r.current && r.current.contains(target));
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

function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
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
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDownloadSolid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4.01 4.01a1 1 0 0 1-1.38 0L7.3 11.71a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const year = useMemo(() => new Date().getFullYear(), []);

  useOnClickOutside([menuPanelRef, menuBtnRef], () => setMenuOpen(false), menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
      className={cx(inter.variable, spaceGrotesk.variable, "min-h-screen bg-white text-black antialiased")}
      style={{
        fontFamily:
          "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-md">
        {/* ✅ Use a 3-column grid so nothing overlaps the tagline/nav/buttons */}
        <div className="mx-auto grid w-[min(1120px,calc(100%-24px))] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 sm:py-4">
          {/* Left: logo + wordmark (allowed to shrink, always truncates) */}
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
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

            {/* ✅ Hard cap width so tagline never gets covered */}
            <div className="min-w-0 max-w-[210px] sm:max-w-[260px] lg:max-w-[320px] leading-tight">
              <div
                className="truncate text-sm font-semibold tracking-[-0.01em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6chatting
              </div>
              <div className="truncate text-xs font-medium text-neutral-700">
                Connect. Translate. Communicate.
              </div>
            </div>
          </Link>

          {/* Center: desktop nav (md+) — scrolls if tight, never overlaps left/right */}
          <nav className="hidden min-w-0 md:block">
            <div className="flex min-w-0 items-center justify-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
              {DESKTOP_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="nav-pill">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-2">
            {/* ✅ Desktop: make “How it works” same size as nav pills */}
            <Link href="#how" className="hidden sm:inline-flex how-pill">
              How it works
            </Link>

            {/* Mobile: download icon instead of text */}
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              aria-label="Download / Get the app"
              className={cx(
                "sm:hidden",
                "inline-flex items-center justify-center",
                "h-10 w-10 rounded-full",
                "border border-black/15 bg-white",
                "active:scale-[0.98] transition-transform"
              )}
            >
              <IconDownloadSolid className="text-black" />
            </button>

            {/* Desktop: keep primary CTA */}
            <div className="hidden sm:block">
              <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="get-app-btn">
                Get the app
              </Button>
            </div>

            {/* Mobile menu button — flat, always clickable */}
            <button
              ref={menuBtnRef}
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => setMenuOpen((s) => !s)}
              className={cx(
                "md:hidden",
                "relative z-[60]",
                "inline-flex items-center justify-center",
                "h-10 w-10 rounded-2xl border border-black/15 bg-white",
                "active:scale-[0.98] transition-transform"
              )}
            >
              {menuOpen ? <IconClose className="text-black/80" /> : <IconMenu className="text-black/80" />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div className={cx("md:hidden", menuOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!menuOpen}>
          <div
            className={cx(
              "fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity",
              menuOpen ? "opacity-100" : "opacity-0"
            )}
          />
          <div
            id="mobile-menu-panel"
            ref={menuPanelRef}
            className={cx(
              "fixed left-1/2 top-[72px] z-40 w-[min(560px,calc(100%-24px))] -translate-x-1/2",
              "rounded-[28px] border border-black/10 bg-white/92 backdrop-blur-md",
              "shadow-[18px_18px_40px_rgba(0,0,0,0.12),_-18px_-18px_40px_rgba(255,255,255,0.95)]",
              "transition-all duration-200",
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          >
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Button href="#how" className="w-full py-2.5" onClick={() => setMenuOpen(false)}>
                  How it works
                </Button>
                <Button href="/pricing" className="w-full py-2.5" onClick={() => setMenuOpen(false)}>
                  Pricing
                </Button>
              </div>

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

              <div className="mt-3 rounded-2xl border border-black/10 bg-white/80 p-3">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-neutral-700">
                  <Link href="/policies/terms" target="_blank" rel="noopener noreferrer">
                    Terms
                  </Link>
                  <Link href="/policies/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy
                  </Link>
                  <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
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
                6chatting removes language barriers for business, friendship, and global connection. Choose your language at
                sign-up — conversations are delivered in the receiver’s language instantly.
              </p>

              <div id="download" className="mt-6 grid gap-2 sm:flex sm:flex-wrap sm:gap-2">
                <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full sm:w-auto">
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
            <h2 className="text-lg font-bold tracking-[-0.02em] text-black" style={{ fontFamily: "var(--font-display)" }}>
              How 6chatting works
            </h2>
          </FadeIn>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <FadeIn delayMs={60}>
              <BevelCard className="p-5 sm:p-6">
                <h3 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                  1) Choose your language
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Pick your preferred language at sign-up. Change it anytime in settings. Sign-up using your email, create a
                  unique password, verify your email.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={120}>
              <BevelCard className="p-5 sm:p-6">
                <h3 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                  2) Chat or call normally
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  Start a chat — search for users via their email address. Type or speak naturally. Text translates
                  automatically.
                </p>
              </BevelCard>
            </FadeIn>

            <FadeIn delayMs={180}>
              <BevelCard className="p-5 sm:p-6">
                <h3 className="text-base font-bold text-black" style={{ fontFamily: "var(--font-display)" }}>
                  3) Delivered in the receiver’s language
                </h3>
                <p className="mt-2 text-sm font-normal leading-[1.75] text-neutral-700">
                  The receiver automatically gets your text translated in real time. This is the future of communication.
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

        <style jsx global>{`
          :root {
            --font-sans: ${inter.style.fontFamily};
            --font-display: ${spaceGrotesk.style.fontFamily};
          }

          html {
            -webkit-text-size-adjust: 100%;
            text-rendering: optimizeLegibility;
          }

          button,
          a {
            -webkit-tap-highlight-color: transparent;
          }

          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Desktop nav pill: flat default, water effect on hover */
          .nav-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;

            padding: 7px 12px;
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,0.10);
            background: rgba(255,255,255,0.70);

            font-size: 13px;
            font-weight: 650;
            letter-spacing: -0.01em;
            color: rgba(17,17,17,0.92);

            box-shadow: none;
            transition: box-shadow 160ms ease, background 160ms ease, transform 160ms ease;
          }
          .nav-pill:hover {
            background: rgba(255,255,255,0.92);
            box-shadow:
              10px 10px 22px rgba(0,0,0,0.10),
              -10px -10px 22px rgba(255,255,255,0.95);
          }
          .nav-pill:active { transform: scale(0.99); }
          .nav-pill:focus-visible {
            outline: none;
            box-shadow:
              0 0 0 3px rgba(0,0,0,0.08),
              10px 10px 22px rgba(0,0,0,0.10),
              -10px -10px 22px rgba(255,255,255,0.95);
          }

          /* ✅ “How it works” matches nav-pill sizing */
          .how-pill {
            padding: 7px 12px;
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,0.10);
            background: rgba(255,255,255,0.70);

            font-size: 13px;
            font-weight: 650;
            letter-spacing: -0.01em;
            color: rgba(17,17,17,0.92);

            box-shadow: none;
            transition: box-shadow 160ms ease, background 160ms ease, transform 160ms ease;
          }
          .how-pill:hover {
            background: rgba(255,255,255,0.92);
            box-shadow:
              10px 10px 22px rgba(0,0,0,0.10),
              -10px -10px 22px rgba(255,255,255,0.95);
          }
          .how-pill:active { transform: scale(0.99); }
          .how-pill:focus-visible {
            outline: none;
            box-shadow:
              0 0 0 3px rgba(0,0,0,0.08),
              10px 10px 22px rgba(0,0,0,0.10),
              -10px -10px 22px rgba(255,255,255,0.95);
          }

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
