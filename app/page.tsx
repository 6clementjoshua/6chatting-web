// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
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

const TRUST_BAR_ITEMS = [
  { title: "Verified accounts", desc: "Blue / White / Gold / Black ticks clarify identity and category." },
  { title: "Email confirmation", desc: "Improves trust, reduces spam, and protects the community." },
  { title: "Real-time translation", desc: "Text + voice + calls designed for natural conversations." },
  { title: "Cross-border ready", desc: "Built for modern business, travel, and global teams." },
  { title: "Multi-device", desc: "A consistent experience across phone, tablet, and desktop." },
];

const USE_CASES = [
  {
    title: "Cross-border business",
    desc: "Close deals, negotiate, and support customers across languages with confidence.",
  },
  {
    title: "Creators & communities",
    desc: "Engage fans worldwide—your message reaches them in their language instantly.",
  },
  {
    title: "Diaspora families",
    desc: "Stay connected across countries using the language each person understands best.",
  },
  {
    title: "Customer support teams",
    desc: "Serve global customers faster with clear, translated conversations.",
  },
  {
    title: "Travel & hospitality",
    desc: "Communicate with guests, bookings, and local services without friction.",
  },
  {
    title: "Global friendships",
    desc: "Make real connections globally—language doesn’t limit who you can talk to.",
  },
];

const USER_CONTROLS = [
  {
    title: "View original + translated text",
    desc: "See messages clearly with translation context—so both sides understand exactly what was written and what was translated.",
  },
  {
    title: "Change your default language anytime",
    desc: "Your language choice powers the experience from day one, but you can update it later as your needs change.",
  },
  {
    title: "Control how you communicate",
    desc: "Type, send voice, or take calls—6chatting is designed to fit natural communication styles across borders.",
  },
  {
    title: "Trusted profiles at a glance",
    desc: "Verification ticks help you know who you’re talking to—personal, business, or public institutions—before you engage.",
  },
];

const CONTROL_PILLS = [
  "Original text",
  "Translated text",
  "Voice messages",
  "Voice & calls",
  "Verified profiles",
];

const NAV_EXPLAIN = [
  {
    key: "home",
    title: "Home",
    imageSrc: "/images/nav/nav-home-focus.png",
    imageAlt: "Home icon highlighted on 6chatting navigation",
    summary:
      "Your translated world feed. Home is where you see posts, updates, and community interactions—automatically translated into your preferred language so you can explore and engage globally without friction.",
    bullets: [
      "Browse feeds, posts, and community activity in your language",
      "Interact globally—comments and content flow across languages",
      "Your primary discovery and engagement hub in 6chatting",
    ],
  },
  {
    key: "calls",
    title: "Calls",
    imageSrc: "/images/nav/nav-calls-focus.png",
    imageAlt: "Calls icon highlighted on 6chatting navigation",
    summary:
      "Your call history and calling hub. Calls shows your recent, missed, and ongoing call activity—designed for clear voice/video communication across borders.",
    bullets: [
      "View recent and missed calls in one place",
      "Start voice/video communication quickly",
      "Built for personal and professional conversations",
    ],
  },
  {
    key: "chats",
    title: "Chats",
    imageSrc: "/images/nav/nav-chats-focus.png",
    imageAlt: "Chats icon highlighted on 6chatting navigation",
    summary:
      "Your private conversations—translated instantly. Chats is where your 1:1 and group messages live, keeping communication natural even when languages differ.",
    bullets: [
      "Instant messaging with translation support",
      "Find ongoing and previous conversations fast",
      "Share messages and content without language limits",
    ],
  },
  {
    key: "post",
    title: "Post",
    imageSrc: "/images/nav/nav-post-focus.png",
    imageAlt: "Post icon highlighted on 6chatting navigation",
    summary:
      "Create and share content. Post is where you publish updates and media—your content can reach wider audiences because translation makes it understandable across languages.",
    bullets: [
      "Upload audio and video (live or file)",
      "Share PDFs and documents",
      "Publish updates for community or business visibility",
    ],
  },
  {
    key: "profile",
    title: "Profile",
    imageSrc: "/images/nav/nav-profile-focus.png",
    imageAlt: "Profile icon highlighted on 6chatting navigation",
    summary:
      "Your account and identity settings. Profile is where you manage your presence—personal accounts keep it simple, while business accounts unlock advanced suites and expanded capabilities.",
    bullets: [
      "Edit profile details, preferences, and visibility",
      "Personal = essential features; Business = expanded tools",
      "Manage identity signals, settings, and account controls",
    ],
  },
];



