"use client";

import Link from "next/link";

export default function SupportSuccess() {
    return (
        <div className="min-h-screen bg-white text-black">
            <main className="mx-auto w-[min(980px,calc(100%-24px))] pt-20 pb-14" style={{ paddingTop: "calc(var(--header-h, 64px) + 20px)" }}>
                <div className="water-bevel p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em]">
                        Support received. Thank you.
                    </h1>
                    <p className="mt-3 text-[14.5px] leading-[1.8] text-neutral-700">
                        Your contribution helps fund infrastructure, security, and launch readiness for 6chatting. A receipt/confirmation
                        will be provided by the payment processor.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link className="water-btn water-btn-primary px-4 py-3 text-sm font-semibold" href="/">
                            Back to Home
                        </Link>
                        <Link className="water-btn px-4 py-3 text-sm font-semibold" href="/support">
                            Support Again
                        </Link>
                    </div>

                    <p className="mt-5 text-xs text-neutral-600">
                        If you need help, visit <Link className="underline font-semibold" href="/policies/contact">Contact</Link>.
                    </p>
                </div>
            </main>
        </div>
    );
}
