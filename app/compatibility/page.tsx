// app/compatibility/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import WaitlistModal from "../components/WaitlistModal";

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

/** ✅ Always logo (never “6”) */
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
      "inline-flex max-w-full items-center justify-center rounded-full",
      "border border-black/10 bg-white/95 px-3 py-2",
      "text-xs font-semibold text-black/90 text-center leading-snug",
      "whitespace-normal break-words",
      "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
      className
    )}
  >
    {children}
  </span>
);

const Button = ({
  children,
  onClick,
  href,
  variant = "default",
  className = "",
  ariaLabel,
  type,
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "primary";
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
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
    <button className={cls} type={type ?? "button"} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  );
};

function IconDevicePhone({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M10 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 18h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function IconLaptop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v10H4V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 18h19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDesktop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5h16v11H4V5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 19h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 16v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 16v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconMic({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M5 11a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.9 20 6.6v6.4c0 5-3.4 8.3-8 10.5C7.4 21.3 4 18 4 13V6.6L12 2.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 12.2 11.2 14l3.9-4.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWifi({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 10a11 11 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 13a7 7 0 0 1 8 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 16a3 3 0 0 1 2 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 19h.01" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

type Platform = "iOS" | "Android" | "Mac" | "Windows" | "Web";
type DeviceType = "Phone" | "Tablet" | "Laptop" | "Desktop";
type UseCase = "text" | "voice" | "calls";

type ResultLevel = "compatible" | "partial" | "not";

function normalizeUAPlatform(ua: string): Platform | null {
  const s = ua.toLowerCase();
  if (s.includes("iphone") || s.includes("ipad") || s.includes("ipod")) return "iOS";
  if (s.includes("android")) return "Android";
  if (s.includes("macintosh") || s.includes("mac os x")) return "Mac";
  if (s.includes("windows")) return "Windows";
  return "Web";
}

function guessDeviceType(ua: string): DeviceType {
  const s = ua.toLowerCase();
  if (s.includes("iphone") || (s.includes("android") && s.includes("mobile"))) return "Phone";
  if (s.includes("ipad") || s.includes("tablet")) return "Tablet";
  if (s.includes("macintosh") || s.includes("windows")) return "Laptop";
  return "Desktop";
}

function parseMajorVersion(raw: string) {
  const m = raw.trim().match(/^(\d{1,3})/);
  return m ? Number(m[1]) : NaN;
}

function minOsFor(platform: Platform) {
  // Your “live” compatibility promise:
  // - iOS supported broadly; Android supported broadly; Desktop apps supported; web supported.
  // NOTE: You can change these later without UI changes.
  return {
    iOS: 15,
    Android: 9,
    Mac: 11, // macOS Big Sur baseline
    Windows: 10,
    Web: 0,
  }[platform];
}

function recommendedOsFor(platform: Platform) {
  return {
    iOS: 16,
    Android: 11,
    Mac: 12, // Monterey+
    Windows: 11,
    Web: 0,
  }[platform];
}

function bestOsFor(platform: Platform) {
  return {
    iOS: 17,
    Android: 13,
    Mac: 13,
    Windows: 11,
    Web: 0,
  }[platform];
}

function formatPlatformHint(p: Platform) {
  if (p === "Mac") return "macOS";
  return p;
}

export default function CompatibilityPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const [platform, setPlatform] = useState<Platform>("Web");
  const [deviceType, setDeviceType] = useState<DeviceType>("Phone");
  const [osVersion, setOsVersion] = useState<string>("");

  const [ram, setRam] = useState<string>(""); // optional
  const [storage, setStorage] = useState<string>(""); // optional
  const [network, setNetwork] = useState<string>(""); // optional

  const [useText, setUseText] = useState(true);
  const [useVoice, setUseVoice] = useState(true);
  const [useCalls, setUseCalls] = useState(true);

  const [result, setResult] = useState<null | {
    level: ResultLevel;
    title: string;
    summary: string;
    supported: Record<UseCase, boolean>;
    notes: string[];
  }>(null);

  useEffect(() => {
    // Premium: prefill with device guess
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent || "";
    const p = normalizeUAPlatform(ua);
    if (p) setPlatform(p);
    setDeviceType(guessDeviceType(ua));
  }, []);

  function checkCompatibility() {
    const major = parseMajorVersion(osVersion || "0");
    const min = minOsFor(platform);
    const rec = recommendedOsFor(platform);

    const wants: UseCase[] = [
      ...(useText ? (["text"] as const) : []),
      ...(useVoice ? (["voice"] as const) : []),
      ...(useCalls ? (["calls"] as const) : []),
    ];

    // Basic assumptions:
    // - Web is compatible for text; voice/calls depend on mic + browser.
    // - Older OS can still do text, but calls may be partial.
    let supported: Record<UseCase, boolean> = { text: true, voice: true, calls: true };

    // If no use cases selected, default to text for safety
    if (wants.length === 0) supported = { text: true, voice: false, calls: false };

    const notes: string[] = [];

    // OS gate (when platform isn’t Web)
    if (platform !== "Web") {
      if (!Number.isFinite(major) || major <= 0) {
        notes.push("Add your OS version to get the most accurate result.");
      } else {
        if (major < min) {
          supported = { text: false, voice: false, calls: false };
          setResult({
            level: "not",
            title: "Not compatible",
            summary: `Your ${formatPlatformHint(platform)} version is below the minimum supported version for 6chatting.`,
            supported,
            notes: [
              `Minimum supported: ${formatPlatformHint(platform)} ${min}+`,
              "Upgrade your device OS to use 6chatting smoothly.",
              "If upgrading is not possible, use 6chatting on another supported device.",
            ],
          });
          return;
        }

        if (major < rec) {
          // Partial: we still support, but calls may be unstable
          supported.calls = false;
          notes.push(`For best stability, we recommend ${formatPlatformHint(platform)} ${rec}+.`);
          notes.push("Text translation remains supported.");
          notes.push("Voice notes remain supported, but call translation is recommended on newer OS versions.");
        }
      }
    } else {
      // Web: text ok; voice/calls depend on mic & browser
      supported.text = true;
      supported.voice = true;
      supported.calls = true;
      notes.push("For voice and calling features, allow microphone access in your browser settings.");
      notes.push("For best results, use the latest Chrome, Safari, or Edge.");
    }

    // Optional “experience” adjustments based on selected features
    const wantsCalls = useCalls;
    const wantsVoice = useVoice;

    // If user wants calls but we flagged calls off -> partial
    let level: ResultLevel = "compatible";
    if ((wantsCalls && !supported.calls) || (wantsVoice && !supported.voice)) level = "partial";
    if (!supported.text && !supported.voice && !supported.calls) level = "not";

    const title =
      level === "compatible" ? "Compatible" : level === "partial" ? "Partially compatible" : "Not compatible";

    const summary =
      level === "compatible"
        ? "Your device supports 6chatting for a smooth experience across translation and communication."
        : level === "partial"
        ? "Your device supports 6chatting, but one or more high-performance features may require a newer OS or stronger setup."
        : "Your device does not meet the minimum requirements to run 6chatting reliably.";

    const extraNotes: string[] = [];
    if (wantsCalls && level !== "compatible") {
      extraNotes.push("Call translation requires stronger performance and network stability.");
      extraNotes.push("We recommend a newer OS version and a strong Wi-Fi / 4G / 5G connection.");
    }
    if (platform === "Mac") {
      extraNotes.push("6chatting is available on Mac and all MacBook laptops (supported macOS versions required).");
    }
    if (platform === "Windows") {
      extraNotes.push("6chatting is supported on Windows laptops and desktops (supported Windows versions required).");
    }

    setResult({
      level,
      title,
      summary,
      supported,
      notes: [...notes, ...extraNotes].filter(Boolean),
    });
  }

  const min = minOsFor(platform);
  const rec = recommendedOsFor(platform);
  const best = bestOsFor(platform);

  return (
    <main className="mx-auto w-[min(1120px,calc(100%-24px))] pb-14">
      {/* HERO */}
      <section className="grid gap-4 pt-6 sm:pt-10 md:grid-cols-[1.05fr_.95fr]">
        <BevelCard className="p-5 sm:p-7">
          <Pill>Compatibility • iOS • Android • Mac • Windows • Web</Pill>

          <h1
            className="mt-4 text-[clamp(28px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-0.045em] text-black"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Check if your device supports 6chatting.
            <br />
            Get an instant compatibility result.
          </h1>

          <p className="mt-3 max-w-xl text-[15px] sm:text-[15.5px] font-normal leading-[1.75] text-neutral-700 whitespace-normal break-words">
            6chatting runs across phones, tablets, laptops, and desktops. Compatibility depends on your platform version,
            microphone access for voice features, and network strength for call translation. Use the checker below to get
            a clear result with a green tick when your device is ready.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Pill>
              <span className="inline-flex items-center gap-2">
                <IconMic /> Voice & call features
              </span>
            </Pill>
            <Pill>
              <span className="inline-flex items-center gap-2">
                <IconWifi /> Network stability
              </span>
            </Pill>
            <Pill>
              <span className="inline-flex items-center gap-2">
                <IconShield /> Trust & safety
              </span>
            </Pill>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
              Get the app
            </Button>
            <Button href="#checker" className="w-full">
              Run compatibility check
            </Button>
          </div>
        </BevelCard>

        {/* Visual overview */}
        <div className="grid gap-4">
          <BevelCard className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                  Supported devices
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                  6chatting is available on mobile, desktop, and web—built for premium translation performance.
                </div>
              </div>
              <LogoBadge />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { title: "Phones & tablets", icon: <IconDevicePhone />, body: "iOS and Android devices with supported OS versions." },
                { title: "Mac & MacBook", icon: <IconLaptop />, body: "Available on Mac desktop and all MacBook laptops." },
                { title: "Windows PCs", icon: <IconDesktop />, body: "Supported on Windows laptops and desktops." },
                { title: "Web", icon: <IconDesktop />, body: "Use 6chatting in a modern browser for quick access." },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-black">{c.icon}</span>
                    <div className="text-[13.5px] font-extrabold whitespace-normal break-words" style={{ fontFamily: "var(--font-display)" }}>
                      {c.title}
                    </div>
                  </div>
                  <div className="mt-2 text-[13px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">
                    {c.body}
                  </div>
                </div>
              ))}
            </div>
          </BevelCard>
        </div>
      </section>

      {/* CHECKER */}
      <section id="checker" className="pt-8 sm:pt-10 scroll-mt-24">
        <BevelCard className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Pill>Compatibility checker</Pill>
              <h2
                className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Enter your device details.
              </h2>
              <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                Choose your platform and OS version, then select the features you want to use. 6chatting will show a clear
                result and tell you what to adjust for the best experience.
              </p>
            </div>
            <LogoBadge />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_.95fr]">
            {/* Form */}
            <div className="water-inset rounded-3xl p-5 sm:p-6">
              <div className="grid gap-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">Platform</span>
                    <select
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as Platform)}
                    >
                      <option value="iOS">iOS (iPhone/iPad)</option>
                      <option value="Android">Android</option>
                      <option value="Mac">Mac / MacBook</option>
                      <option value="Windows">Windows</option>
                      <option value="Web">Web (Browser)</option>
                    </select>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">Device type</span>
                    <select
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                    >
                      <option value="Phone">Phone</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">
                      {platform === "Mac" ? "macOS version" : platform === "Windows" ? "Windows version" : "OS version"}
                    </span>
                    <input
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      placeholder={platform === "Web" ? "Not required (optional)" : `Example: ${platform === "iOS" ? "17" : platform === "Android" ? "13" : platform === "Mac" ? "13" : "11"}`}
                      value={osVersion}
                      onChange={(e) => setOsVersion(e.target.value)}
                    />
                    <span className="text-[11px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.5]">
                      Minimum: {formatPlatformHint(platform)} {min}+
                      {platform !== "Web" ? ` • Recommended: ${formatPlatformHint(platform)} ${rec}+` : ""}
                    </span>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">Network (optional)</span>
                    <select
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="">Select (optional)</option>
                      <option value="WiFi">Wi-Fi</option>
                      <option value="4G">4G</option>
                      <option value="5G">5G</option>
                      <option value="Weak">Weak / unstable</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">RAM (optional)</span>
                    <select
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                    >
                      <option value="">Select (optional)</option>
                      <option value="2GB">2 GB</option>
                      <option value="4GB">4 GB</option>
                      <option value="6GB">6 GB</option>
                      <option value="8GB+">8 GB+</option>
                      <option value="16GB+">16 GB+</option>
                    </select>
                  </label>

                  <label className="grid gap-1">
                    <span className="text-[12px] font-bold text-neutral-700">Free storage (optional)</span>
                    <select
                      className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 text-[13px] font-semibold text-neutral-900 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                    >
                      <option value="">Select (optional)</option>
                      <option value="1GB">1 GB</option>
                      <option value="2GB">2 GB</option>
                      <option value="5GB">5 GB</option>
                      <option value="10GB+">10 GB+</option>
                      <option value="20GB+">20 GB+</option>
                    </select>
                  </label>
                </div>

                {/* Use-cases */}
                <div className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                  <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    What do you want to use?
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {[
                      { k: "text", label: "Text translation", v: useText, set: setUseText },
                      { k: "voice", label: "Voice notes", v: useVoice, set: setUseVoice },
                      { k: "calls", label: "Call translation", v: useCalls, set: setUseCalls },
                    ].map((x) => (
                      <label
                        key={x.k}
                        className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold shadow-[8px_8px_18px_rgba(0,0,0,0.05),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                      >
                        <input
                          type="checkbox"
                          checked={x.v}
                          onChange={(e) => x.set(e.target.checked)}
                        />
                        <span className="whitespace-normal break-words">{x.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-3 text-[12px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.7]">
                    Tip: call translation performs best on newer OS versions and a strong network.
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button variant="primary" onClick={checkCompatibility} className="w-full">
                    Check compatibility
                  </Button>
                  <Button onClick={() => setWaitlistOpen(true)} className="w-full">
                    Get the app
                  </Button>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="grid gap-4">
              <BevelCard className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                      Your result
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                      Run the checker to receive a clear compatibility status and recommendations.
                    </div>
                  </div>
                  <LogoBadge />
                </div>

                {!result ? (
                  <div className="mt-4 rounded-3xl border border-black/10 bg-white/85 p-5 text-[13px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.8] shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                    Enter your device details and click <b>Check compatibility</b>. You’ll see a green tick when your device is ready.
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3">
                    <div
                      className={cx(
                        "rounded-3xl border p-5 shadow-[14px_14px_30px_rgba(0,0,0,0.10),_-14px_-14px_30px_rgba(255,255,255,0.95)]",
                        result.level === "compatible"
                          ? "border-black/10 bg-white"
                          : result.level === "partial"
                          ? "border-black/10 bg-white"
                          : "border-black/10 bg-white"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div
                            className="text-[18px] font-extrabold tracking-[-0.02em] whitespace-normal break-words"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {result.level === "compatible" ? "✅" : result.level === "partial" ? "⚠️" : "❌"} {result.title}
                          </div>
                          <div className="mt-1 text-[13.5px] font-medium leading-[1.75] text-neutral-700 whitespace-normal break-words">
                            {result.summary}
                          </div>
                        </div>
                        <LogoBadge size={40} />
                      </div>

                      <div className="mt-4 grid gap-2">
                        {[
                          { k: "Text translation", ok: result.supported.text },
                          { k: "Voice notes", ok: result.supported.voice },
                          { k: "Call translation", ok: result.supported.calls },
                        ].map((row) => (
                          <div
                            key={row.k}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold shadow-[8px_8px_18px_rgba(0,0,0,0.05),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                          >
                            <span className="whitespace-normal break-words">{row.k}</span>
                            <span className={cx("font-extrabold", row.ok ? "text-green-700" : "text-neutral-500")}>
                              {row.ok ? "✓" : "—"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2">
                        {result.notes.map((n, i) => (
                          <div
                            key={i}
                            className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.7] shadow-[8px_8px_18px_rgba(0,0,0,0.05),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                          >
                            {n}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                          Get the app
                        </Button>
                        <Button href="/help" className="w-full">
                          Need support
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </BevelCard>

              {/* Requirements */}
              <BevelCard className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                      Requirements (live)
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-neutral-600 whitespace-normal break-words leading-[1.6]">
                      Minimum, recommended, and best experience baselines.
                    </div>
                  </div>
                  <LogoBadge />
                </div>

                <div className="mt-4 grid gap-2">
                  {[
                    {
                      k: "iOS",
                      min: "iOS 15+",
                      rec: "iOS 16+",
                      best: "iOS 17+",
                    },
                    {
                      k: "Android",
                      min: "Android 9+",
                      rec: "Android 11+",
                      best: "Android 13+",
                    },
                    {
                      k: "Mac / MacBook",
                      min: "macOS 11+",
                      rec: "macOS 12+",
                      best: "macOS 13+",
                    },
                    {
                      k: "Windows",
                      min: "Windows 10+",
                      rec: "Windows 11",
                      best: "Windows 11 (latest updates)",
                    },
                    {
                      k: "Web",
                      min: "Latest browser recommended",
                      rec: "Chrome / Safari / Edge (latest)",
                      best: "Latest + mic permission enabled",
                    },
                  ].map((r) => (
                    <div
                      key={r.k}
                      className="rounded-3xl border border-black/10 bg-white/85 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                    >
                      <div className="text-[13.5px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                        {r.k}
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        {[{ t: "Minimum", v: r.min }, { t: "Recommended", v: r.rec }, { t: "Best", v: r.best }].map((x) => (
                          <div
                            key={x.t}
                            className="rounded-2xl border border-black/10 bg-white/90 px-3 py-2 text-[12.5px] font-semibold shadow-[8px_8px_18px_rgba(0,0,0,0.05),_-8px_-8px_18px_rgba(255,255,255,0.95)]"
                          >
                            <div className="text-[11px] font-extrabold text-neutral-600">{x.t}</div>
                            <div className="mt-0.5 whitespace-normal break-words">{x.v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-3xl border border-black/10 bg-white/85 p-4 text-[12.5px] font-medium text-neutral-700 whitespace-normal break-words leading-[1.8] shadow-[10px_10px_22px_rgba(0,0,0,0.05),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                  For voice notes and call translation, you may be asked for microphone permission. 6chatting uses that access only to
                  deliver voice and calling features—privacy-first and protected.
                </div>
              </BevelCard>
            </div>
          </div>
        </BevelCard>
      </section>

      {/* Final CTA */}
      <section className="pt-8 sm:pt-10">
        <BevelCard className="p-6 sm:p-8">
          <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div>
              <Pill>Ready to connect across languages?</Pill>
              <h2
                className="mt-3 text-[clamp(20px,3.4vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Download 6chatting for your device.
              </h2>
              <p className="mt-2 text-[14px] leading-[1.8] text-neutral-700 whitespace-normal break-words">
                6chatting is available on iOS, Android, Mac/MacBook, Windows PCs, and the web. Choose your platform and start chatting
                with real-time translation instantly.
              </p>
            </div>

            <div className="grid gap-2">
              <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="w-full">
                Get the app
              </Button>
              <Button href="/pricing" className="w-full">
                View pricing
              </Button>
            </div>
          </div>
        </BevelCard>
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
    </main>
  );
}
