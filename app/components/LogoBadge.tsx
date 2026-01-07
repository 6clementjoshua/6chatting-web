// app/components/LogoBadge.tsx
"use client";

import Image from "next/image";

export default function LogoBadge({
    size = 36,
    className = "",
}: {
    size?: number;
    className?: string;
}) {
    return (
        <div
            className={[
                "relative shrink-0 rounded-2xl border border-black/10 bg-white p-1",
                "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
                className,
            ].join(" ")}
            style={{ width: size, height: size }}
        >
            <Image src="/6logo.PNG" alt="6chatting" fill sizes={`${size}px`} className="object-contain" />
        </div>
    );
}
