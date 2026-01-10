import type { Metadata } from "next";
import LivePolicyClient from "./live-client";
import "../policy.css"; // ✅ loads before first paint (prevents flick)

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/live";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Live Streaming Policy | ${BRAND}`,
    description:
        "6chatting Live Streaming Policy explains eligibility, prohibited content, youth safety, moderation, reporting, enforcement, and global legal compliance for Live features.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Live Streaming Policy | ${BRAND}`,
        description:
            "Eligibility, youth safety, prohibited content, moderation, reporting, enforcement — global Live policy.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Live Streaming Policy | ${BRAND}`,
        description:
            "Eligibility, youth safety, prohibited content, moderation, reporting, enforcement — global Live policy.",
    },
};

export default function Page() {
    return <LivePolicyClient />;
}
