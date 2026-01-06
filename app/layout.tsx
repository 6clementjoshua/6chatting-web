import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update these once and everything stays consistent
const SITE_NAME = "6chatting";
const DOMAIN = "6chatting.com";
const SITE_URL = `https://${DOMAIN}`;
const OG_IMAGE = `${SITE_URL}/og.png`; // optional (create later)
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

  // ✅ Favicon + icons (ensure these files exist in /public)
  // public/favicon.ico
  // public/favicon-16x16.png
  // public/favicon-32x32.png
  // public/favicon-96x96.png (optional)
  // public/apple-icon-180x180.png (or apple-icon.png if that’s what you have)
  // public/manifest.json (optional)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // best fallback
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      // Optional:
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      // Use ONE of these depending on your filename:
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
      // If your file is named apple-icon.png instead, comment the line above and use this:
      // { url: "/apple-icon.png", sizes: "180x180" },
    ],
    shortcut: ["/favicon.ico"],
  },

  // Optional: if you have public/manifest.json
  manifest: "/manifest.json",

  // SEO basics
  alternates: {
    canonical: "/",
  },

  keywords: [
    "6chatting",
    "6 chatting",
    "chatting app",
    "6clement joshua",
    "social media app",
    "messenger",
    "real-time translation",
    "instant translation chat",
    "multilingual chat",
    "language translation app",
    "voice translation",
    "call translation",
    "Nigeria tech",
    "Cross-border communication",
    "business messaging translation",
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

  // Social preview (Open Graph)
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: BRAND_TITLE,
    description: BRAND_DESC,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} preview`,
      },
    ],
    locale: "en_US",
  },

  // Twitter cards
  twitter: {
    card: "summary_large_image",
    title: BRAND_TITLE,
    description: BRAND_DESC,
    images: [OG_IMAGE],
  },

  // Baseline meta (real security headers come next)
  other: {
    referrer: "strict-origin-when-cross-origin",
    "X-UA-Compatible": "IE=edge",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html lang="en" className="light">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  </html>
);

}
