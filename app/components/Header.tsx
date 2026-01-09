"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WaitlistModal from "./WaitlistModal";

const DESKTOP_NAV = [
    { label: "Personal", href: "/personal" },
    { label: "Business", href: "/business" },
    { label: "Blog", href: "/blog" },
    { label: "Help Center", href: "/help" },
    { label: "Jobs", href: "/jobs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compatibility", href: "/compatibility" },
    { label: "Partners", href: "/partners" },
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

function IconMenu({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconClose({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconDownloadSolid({ className = "" }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4.01 4.01a1 1 0 0 1-1.38 0L7.3 11.71a1 1 0 1 1 1.4-1.42l2.3 2.3V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"
            />
        </svg>
    );
}

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

export default function Header() {
    const pathname = usePathname();

    const [waitlistOpen, setWaitlistOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuPanelRef = useRef<HTMLDivElement>(null);
    const menuBtnRef = useRef<HTMLButtonElement>(null);

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
        <>
            <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-md">
                <div className="mx-auto grid w-[min(1120px,calc(100%-24px))] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-3 sm:py-4 overflow-visible">
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
                            <div className="text-sm font-semibold tracking-[-0.01em] text-black" style={{ fontFamily: "var(--font-display)" }}>
                                6chatting
                            </div>
                            <div className="text-[12px] font-medium text-neutral-700 leading-snug whitespace-normal">
                                Connect. Translate. Communicate.
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden md:block min-w-0 overflow-visible">
                        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-1">
                            {DESKTOP_NAV.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cx("nav-pill", active && "nav-pill-active")}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="flex items-center justify-end gap-2 shrink-0">
                        {/* Mobile download icon */}
                        <button
                            type="button"
                            onClick={() => setWaitlistOpen(true)}
                            aria-label="Download / Get the app"
                            className={cx(
                                "sm:hidden",
                                "inline-flex items-center justify-center",
                                "h-10 w-10 rounded-2xl border border-black/15 bg-white",
                                "active:scale-[0.98] transition-transform"
                            )}
                        >
                            <IconDownloadSolid className="text-black" />
                        </button>

                        {/* Desktop primary CTA */}
                        <div className="hidden sm:block">
                            <Button variant="primary" onClick={() => setWaitlistOpen(true)} className="get-app-btn">
                                Get the app
                            </Button>
                        </div>

                        {/* Mobile menu */}
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

                {/* Mobile panel */}
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
                                <Button href="/pricing" className="w-full py-2.5" onClick={() => setMenuOpen(false)}>
                                    Pricing
                                </Button>
                                <Button
                                    variant="primary"
                                    className="w-full py-2.5"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setTimeout(() => setWaitlistOpen(true), 80);
                                    }}
                                >
                                    Get the app
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
                        </div>
                    </div>
                </div>
            </header>

            {/* One global modal (works from any page) */}
            <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
        </>
    );
}
