// app/components/ProductPreview.tsx
"use client";

export default function ProductPreview() {
    return (
        <div className="water-bevel p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-black">
                    Product Preview
                </div>
                <div className="text-xs font-medium text-neutral-500">
                    Live demo
                </div>
            </div>

            {/* Responsive media box:
          - shorter on mobile
          - larger on tablets/desktop */}
            <div className="water-inset relative overflow-hidden p-0 h-[220px] sm:h-[300px] md:h-[340px]">
                <video
                    className="h-full w-full object-cover"
                    src="/preview2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>

            <p className="mt-3 text-sm font-normal leading-[1.75] text-neutral-700">
                6chatting welcomes you in your own language — including Hausa, Igbo,
                Yoruba, and Efik.
            </p>
        </div>
    );
}
