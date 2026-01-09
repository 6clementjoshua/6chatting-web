// app/policies/refunds/page.tsx
import type { Metadata } from "next";
import RefundsClient from "./refunds-client";

const BRAND = "6chatting";
const SITE = "https://6chatting.com";
const PATH = "/policies/refunds";
const URL = `${SITE}${PATH}`;

export const metadata: Metadata = {
    title: `Refund & Cancellation Policy | ${BRAND}`,
    description:
        "6chatting Refund & Cancellation Policy explains cancellations, refund eligibility, chargebacks, Stripe/Flutterwave payment handling, regional consumer rights, and dispute resolution for users worldwide.",
    alternates: { canonical: URL },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
        type: "website",
        url: URL,
        title: `Refund & Cancellation Policy | ${BRAND}`,
        description:
            "Cancellation timing, refund eligibility, chargebacks, and payment processor guidance — global policy.",
        siteName: BRAND,
    },
    twitter: {
        card: "summary_large_image",
        title: `Refund & Cancellation Policy | ${BRAND}`,
        description:
            "Cancellation timing, refund eligibility, chargebacks, and payment processor guidance — global policy.",
    },
};

export default function Page() {
    return <RefundsClient />;
}
