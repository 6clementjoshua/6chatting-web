// app/policies/contact/page.tsx
import type { Metadata } from "next";
import ContactPolicyClient from "./contact-policy-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/contact";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Contact & Support Policy | ${BRAND}`,
    description:
        "How to contact 6chatting for support, safety reports, billing issues, legal requests, and general inquiries. Global support standards and response expectations.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Contact & Support Policy | ${BRAND}`,
        description:
            "Support channels, reporting paths, and response expectations for users worldwide.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Contact & Support Policy | ${BRAND}`,
        description:
            "Support channels, reporting paths, and response expectations for users worldwide.",
    },
};

export default function Page() {
    return <ContactPolicyClient />;
}
