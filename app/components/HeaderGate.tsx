"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderGate() {
    const pathname = usePathname() || "";

    // ✅ Hide header on Cloudflare/system pages
    const hide =
        pathname === "/access-restricted" ||
        pathname === "/waf-blocked";

    if (hide) return null;
    return <Header />;
}
