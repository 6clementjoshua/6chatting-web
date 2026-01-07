import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function SystemLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="light">
            <body
                style={{
                    margin: 0,
                    background: "#ffffff",
                    fontFamily:
                        "var(--font-sans), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                }}
            >
                {children}
            </body>
        </html>
    );
}