const STORIES_FEATURE = {
  title: "Stories",
  subtitle: "Share moments. Stay visible. Earn opportunities.",
  imageSrc: "/images/stories/story-status-indicators.png",
  imageAlt: "Stories row with viewed/unviewed rings and verified account ticks on 6chatting",
  overview:
    "Stories let you share short, time-based updates that appear at the top of Home and Chats—so people can see what’s new instantly without scrolling through feeds.",
  howItWorks: [
    "A colored ring means there’s a new story to view",
    "A faded or broken ring shows stories you’ve already viewed",
    "Segmented rings indicate multiple stories from the same user",
    "Verified accounts show their tick alongside stories for trust and clarity",
  ],
  freeTier: {
    title: "Free personal accounts",
    bullets: [
      "Up to 1 story post per 24 hours",
      "Maximum of 3 story posts per week",
      "Best for casual sharing and staying visible",
    ],
  },
  premiumTier: {
    title: "Premium & business accounts",
    bullets: [
      "Unlimited story posts",
      "Post as frequently as you want",
      "Ideal for creators, brands, and businesses that need daily visibility",
    ],
  },
  creatorProgram: {
    title: "Earn with Stories (Creator Program)",
    body:
      "Stories can also be part of the 6chatting Creator Program. Eligible users can earn from story engagement and visibility, promote content or services, and reach global audiences through automatic translation.",
    note: "Creator earnings and eligibility rules apply and may vary by region.",
  },
};

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
  learnMoreHref?: string;
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
              <Button href={learnMoreHref || "/"} ariaLabel={learnMoreLabel} className="w-full sm:w-fit">
                {learnMoreLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </BevelCard>
  );
}

/**
 * ✅ Corrected How-it-works order requested:
 * how-01 (splash) -> how-05 (choose language) -> how-02 (welcome greeting by language)
 * -> how-03 (create account) -> how-04 (confirm email) -> how-06 (chats home)
 */
