"use client";

export default function ProductPreview() {
    return (
        <div className="water-bevel p-6">
            <div className="mb-3">
                <div className="text-xs font-black uppercase tracking-[0.12em] text-black">
                    Product Preview
                </div>
            </div>

            <div className="water-inset relative h-[340px] overflow-hidden p-0">
                <video
                    className="h-full w-full object-cover"
                    src="/preview2.mp4"   // ✅ preview2 plays first
                    autoPlay
                    muted                 // required for autoplay
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>

            <p className="mt-3 text-sm font-semibold leading-relaxed text-neutral-800">
                6chatting welcomes you  in your own language. Including Hausa, Igbo, Yoruba, and Efik.

            </p>
        </div>
    );
}
