import type { Metadata } from "next";
import CreatorMonetizationClient from "./creator-monetization-client";
import "../policy.css"; // ✅ loads before first paint (prevents flick)

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/creator-monetization";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Creator Monetization Policy | ${BRAND}`,
    description:
        "6chatting Creator Monetization Policy explains eligibility, youth restrictions, what can/cannot earn, review holds, reversals, payouts, taxes, enforcement, and appeals for creators worldwide.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Creator Monetization Policy | ${BRAND}`,
        description:
            "Eligibility, what can/cannot earn, holds/reversals, payouts, enforcement — global creator monetization policy.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Creator Monetization Policy | ${BRAND}`,
        description:
            "Eligibility, what can/cannot earn, holds/reversals, payouts, enforcement — global creator monetization policy.",
    },
};

export default function Page() {
    return <CreatorMonetizationClient />;
}
