// app/policies/ai-translation/page.tsx
import type { Metadata } from "next";
import AiTranslationClient from "./ai-translation-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/ai-translation";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `AI & Translation Policy | ${BRAND}`,
    description:
        "6chatting AI & Translation Policy explains how translation works, accuracy limits, user responsibilities, safety safeguards, data handling, and global compliance for multilingual communication.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `AI & Translation Policy | ${BRAND}`,
        description:
            "Translation accuracy, limitations, safety safeguards, and responsible use for multilingual chat and calls.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `AI & Translation Policy | ${BRAND}`,
        description:
            "Translation accuracy, limitations, safety safeguards, and responsible use for multilingual chat and calls.",
    },
};

export default function Page() {
    return <AiTranslationClient />;
}
