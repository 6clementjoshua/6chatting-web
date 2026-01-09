// app/policies/subscription-billing/page.tsx
import type { Metadata } from "next";
import SubscriptionBillingClient from "./subscription-billing-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/subscription-billing";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Subscription & Billing Policy | ${BRAND}`,
    description:
        "6chatting Subscription & Billing Policy explains subscriptions, auto-renewal, payment processing, taxes, failed payments, chargebacks, cancellations, and billing rights for users worldwide.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Subscription & Billing Policy | ${BRAND}`,
        description:
            "Subscriptions, auto-renewal, payments, taxes, failed payments, and chargebacks — global policy.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Subscription & Billing Policy | ${BRAND}`,
        description:
            "Subscriptions, auto-renewal, payments, taxes, failed payments, and chargebacks — global policy.",
    },
};

export default function Page() {
    return <SubscriptionBillingClient />;
}