const HOW_STEPS = [
  {
    key: "splash",
    title: "Launch 6chatting",
    lead: "A clean splash screen that loads fast and feels premium.",
    detail:
      "Open the app and you land on the branded splash. It’s minimal, consistent, and designed for a smooth first impression.",
    imageSrc: "/images/how/how-01-splash.png",
    imageAlt: "6chatting splash screen on device",
  },
  {
    key: "language",
    title: "Choose your default language",
    lead: "Set the language you want to speak and read in.",
    detail:
      "This becomes your default experience across chat and calling. You can change it later, but it powers instant translation from the start.",
    imageSrc: "/images/how/how-05-choose-language.png",
    imageAlt: "Choose language screen on device",
  },
  {
    key: "welcome",
    title: "Welcome, personalized by your language",
    lead: "The app greets and guides you using your selected language.",
    detail:
      "Your onboarding feels natural and localized, so you understand the next step immediately—without confusion or extra friction.",
    imageSrc: "/images/how/how-02-welcome.png",
    imageAlt: "Welcome to 6Chatting screen on device",
  },
  {
    key: "create",
    title: "Create your account",
    lead: "Email + password sign-up with Terms & Privacy consent.",
    detail:
      "Create an account securely with clear consent and a clean layout that keeps the experience professional and trustworthy.",
    imageSrc: "/images/how/how-03-create-account.png",
    imageAlt: "Create account screen on device",
  },
  {
    key: "confirm",
    title: "Confirm your email",
    lead: "Activate your account through email confirmation.",
    detail:
      "This verifies ownership of the email address, improves trust, reduces spam, and protects your community experience.",
    imageSrc: "/images/how/how-04-confirm-email.png",
    imageAlt: "Confirm email screen on device",
  },
  {
    key: "home",
    title: "Chats home",
    lead: "Start conversations instantly—without language barriers.",
    detail:
      "From the chats home, you can begin a new chat, find contacts, and communicate naturally while 6chatting handles translation in real time.",
    imageSrc: "/images/how/how-06-chats-home.png",
    imageAlt: "Chats home screen on device",
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Page() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  // ✅ How-it-works slider state
  const [howIndex, setHowIndex] = useState(0);
  const [howHovered, setHowHovered] = useState(false);
  const [howDir, setHowDir] = useState<1 | -1>(1);

  const howCount = HOW_STEPS.length;
  const howTimerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchLastX = useRef<number | null>(null);

  const goHow = (nextIndex: number, dir: 1 | -1) => {
    setHowDir(dir);
    setHowIndex(clamp(nextIndex, 0, howCount - 1));
  };

  const nextHow = () => goHow((howIndex + 1) % howCount, 1);
  const prevHow = () => goHow((howIndex - 1 + howCount) % howCount, -1);

  // ✅ Auto-advance every 6 seconds; pause on hover (desktop)
  useEffect(() => {
    if (howHovered) return;
    if (howTimerRef.current) window.clearInterval(howTimerRef.current);

    howTimerRef.current = window.setInterval(() => {
      setHowDir(1);
      setHowIndex((i) => (i + 1) % howCount);
    }, 6000);

    return () => {
      if (howTimerRef.current) window.clearInterval(howTimerRef.current);
      howTimerRef.current = null;
    };
  }, [howHovered, howCount]);

  // ✅ Keyboard arrows
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextHow();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevHow();
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [howIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0]?.clientX ?? null;
    touchStartX.current = x;
    touchLastX.current = x;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchLastX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = () => {
    if (touchStartX.current == null || touchLastX.current == null) return;
    const dx = touchLastX.current - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) nextHow();
      else prevHow();
    }
    touchStartX.current = null;
    touchLastX.current = null;
  };

  const step = HOW_STEPS[howIndex];

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

        {/* ✅ Trust Bar (premium reassurance strip) */}
        <section className="pt-6 sm:pt-7">
          <FadeIn delayMs={0}>
            <BevelCard className="p-4 sm:p-5">
              <div className="grid gap-3 md:grid-cols-5">
                {TRUST_BAR_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-black/10 bg-white/95 p-3"
                  >
                    <div
                      className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </div>
                    <div className="mt-1 text-[12.5px] leading-[1.55] text-neutral-700">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </BevelCard>
          </FadeIn>
        </section>


        {/* ✅ After Product Preview: Know your users */}
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

        {/* ✅ Use cases (who it's for) */}
        <section id="use-cases" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2
              className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Built for real-world conversations
            </h2>
            <p className="mt-2 max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
              6chatting is designed for people who communicate across borders—business, family, support, travel, and community.
              These use cases show exactly where translation becomes a daily advantage.
            </p>
          </FadeIn>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {USE_CASES.map((c, idx) => (
              <FadeIn key={c.title} delayMs={40 + idx * 30}>
                <BevelCard className="p-4 sm:p-5 h-full">
                  <div className="flex flex-col gap-2">
                    <div
                      className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.title}
                    </div>
                    <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                      {c.desc}
                    </p>
                  </div>
                </BevelCard>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ✅ What you control (premium clarity, lightweight) */}
        <section id="what-you-control" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <h2
              className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What you control
            </h2>
            <p className="mt-2 max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
              Premium products feel trustworthy when users understand their controls. 6chatting is designed to keep translation
              clear, communication natural, and identity signals easy to recognize.
            </p>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {CONTROL_PILLS.map((pill) => (
                  <Pill key={pill}>{pill}</Pill>
                ))}
              </div>
            </div>

          </FadeIn>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {USER_CONTROLS.map((c, idx) => (
              <FadeIn key={c.title} delayMs={40 + idx * 30}>
                <BevelCard className="p-4 sm:p-5 h-full">
                  <div className="flex flex-col gap-2">
                    <div
                      className="text-[15px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.title}
                    </div>
                    <p className="text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                      {c.desc}
                    </p>
                  </div>
                </BevelCard>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* ✅ Navigation explanation (5 icons, premium + cardless) */}
        <section id="navigation" className="pt-10 sm:pt-12 scroll-mt-24">
          <FadeIn delayMs={0}>
            <div className="flex flex-col gap-2">
              <h2
                className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Navigation
              </h2>
              <p className="max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                A clear guide to what each icon does—so users instantly understand how to explore, communicate, and create on
                6chatting.
              </p>
            </div>
          </FadeIn>

          <div className="mt-5 grid gap-5 sm:gap-6">
            {NAV_EXPLAIN.map((item, idx) => {
              const flip = idx % 2 === 1;

              return (
                <FadeIn key={item.key} delayMs={40 + idx * 40}>
                  <div
                    className={cx(
                      "nav-row",
                      flip ? "md:nav-row--flip" : ""
                    )}
                  >
                    {/* Image */}
                    <div className="nav-media">
                      <div className="nav-glass">
                        <div className="nav-img-wrap">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            className="nav-img object-contain"
                            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 520px"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="nav-text">
                      <div className="nav-kicker">
                        <Pill className="!bg-white">{item.title}</Pill>
                      </div>

                      <p className="mt-3 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                        {item.summary}
                      </p>

                      <ul className="mt-3 nav-list">
                        {item.bullets.map((b) => (
                          <li key={b} className="nav-li">
                            <span className="nav-dot" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Divider line (cardless structure) */}
                  {idx !== NAV_EXPLAIN.length - 1 ? <div className="nav-divider" /> : null}
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* ✅ Stories (premium + cardless) */}
        <section id="stories" className="pt-10 sm:pt-12 scroll-mt-24">
          <FadeIn delayMs={0}>
            <div className="flex flex-col gap-2">
              <h2
                className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {STORIES_FEATURE.title}
              </h2>
              <p className="max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                {STORIES_FEATURE.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="mt-0 stories-row">


            {/* Media */}
            <FadeIn delayMs={40}>
              <div className="stories-media">
                <div className="stories-glass">
                  <div className="stories-img-wrap">
                    <Image
                      src={STORIES_FEATURE.imageSrc}
                      alt={STORIES_FEATURE.imageAlt}
                      fill
                      className="stories-img object-contain"
                      sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 520px"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Copy */}
            <FadeIn delayMs={80}>
              <div className="stories-text">
                <div className="stories-kicker">
                  <Pill className="!bg-white">Stories</Pill>
                  <span className="stories-mini">Visible at the top of Home & Chats</span>
                </div>

                <p className="mt-3 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                  {STORIES_FEATURE.overview}
                </p>

                <div className="mt-4">
                  <div
                    className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    How it works
                  </div>

                  <ul className="mt-2 stories-list">
                    {STORIES_FEATURE.howItWorks.map((b) => (
                      <li key={b} className="stories-li">
                        <span className="stories-dot" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 stories-tiers">
                  <div className="stories-tier">
                    <div
                      className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {STORIES_FEATURE.freeTier.title}
                    </div>
                    <ul className="mt-2 stories-list">
                      {STORIES_FEATURE.freeTier.bullets.map((b) => (
                        <li key={b} className="stories-li">
                          <span className="stories-dot" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="stories-tier">
                    <div
                      className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {STORIES_FEATURE.premiumTier.title}
                    </div>
                    <ul className="mt-2 stories-list">
                      {STORIES_FEATURE.premiumTier.bullets.map((b) => (
                        <li key={b} className="stories-li">
                          <span className="stories-dot" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 stories-earn">
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="text-[13px] font-extrabold tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {STORIES_FEATURE.creatorProgram.title}
                    </div>
                    <Pill className="!bg-white">Creator Program</Pill>
                  </div>

                  <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                    {STORIES_FEATURE.creatorProgram.body}
                  </p>

                  <p className="mt-2 text-[12.5px] leading-[1.6] text-neutral-600">
                    {STORIES_FEATURE.creatorProgram.note}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-6 stories-divider" />
        </section>



        {/* ✅ Remaining images */}
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

        {/* ✅ Support the build (optional, premium) */}
        <section id="support" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <BevelCard className="p-5 sm:p-7">
              <div className="grid gap-4 md:grid-cols-[1.2fr_.8fr] md:items-center">
                <div>
                  <h2
                    className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Support the build (optional)
                  </h2>
                  <p className="mt-2 max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                    6chatting is building premium real-time translation for text, voice, and calls. If you believe in the
                    mission, you can become a Founding Supporter to help fund infrastructure, security, and launch readiness.
                  </p>
                  <p className="mt-2 text-[12.5px] leading-[1.6] text-neutral-600">
                    This is optional support and not an investment offer. No equity or ownership is provided through this page.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Button href="/support" ariaLabel="Become a founding supporter" variant="primary" className="w-full">
                    Become a Founding Supporter
                  </Button>
                  <Button href="/support#support-terms" ariaLabel="Read support terms" className="w-full">
                    Read Support Terms
                  </Button>
                </div>
              </div>
            </BevelCard>
          </FadeIn>
        </section>


        {/* ✅ Premium How section — reduced height so it fits without extra scrolling on */}
        <section id="how" className="pt-9 sm:pt-10 scroll-mt-24">
          <FadeIn delayMs={0}>
            <div className="flex flex-col gap-1.5">
              <h2
                className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How 6chatting works
              </h2>
              <p className="max-w-3xl text-[14px] sm:text-[14.5px] leading-[1.7] text-neutral-700">
                A guided walkthrough from first launch to your chats home — designed to feel fast, clean, and premium.
              </p>
              <p className="how-hint">
                Tip: Desktop—hover to reveal arrows. Mobile—swipe left/right (or use arrow keys).
              </p>
            </div>
          </FadeIn>

          <div className="mt-4 how-bleed">
            <BevelCard className="p-4 sm:p-5 md:p-6">
              <div
                className="relative"
                onMouseEnter={() => setHowHovered(true)}
                onMouseLeave={() => setHowHovered(false)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="grid gap-4 md:grid-cols-[1.05fr_.95fr] md:items-center">
                  {/* Image (reduced height, still premium) */}
                  <div className="relative">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white h-[260px] sm:h-[320px] md:h-[380px]">
                      <div key={`${step.key}-img`} className={cx("absolute inset-0", howDir === 1 ? "how-in-right" : "how-in-left")}>
                        <Image
                          src={step.imageSrc}
                          alt={step.imageAlt}
                          fill
                          className="object-contain"
                          priority={howIndex === 0}
                          sizes="(max-width: 768px) 96vw, (max-width: 1200px) 52vw, 640px"
                        />
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-2">
                      {HOW_STEPS.map((s, i) => (
                        <button
                          key={s.key}
                          type="button"
                          aria-label={`Go to step ${i + 1}`}
                          onClick={() => goHow(i, i > howIndex ? 1 : -1)}
                          className={cx(
                            "h-2.5 w-2.5 rounded-full border border-black/15",
                            i === howIndex ? "bg-black/70" : "bg-black/15 hover:bg-black/25"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Text (tighter spacing to avoid scroll) */}
                  <div className="relative">
                    <div key={`${step.key}-txt`} className={cx("how-text-anim", howDir === 1 ? "how-in-left" : "how-in-right")}>
                      <div className="flex items-center justify-between gap-3">
                        <Pill className="!bg-white">
                          Step {howIndex + 1} / {howCount}
                        </Pill>

                        <span className="hidden md:inline text-[12px] font-semibold text-neutral-600">
                          Auto-advances every 6s
                        </span>
                      </div>

                      <h3
                        className="mt-3 text-[clamp(18px,2.2vw,26px)] font-extrabold tracking-[-0.03em] text-black"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-2 text-[14px] sm:text-[14.5px] leading-[1.7] text-neutral-700">
                        <span className="font-semibold text-neutral-800">{step.lead}</span>{" "}
                        <span>{step.detail}</span>
                      </p>
                    </div>

                    {/* Desktop hover arrows */}
                    <div className={cx("how-hover-arrows hidden md:flex", howHovered && "how-hover-arrows--on")}>
                      <button type="button" aria-label="Previous step" onClick={prevHow} className="how-arrow how-arrow-left">
                        ‹
                      </button>
                      <button type="button" aria-label="Next step" onClick={nextHow} className="how-arrow how-arrow-right">
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </BevelCard>
          </div>
        </section>

        {/* ✅ Final CTA (premium close) */}
        <section className="pt-10 sm:pt-12">
          <FadeIn delayMs={0}>
            <BevelCard className="p-5 sm:p-7">
              <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
                <div>
                  <h2
                    className="text-[clamp(20px,3.2vw,30px)] font-extrabold tracking-[-0.04em] text-black"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Ready to communicate without language barriers?
                  </h2>
                  <p className="mt-2 max-w-xl text-[14px] sm:text-[14.5px] leading-[1.75] text-neutral-700">
                    Join the waitlist to be first to download 6chatting. Built to feel fast, clean, and premium across devices.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() => setWaitlistOpen(true)}
                    className="w-full"
                    ariaLabel="Download now"
                  >
                    Download Now
                  </Button>
                  <Button
                    href="#how"
                    onClick={() => scrollToId("how")}
                    className="w-full"
                    ariaLabel="See how it works"
                  >
                    How it works
                  </Button>
                </div>
              </div>
            </BevelCard>
          </FadeIn>
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

              <Link href="/policies/safety" target="_blank" rel="noopener noreferrer">
                Safety
              </Link>

              <Link href="/policies/acceptable-use" target="_blank" rel="noopener noreferrer">
                Acceptable Use
              </Link>

              <Link href="/policies/subscription-billing" target="_blank" rel="noopener noreferrer">
                Subscription & Billing
              </Link>

              <Link href="/policies/refunds" target="_blank" rel="noopener noreferrer">
                Refund & Cancellation
              </Link>

              <Link href="/policies/ai-translation" target="_blank" rel="noopener noreferrer">
                AI & Translation
              </Link>

              <Link href="/policies/cookies" target="_blank" rel="noopener noreferrer">
                Cookies
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

          /* ✅ How section full-bleed */
          .how-bleed {
            margin-left: calc(50% - 50vw);
            margin-right: calc(50% - 50vw);
            padding-left: max(12px, calc(50vw - 560px));
            padding-right: max(12px, calc(50vw - 560px));
          }

          /* ✅ Hint text: tiny, gray, italics */
          .how-hint {
            margin-top: 2px;
            font-size: 11px;
            line-height: 1.5;
            color: rgba(0, 0, 0, 0.45);
            font-style: italic;
          }

          /* ✅ Slide-in animations */
          @keyframes howInLeft {
            from {
              opacity: 0;
              transform: translateX(-18px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes howInRight {
            from {
              opacity: 0;
              transform: translateX(18px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .how-in-left {
            animation: howInLeft 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
          .how-in-right {
            animation: howInRight 480ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }

          .how-text-anim {
            will-change: transform, opacity;
          }

          /* ✅ Hover arrows */
          .how-hover-arrows {
            pointer-events: none;
            position: absolute;
            inset: 0;
          }
          .how-hover-arrows--on {
            pointer-events: auto;
          }
          .how-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 42px;
            width: 42px;
            border-radius: 999px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            background: rgba(255, 255, 255, 0.92);
            box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.12), -10px -10px 22px rgba(255, 255, 255, 0.9);
            font-size: 26px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(0, 0, 0, 0.75);
            opacity: 0;
            transition: opacity 180ms ease, transform 180ms ease;
          }
          .how-hover-arrows--on .how-arrow {
            opacity: 1;
          }
          .how-arrow:hover {
            transform: translateY(-50%) scale(1.03);
          }
          .how-arrow-left {
            left: -8px;
          }
          .how-arrow-right {
            right: -8px;
          }
            /* ✅ Navigation (cardless + premium glass) */
.nav-row {
  display: grid;
  gap: 14px;
  align-items: center;
}

@media (min-width: 768px) {
  .nav-row {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 20px;
  }
  .nav-row--flip {
    grid-template-columns: 0.95fr 1.05fr;
  }
  .nav-row--flip .nav-media {
    order: 2;
  }
  .nav-row--flip .nav-text {
    order: 1;
  }
}

.nav-glass {
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    14px 14px 28px rgba(0, 0, 0, 0.10),
    -14px -14px 28px rgba(255, 255, 255, 0.85);
  overflow: hidden;
}

.nav-img-wrap {
  position: relative;
  width: 100%;
  height: 240px;
}

@media (min-width: 640px) {
  .nav-img-wrap {
    height: 280px;
  }
}

.nav-img {
  transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 320ms ease;
  will-change: transform;
}

.nav-glass:hover .nav-img {
  transform: scale(1.02);
  filter: contrast(1.02);
}

.nav-text {
  padding: 4px 2px;
}

.nav-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.nav-li {
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 10px;
  align-items: start;
  color: rgba(64, 64, 64, 1);
  font-size: 13.5px;
  line-height: 1.7;
}

.nav-dot {
  margin-top: 8px;
  height: 6px;
  width: 6px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.10);
}

.nav-divider {
  height: 1px;
  width: 100%;
  margin-top: 6px;
  background: linear-gradient(
    to right,
    rgba(0,0,0,0.04),
    rgba(0,0,0,0.12),
    rgba(0,0,0,0.04)
  );
}
.stories-row {
  display: grid;
  gap: 10px; /* tighter vertical rhythm */
  align-items: center;
}

@media (min-width: 768px) {
  .stories-row {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 22px;
  }
}

.stories-glass {
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.10);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 14px 14px 28px rgba(0, 0, 0, 0.10), -14px -14px 28px rgba(255, 255, 255, 0.85);
  overflow: hidden;
}

.stories-img-wrap {
  position: relative;
  width: 100%;
  height: 260px;
}

/* Tablet */
@media (min-width: 640px) {
  .stories-img-wrap {
    height: 320px;
  }
}

/* Desktop – bigger, premium */
@media (min-width: 1024px) {
  .stories-img-wrap {
    height: 380px;
  }
}


.stories-img {
  transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 320ms ease;
  will-change: transform;
}

@media (min-width: 1024px) {
  .stories-img {
    transform: scale(1.03);
  }
}

.stories-glass:hover .stories-img {
  transform: scale(1.02);
  filter: contrast(1.02);
}

.stories-text {
  padding: 4px 2px;
}

.stories-kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.stories-mini {
  font-size: 12px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.55);
}

.stories-tiers {
  display: grid;
  gap: 14px;
}
@media (min-width: 640px) {
  .stories-tiers {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

.stories-tier,
.stories-earn {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 12px;
  box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.08), -10px -10px 22px rgba(255, 255, 255, 0.80);
}

.stories-list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.stories-li {
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 10px;
  align-items: start;
  color: rgba(64, 64, 64, 1);
  font-size: 13.5px;
  line-height: 1.7;
}

.stories-dot {
  margin-top: 8px;
  height: 6px;
  width: 6px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.10);
}

.stories-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.04), rgba(0,0,0,0.12), rgba(0,0,0,0.04));
}
        `}</style>
      </main>
    </div>
  );
}
