export type BlogCategory =
    | "Launch"
    | "Translation"
    | "Trust"
    | "Calls"
    | "Business"
    | "Safety"
    | "Features";

export type BlogMedia =
    | { type: "image"; src: string; alt?: string; caption?: string }
    | { type: "video"; src: string; caption?: string; poster?: string }
    | { type: "audio"; src: string; caption?: string }
    | { type: "file"; href: string; label: string };

export type BlogBlock =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
    | { type: "note"; text: string }
    | { type: "media"; items: BlogMedia[] };

export type BlogPost = {
    slug: string;
    category: BlogCategory;
    title: string;
    subtitle: string;

    /** For the small pill on cards: e.g. "Coming • 06/06/2026" */
    dateLabel: string;

    /** For the "X min read" pill */
    readMins: number;

    /** Bullets shown on the card preview */
    bullets: string[];

    /** Full article blocks */
    content: BlogBlock[];
};

export const POSTS: BlogPost[] = [
    {
        slug: "launch-day-06062026",
        category: "Launch",
        title: "We launch 06/06/2026: what 6chatting is and why it matters",
        subtitle:
            "A premium translation-first chat experience built for real trust. Here’s what’s coming, what’s included, and how to join early.",
        dateLabel: "Coming • 06/06/2026",
        readMins: 4,
        bullets: [
            "Launch timeline and what to expect on day one",
            "Personal vs Business accounts and how verification works",
            "How premium pricing supports translation + call infrastructure",
        ],
        content: [
            { type: "heading", text: "Overview" },
            {
                type: "paragraph",
                text:
                    "6chatting is built to connect people across languages—without sacrificing trust, speed, or clarity. Our goal is simple: make communication feel native even when users speak different languages.",
            },
            { type: "heading", text: "What users should expect on launch week" },
            {
                type: "bullets",
                items: [
                    "A clean onboarding flow and language setup",
                    "Core chat + translation experience available immediately",
                    "Verification flows for Personal and Business tiers",
                    "Quality + stability improvements shipped continuously after launch",
                ],
            },
            { type: "heading", text: "Media (optional)" },
            {
                type: "media",
                items: [
                    // Put images/videos in /public/blog/...
                    { type: "image", src: "/blog/launch-hero.jpg", alt: "6chatting launch", caption: "Launch announcement artwork (optional)" },
                    // { type: "video", src: "/blog/launch-teaser.mp4", poster: "/blog/launch-poster.jpg", caption: "Launch teaser (optional)" },
                    // { type: "audio", src: "/blog/launch-audio.mp3", caption: "Audio update (optional)" },
                ],
            },
            {
                type: "note",
                text:
                    "If you don’t add media, the post will still look premium—only text sections will render.",
            },
        ],
    },

    {
        slug: "real-time-translation-explained",
        category: "Translation",
        title: "Real-time translation: text, voice notes, and cross-language chat",
        subtitle:
            "6chatting is designed to remove language barriers without sacrificing speed. Here’s how translation is delivered across features.",
        dateLabel: "Update • Feature deep dive",
        readMins: 5,
        bullets: [
            "Text translation that feels native inside the chat flow",
            "Voice note translation built for clarity and fast playback",
            "Fair-use allocations to keep quality stable for everyone",
        ],
        content: [
            { type: "heading", text: "How it works" },
            {
                type: "paragraph",
                text:
                    "Translation is integrated directly into the chat experience. The goal is to keep the conversation flowing naturally—no copy/paste or switching apps.",
            },
            {
                type: "bullets",
                items: [
                    "Text: translated instantly in the conversation context",
                    "Voice notes: clarity-focused translation designed for playback",
                    "Fair-use: prevents spam usage from reducing quality for others",
                ],
            },
        ],
    },

    {
        slug: "blue-tick-personal-verification",
        category: "Trust",
        title: "Real Tick (Personal): identity that reduces impersonation",
        subtitle:
            "Verification is not decoration. Learn what Real Tick unlocks and why it improves safety and reputation for personal accounts.",
        dateLabel: "Update • Verification",
        readMins: 5,
        bullets: [
            "What Real Tick means and what it does not mean",
            "Why verified identity changes how people interact with you",
            "How liveness checks protect the community",
        ],
        content: [
            { type: "heading", text: "Why verification matters" },
            {
                type: "paragraph",
                text:
                    "Verified identity reduces impersonation and improves trust across messages, calls, and requests. It also unlocks safety signals across the product.",
            },
            {
                type: "note",
                text:
                    "Real Tick is for individuals. Business verification uses Gold/White tiers with additional protections.",
            },
        ],
    },

    {
        slug: "gold-vs-white-business-verification",
        category: "Business",
        title: "Gold vs White Tick: business verification tiers explained",
        subtitle:
            "For sellers, SMEs, and elite brands: a clear breakdown of what each verified tier unlocks, including allocations and protections.",
        dateLabel: "Update • Business",
        readMins: 6,
        bullets: [
            "Gold Tick for serious SMEs and operators",
            "White Tick for elite brands and high-trust visibility",
            "Everything in lower tiers, plus stronger protection and priority handling",
        ],
        content: [
            { type: "heading", text: "Gold Tick" },
            { type: "paragraph", text: "Gold Tick is designed for SMEs and individual operators who need higher trust and customer confidence." },
            { type: "heading", text: "White Tick" },
            { type: "paragraph", text: "White Tick is reserved for elite brands with higher visibility, enhanced brand protections, and priority review flows." },
            { type: "bullets", items: ["Brand protection", "Priority handling", "Higher trust visibility signals"] },
        ],
    },

    {
        slug: "music-together-while-chatting",
        category: "Features",
        title: "Music Together: play mutual music while chatting",
        subtitle:
            "A feature coming soon: start a shared music session with a friend and enjoy the same track in sync while you chat.",
        dateLabel: "Coming soon • Feature",
        readMins: 4,
        bullets: [
            "Start a shared session with one tap",
            "Sync playback so both users hear the same moment",
            "Keep it lightweight so chat performance stays fast",
        ],
        content: [
            { type: "heading", text: "What it is" },
            { type: "paragraph", text: "Music Together lets two users listen to the same music in sync while they message or call." },
            { type: "heading", text: "Why it matters" },
            { type: "bullets", items: ["Better bonding", "Shared moments", "Community-friendly experiences"] },
        ],
    },

    {
        slug: "6tv-watch-together",
        category: "Features",
        title: "6TV: watch films and videos together as a community",
        subtitle:
            "Coming soon: watch content together in a shared room—mutual, community, or solo viewing with chat integration.",
        dateLabel: "Coming soon • Feature",
        readMins: 5,
        bullets: [
            "Mutual rooms for two people",
            "Community rooms for groups",
            "Chat and reactions synced to playback",
        ],
        content: [
            { type: "heading", text: "How 6TV works" },
            { type: "paragraph", text: "Create a room, invite users, and watch together with synchronized playback." },
            { type: "bullets", items: ["Mutual rooms", "Community rooms", "Solo viewing"] },
        ],
    },
];

export function getPostBySlug(slug: string) {
    return POSTS.find((p) => p.slug === slug) || null;
}

export const CATEGORY_FILTERS: Array<"All" | BlogCategory> = [
    "All",
    "Launch",
    "Translation",
    "Trust",
    "Calls",
    "Business",
    "Safety",
    "Features",
];
