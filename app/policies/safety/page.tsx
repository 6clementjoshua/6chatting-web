// app/policies/safety/page.tsx
import type { Metadata } from "next";
import SafetyPolicyClient from "./safety-policy-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/safety";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Safety Policy | ${BRAND}`,
    description:
        "6chatting Safety Policy: community standards, child protection, reporting, enforcement, crisis guidance, and regional considerations for users worldwide.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Safety Policy | ${BRAND}`,
        description:
            "Safety standards, child protection, reporting, enforcement, and crisis guidance for users worldwide.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Safety Policy | ${BRAND}`,
        description:
            "Safety standards, child protection, reporting, enforcement, and crisis guidance for users worldwide.",
    },
};

export default function Page() {
    return <SafetyPolicyClient />;
}
