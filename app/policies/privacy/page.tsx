// app/policies/privacy/page.tsx
import type { Metadata } from "next";
import PrivacyPolicyClient from "./privacy-policy-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/privacy";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Privacy Policy | ${BRAND}`,
    description:
        "Learn how 6chatting collects, uses, shares, and protects personal information across our website, mobile apps, and services, including rights for users in all countries and protections for children.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Privacy Policy | ${BRAND}`,
        description:
            "How 6chatting handles personal data, including global user rights and children’s privacy protections.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Privacy Policy | ${BRAND}`,
        description:
            "How 6chatting handles personal data, including global user rights and children’s privacy protections.",
    },
};

export default function Page() {
    return <PrivacyPolicyClient />;
}
