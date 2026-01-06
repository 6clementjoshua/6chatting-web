"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
};

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const SENT_EMAILS_LS_KEY = "sixchatting_waitlist_sent_emails_v1";

// Very lightweight local “already sent” store (prevents re-sending on refresh / reopen)
function getSentEmails(): Record<string, number> {
    try {
        const raw = localStorage.getItem(SENT_EMAILS_LS_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return {};
        return parsed as Record<string, number>;
    } catch {
        return {};
    }
}

function markEmailSent(email: string) {
    try {
        const sent = getSentEmails();
        sent[email] = Date.now();
        localStorage.setItem(SENT_EMAILS_LS_KEY, JSON.stringify(sent));
    } catch {
        // ignore storage errors
    }
}

function wasEmailSent(email: string) {
    const sent = getSentEmails();
    return Boolean(sent[email]);
}

export default function WaitlistModal({ open, onClose, onSuccess }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    // Hard-stop double clicks + double submits while a request is in-flight,
    // even if React state updates are a tick late.
    const inFlightRef = useRef(false);

    const cleanEmail = useMemo(() => email.trim().toLowerCase(), [email]);
    const canSubmit = useMemo(
        () => isValidEmail(cleanEmail) && !loading && !inFlightRef.current,
        [cleanEmail, loading]
    );

    useEffect(() => {
        if (!open) return;
        setEmail("");
        setMsg(null);
        setErr(null);
        setLoading(false);
        inFlightRef.current = false;
    }, [open]);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        if (open) window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    async function submit() {
        // Prevent duplicate submissions immediately (double click, enter spam, etc.)
        if (inFlightRef.current) return;

        setErr(null);
        setMsg(null);

        if (!isValidEmail(cleanEmail)) {
            setErr("Please enter a valid email address.");
            return;
        }

        // Client-side prevention: if this email was already sent before, block and inform.
        if (wasEmailSent(cleanEmail)) {
            setMsg("Email already sent. Please check your inbox.");
            return;
        }

        try {
            inFlightRef.current = true;
            setLoading(true);

            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: cleanEmail }),
            });

            const data = (await res.json()) as { ok?: boolean; message?: string };

            if (!res.ok) {
                const m = data?.message || "Something went wrong. Please try again.";

                // Defensive: if API indicates duplicate, treat as already sent.
                if (/already/i.test(m) && /sent|notified|exists|joined|subscribed/i.test(m)) {
                    markEmailSent(cleanEmail);
                    setMsg("Email already sent. Please check your inbox.");
                    onSuccess?.();
                    return;
                }

                setErr(m);
                return;
            }

            // Success: record locally so user can’t resubmit the same email again.
            markEmailSent(cleanEmail);

            setMsg("You’re on the list. We’ll email you when 6chatting is live.");
            onSuccess?.();
        } catch {
            setErr("Network error. Please try again.");
        } finally {
            setLoading(false);
            inFlightRef.current = false;
        }
    }

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 grid place-items-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Join waitlist"
        >
            {/* overlay */}
            <button
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-label="Close"
                type="button"
            />

            {/* modal */}
            <div
                className="relative w-full max-w-md water-bevel p-6 antialiased"
                style={{
                    fontFamily:
                        "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div
                            className="text-lg font-extrabold tracking-[-0.02em] text-black"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Get notified
                        </div>
                        <div className="mt-1 text-sm font-normal leading-[1.6] text-neutral-700">
                            Enter your email and we’ll alert you when 6chatting launches on the stores.
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="water-btn px-3 py-2 text-sm font-semibold"
                        aria-label="Close modal"
                        disabled={loading}
                    >
                        ✕
                    </button>
                </div>

                <div className="mt-4 water-inset p-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-black">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErr(null);
                            setMsg(null);
                        }}
                        onBlur={() => {
                            // Helpful UX: if user typed an email already notified earlier, tell them immediately.
                            const c = email.trim().toLowerCase();
                            if (isValidEmail(c) && wasEmailSent(c)) {
                                setMsg("Email already sent. Please check your inbox.");
                            }
                        }}
                        placeholder="you@example.com"
                        autoComplete="email"
                        inputMode="email"
                        className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-normal text-black outline-none placeholder:text-neutral-400"
                    />
                </div>

                {err && <div className="mt-3 text-sm font-medium text-red-600">{err}</div>}
                {msg && <div className="mt-3 text-sm font-medium text-green-700">{msg}</div>}

                <div className="mt-4 flex gap-2">
                    <button
                        type="button"
                        className="water-btn flex-1 px-4 py-3 text-sm font-semibold"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Not now
                    </button>

                    <button
                        type="button"
                        className={`water-btn water-btn-primary flex-1 px-4 py-3 text-sm font-semibold ${!canSubmit ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                        onClick={submit}
                        disabled={!canSubmit}
                    >
                        {loading
                            ? "Adding..."
                            : wasEmailSent(cleanEmail)
                                ? "Email already sent"
                                : "Join waitlist"}
                    </button>
                </div>

                <div className="mt-3 text-xs font-normal leading-[1.6] text-neutral-700">
                    By joining, you agree to receive launch emails. No spam.
                </div>
            </div>
        </div>
    );
}
