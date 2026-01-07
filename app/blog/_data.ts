// app/blog/_data.ts
export type BlogCategory =
    | "Launch"
    | "Translation"
    | "Trust"
    | "Calls"
    | "Business"
    | "Safety"
    | "Social"
    | "Stories"
    | "Music"
    | "6TV";

export type BlogSection =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
    | { type: "note"; text: string };

export type BlogPost = {
    slug: string;
    category: BlogCategory;
    title: string;
    subtitle: string;

    // ISO timestamps (source-of-truth)
    publishedAt: string; // first publish
    updatedAt?: string; // last update (optional)

    // UI metadata
    coverLabel?: string; // e.g. "Coming • 06/06/2026"
    readMins: number;
    bullets: string[];

    // Full article content (for /blog/[slug])
    content: BlogSection[];
};

export const BLOG_LAUNCH_DATE = "2026-06-06T18:00:00+01:00"; // adjust time if you want

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "launch-day-06062026",
        category: "Launch",
        title: "We launch 06/06/2026: what 6chatting is and what users should expect",
        subtitle:
            "A premium translation-first chat experience built for real trust—text, voice notes, and calls across languages, with verification and protection.",
        publishedAt: "2026-01-07T08:00:00+01:00",
        updatedAt: "2026-01-07T10:30:00+01:00",
        coverLabel: "Launch • 06/06/2026",
        readMins: 5,
        bullets: [
            "Launch timeline + what is included on day one",
            "Personal vs Business verification tiers (Real Tick)",
            "Why premium pricing funds translation + call infrastructure",
        ],
        content: [
            { type: "heading", text: "Launch date" },
            {
                type: "paragraph",
                text: "6chatting launches on 06/06/2026. This blog will be your official source for feature rollouts, verification tiers, safety updates, and quality improvements.",
            },
            { type: "heading", text: "What 6chatting is" },
            {
                type: "paragraph",
                text: "6chatting is built for cross-language conversation that feels natural. Translation is not an “extra” feature; it is the core experience—across texting, voice notes, and calls.",
            },
            { type: "bullets", items: ["Text translation in chat", "Voice note translation", "Call translation allocation (premium)"] },
            { type: "heading", text: "What users should expect before launch" },
            {
                type: "bullets",
                items: [
                    "A premium onboarding flow",
                    "Clear verification requirements per category",
                    "Staged rollouts: translation quality, then calls, then social features",
                    "Faster trust and anti-impersonation enforcement",
                ],
            },
            {
                type: "note",
                text: "This is a premium product. Pricing is designed to sustain translation and call infrastructure without compromising stability or safety.",
            },
        ],
    },

    {
        slug: "real-time-translation-explained",
        category: "Translation",
        title: "Real-time translation: text + voice notes, explained",
        subtitle:
            "Translation should feel instant and readable, not clunky. Here’s how 6chatting’s translation experience is structured for clarity and speed.",
        publishedAt: "2026-01-07T09:00:00+01:00",
        updatedAt: "2026-01-07T10:10:00+01:00",
        coverLabel: "Update • Translation",
        readMins: 6,
        bullets: [
            "Text translation that stays readable in the chat flow",
            "Voice note translation designed for fast playback",
            "Fair-use allocations to keep quality stable",
        ],
        content: [
            { type: "heading", text: "Text translation" },
            {
                type: "paragraph",
                text: "Text translation is designed to preserve meaning and context. Users should not have to copy/paste text to translate—it happens inside the conversation.",
            },
            { type: "heading", text: "Voice notes" },
            {
                type: "paragraph",
                text: "Voice note translation is premium-heavy. It requires processing, language detection, and output generation that stays accurate and fast.",
            },
            {
                type: "bullets",
                items: [
                    "Higher allocation for premium tiers",
                    "Quality improvements over time via model tuning",
                    "Fair-use limits to prevent abuse and protect reliability",
                ],
            },
            { type: "note", text: "Translation quality improves with updates. This blog will publish quality notes as we ship improvements." },
        ],
    },

    {
        slug: "real-tick-verification-explained",
        category: "Trust",
        title: "Real Tick verification: Personal, Gold, White, and Government explained",
        subtitle:
            "Verification is not decoration. Real Tick tiers communicate trust, unlock protections, and reduce impersonation risk.",
        publishedAt: "2026-01-07T09:30:00+01:00",
        coverLabel: "Update • Verification",
        readMins: 6,
        bullets: [
            "Personal Real Tick for individuals",
            "Gold Real Tick for verified businesses",
            "White Real Tick for elite brands",
            "Government classification (not purchasable)",
        ],
        content: [
            { type: "heading", text: "Personal Real Tick" },
            { type: "paragraph", text: "For individuals. Confirms identity and strengthens safety signals." },
            { type: "heading", text: "Gold Real Tick" },
            { type: "paragraph", text: "For SMEs and operators. Unlocks business trust tools and faster impersonation response." },
            { type: "heading", text: "White Real Tick" },
            { type: "paragraph", text: "For elite brands. Reserved for reputable top brands, higher visibility, and stronger brand protection." },
            { type: "heading", text: "Government / Public Office" },
            { type: "paragraph", text: "A classification, not a paid badge. Approved accounts carry affiliation notices for transparency." },
            { type: "note", text: "We will publish the exact verification requirements and review timing policy before launch." },
        ],
    },

    {
        slug: "call-translation-and-stability",
        category: "Calls",
        title: "Call translation: stability, latency, and why it’s premium",
        subtitle:
            "Cross-language calling is expensive and complex. Premium plans fund low-latency routing, session security, and translation allocation.",
        publishedAt: "2026-01-07T09:45:00+01:00",
        coverLabel: "Update • Calls",
        readMins: 6,
        bullets: [
            "Low latency routing and session stability",
            "Call translation allocation per tier",
            "Fair-use protection to keep quality high",
        ],
        content: [
            { type: "heading", text: "Why calls are premium" },
            {
                type: "paragraph",
                text: "Calls require bandwidth, routing, session protection, and real-time processing. Translation inside calls adds additional compute cost.",
            },
            { type: "bullets", items: ["Lower latency", "Better stability", "Higher allocations for higher tiers"] },
            { type: "note", text: "This blog will publish call stability updates and rollouts as they go live." },
        ],
    },

    {
        slug: "gold-vs-white-business-trust",
        category: "Business",
        title: "Gold vs White Real Tick: business trust tiers explained",
        subtitle:
            "A clear breakdown of what each business tier unlocks—translation allocations, protections, and visibility.",
        publishedAt: "2026-01-07T10:00:00+01:00",
        coverLabel: "Update • Business",
        readMins: 6,
        bullets: [
            "Gold: best for serious SMEs and operators",
            "White: elite brands and highest trust visibility",
            "Everything in lower tier, plus stronger protection and priority handling",
        ],
        content: [
            { type: "heading", text: "Gold Real Tick" },
            {
                type: "bullets",
                items: [
                    "Verified business identity",
                    "Higher translation allocation for customer chats",
                    "Faster impersonation response",
                    "Priority support escalation",
                ],
            },
            { type: "heading", text: "White Real Tick" },
            {
                type: "bullets",
                items: [
                    "Everything in Gold, plus",
                    "Highest translation quality tier + highest allocation",
                    "Brand protection and verified name enforcement",
                    "Priority call routing and dedicated escalation pathways",
                ],
            },
            { type: "note", text: "White is selective. It is reserved for reputable brands and elite businesses." },
        ],
    },

    {
        slug: "anti-impersonation-and-safety",
        category: "Safety",
        title: "Anti-impersonation safety: protecting users and verified brands",
        subtitle:
            "We prioritize trust: verified identity signals, name enforcement, and faster takedown workflows designed to reduce scams.",
        publishedAt: "2026-01-07T10:15:00+01:00",
        coverLabel: "Update • Safety",
        readMins: 5,
        bullets: [
            "Identity signals designed to reduce scams",
            "Brand protection for verified businesses",
            "Escalation workflows for faster action",
        ],
        content: [
            { type: "heading", text: "How we reduce impersonation" },
            {
                type: "bullets",
                items: [
                    "Verification signals that users can understand",
                    "Reporting + review workflows designed for speed",
                    "Higher-tier protection for verified brands",
                ],
            },
            { type: "note", text: "We will publish safety metrics and policy updates as the platform matures." },
        ],
    },

    // NEW POSTS YOU REQUESTED
    {
        slug: "posts-sharing-content",
        category: "Social",
        title: "Posts are coming: share content on 6chatting",
        subtitle:
            "Beyond messaging—users will be able to post updates, media, and announcements with strong safety and verification signals.",
        publishedAt: "2026-01-07T10:40:00+01:00",
        coverLabel: "Coming soon • Social",
        readMins: 5,
        bullets: ["Share updates and media", "Verification signals on content", "Anti-impersonation protections built-in"],
        content: [
            { type: "heading", text: "What Posts will be" },
            {
                type: "paragraph",
                text: "Posts will let users share content publicly or with selected audiences. The design will prioritize trust, clarity, and safety.",
            },
            {
                type: "bullets",
                items: [
                    "Public posts and limited-audience posts",
                    "Media support (images/video as supported)",
                    "Trust signals for verified accounts",
                    "Safer reporting and enforcement",
                ],
            },
            { type: "note", text: "Posts will roll out after core chat + translation stability reaches our targets." },
        ],
    },

    {
        slug: "stories-24-hours",
        category: "Stories",
        title: "Stories: short memories that last 24 hours",
        subtitle:
            "A lightweight way to share moments—designed to feel premium and safe, with better control and visibility for verified users.",
        publishedAt: "2026-01-07T10:50:00+01:00",
        coverLabel: "Coming soon • Stories",
        readMins: 4,
        bullets: ["24-hour stories", "Privacy controls", "Trust signals for verified accounts"],
        content: [
            { type: "heading", text: "Stories feature overview" },
            { type: "paragraph", text: "Stories are short memories that disappear after 24 hours. They are designed for quick sharing." },
            { type: "bullets", items: ["Audience controls", "Mute/hide options", "Safer reporting and visibility"] },
            { type: "note", text: "Stories will be introduced once user profiles and trust signals are fully stable." },
        ],
    },

    {
        slug: "music-together-while-chatting",
        category: "Music",
        title: "Music together: play mutual music while chatting",
        subtitle:
            "A shared listening experience designed for friends, communities, and long-distance hangouts—while still chatting and translating.",
        publishedAt: "2026-01-07T11:00:00+01:00",
        coverLabel: "Coming soon • Music",
        readMins: 5,
        bullets: ["Mutual listening sessions", "Chat while listening", "Community or private sessions"],
        content: [
            { type: "heading", text: "What Music Together means" },
            {
                type: "paragraph",
                text: "Music Together is a synced listening feature so users can enjoy the same track at the same time while chatting.",
            },
            { type: "bullets", items: ["Private sessions", "Community rooms", "Controls for hosts/moderators (where applicable)"] },
            { type: "note", text: "Music Together will ship after call stability and translation latency reach launch targets." },
        ],
    },

    {
        slug: "6tv-watch-together",
        category: "6TV",
        title: "6TV: watch films and videos together (community, mutual, or solo)",
        subtitle:
            "Watch together experiences for communities and friends—designed for premium streaming-style sessions with chat and translation overlays.",
        publishedAt: "2026-01-07T11:10:00+01:00",
        coverLabel: "Coming soon • 6TV",
        readMins: 6,
        bullets: ["Community watch rooms", "Mutual watch with friends", "Solo viewing supported"],
        content: [
            { type: "heading", text: "6TV overview" },
            {
                type: "paragraph",
                text: "6TV is a watch experience that can run in community rooms or private sessions, with chat and translation features layered in.",
            },
            { type: "bullets", items: ["Watch rooms", "Invite flow", "Moderation controls for community sessions"] },
            { type: "note", text: "6TV requires additional infrastructure and content planning. It will roll out in phases." },
        ],
    },
];
