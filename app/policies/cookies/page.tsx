// app/policies/cookies/page.tsx
import type { Metadata } from "next";
import CookiesClient from "./cookies-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/cookies";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Cookies Policy | ${BRAND}`,
    description:
        "6chatting Cookies Policy explains what cookies are, how we use cookies and similar technologies, cookie categories, analytics, preferences, and how users worldwide can manage their settings.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Cookies Policy | ${BRAND}`,
        description:
            "Cookie categories, purposes, and how to manage preferences — global policy.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Cookies Policy | ${BRAND}`,
        description:
            "Cookie categories, purposes, and how to manage preferences — global policy.",
    },
};

export default function Page() {
    return <CookiesClient />;
}
