// app/policies/acceptable-use/page.tsx
import type { Metadata } from "next";
import AcceptableUseClient from "./acceptable-use-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/acceptable-use";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Acceptable Use Policy | ${BRAND}`,
    description:
        "6chatting Acceptable Use Policy explains permitted and prohibited behavior, enforcement actions, account suspension, and deletion rules for users worldwide.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Acceptable Use Policy | ${BRAND}`,
        description:
            "Rules for using 6chatting safely and lawfully, including account suspension and termination for violations.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Acceptable Use Policy | ${BRAND}`,
        description:
            "Rules for using 6chatting safely and lawfully, including account suspension and termination for violations.",
    },
};

export default function Page() {
    return <AcceptableUseClient />;
}
