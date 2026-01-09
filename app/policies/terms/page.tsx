// app/policies/terms/page.tsx
import type { Metadata } from "next";
import TermsClient from "./terms-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/terms";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Terms of Service | ${BRAND}`,
    description:
        "6chatting Terms of Service define who may use the platform, user responsibilities, safety enforcement, account suspension and termination, and global legal standards.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Terms of Service | ${BRAND}`,
        description:
            "Clear global rules for using 6chatting safely, including eligibility, enforcement, and account termination.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Terms of Service | ${BRAND}`,
        description:
            "Clear global rules for using 6chatting safely, including eligibility, enforcement, and account termination.",
    },
};

export default function Page() {
    return <TermsClient />;
}
