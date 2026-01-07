// app/admin/blog/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Button = ({
    children,
    onClick,
    variant = "default",
    className = "",
    disabled,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "primary";
    className?: string;
    disabled?: boolean;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    return (
        <button
            className={cx(base, variant === "primary" && primary, className)}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default function AdminBlogLoginPage() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function login() {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Login failed");
            window.location.href = "/admin/blog";
        } catch (e: any) {
            setErr(e?.message ?? "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto w-[min(860px,calc(100%-24px))] pb-14 pt-6 sm:pt-10">
            <BevelCard className="p-6 sm:p-8">
                <div className="text-[14px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    Admin • Blog
                </div>
                <h1
                    className="mt-3 text-[clamp(22px,3.8vw,34px)] font-extrabold tracking-[-0.03em]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    Sign in to publish updates
                </h1>

                <p className="mt-2 text-[13.5px] leading-[1.85] text-neutral-700">
                    This page is admin-only. Enter your admin password to create and publish blog posts.
                </p>

                <div className="mt-6 grid gap-2">
                    <label className="rounded-2xl border border-black/10 bg-white/90 px-3 py-3 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                        <div className="text-[12px] font-semibold text-neutral-600">Admin password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full bg-transparent text-[14px] font-semibold outline-none"
                            placeholder="Enter password"
                        />
                    </label>

                    {err ? (
                        <div className="rounded-2xl border border-black/10 bg-white/90 p-3 text-[12.5px] font-semibold text-red-700 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                            {err}
                        </div>
                    ) : null}

                    <div className="mt-2 flex flex-wrap gap-2">
                        <Button variant="primary" onClick={login} disabled={loading || !password} className="px-6">
                            {loading ? "Signing in…" : "Sign in"}
                        </Button>
                        <Link className="water-btn inline-flex items-center justify-center px-5 py-3 text-sm font-semibold" href="/blog">
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </BevelCard>
        </main>
    );
}
