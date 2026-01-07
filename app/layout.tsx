import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import HeaderGate from "./components/HeaderGate";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Update these once and everything stays consistent
const SITE_NAME = "6chatting";
const DOMAIN = "www.6chatting.com";
const SITE_URL = `https://${DOMAIN}`;
const OG_IMAGE = `${SITE_URL}/og.png`;
const BRAND_TITLE = "6chatting — Connect. Translate. Communicate.";
const BRAND_DESC =
  "Chat and call across languages with instant translation. Choose your language at sign-up — messages are delivered in the receiver’s language in real time.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: BRAND_TITLE,
    template: `%s | ${SITE_NAME}`,
  },

  description: BRAND_DESC,

  applicationName: SITE_NAME,
  generator: undefined,
  referrer: "strict-origin-when-cross-origin",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon-180x180.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/manifest.json",
  alternates: { canonical: "/" },

  keywords: [
    "6chatting",
    "chatting app",
    "6clement joshua",
    "real-time translation",
    "multilingual chat",
    "voice translation",
    "call translation",
    "Cross-border communication",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: BRAND_TITLE,
    description: BRAND_DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} preview` }],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: BRAND_DESC,
    images: [OG_IMAGE],
  },

  other: {
    referrer: "strict-origin-when-cross-origin",
    "X-UA-Compatible": "IE=edge",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        style={{
          fontFamily:
            "var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        {/* ✅ Header automatically hidden on /access-restricted and /waf-blocked */}
        <HeaderGate />
        {children}
      </body>
    </html>
  );
}
