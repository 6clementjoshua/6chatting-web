// app/blog/data.ts

export type BlogCategory =
    | "Launch"
    | "Translation"
    | "Trust"
    | "Calls"
    | "Business"
    | "Safety"
    | "Features";

/**
 * ✅ Media removed for now:
 * - No images
 * - No videos
 * - No audio
 * - No file links
 *
 * If you later want media back, we can reintroduce a `media` block type.
 */

export type BlogBlock =
    | { type: "heading"; text: string }
    | { type: "paragraph"; text: string }
    | { type: "bullets"; items: string[] }
    | { type: "note"; text: string };

export type BlogPost = {
    slug: string;
    category: BlogCategory;
    title: string;
    subtitle: string;

    /** For the small pill on cards: e.g. "Coming • 06/06/2026" */
    dateLabel: string;

    /** ✅ REAL publish date (ISO). Used to show “Published Jan 7, 2026 • today/2 days ago”. */
    publishedAt: string;

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

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-07T12:00:00Z",

        readMins: 12,
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
                    "6chatting is built to connect people across languages—without sacrificing trust, speed, or clarity. The mission is straightforward: when two people speak different languages, the experience should still feel natural, fast, and safe. You should not need to copy and paste into other apps, guess what the other person meant, or worry whether the account is real.",
            },
            {
                type: "paragraph",
                text:
                    "We’re launching on 06/06/2026 with a premium-first approach because translation and calling infrastructure are not free at scale. If you want consistent quality, stable uptime, and strong safety signals, the platform must be built on sustainable economics from day one. That is the foundation behind the product choices, verification model, and feature roadmap.",
            },

            { type: "heading", text: "Why 6chatting exists" },
            {
                type: "paragraph",
                text:
                    "Most messaging apps assume you and the person you’re talking to already share a language. That assumption fails in business, travel, long-distance relationships, international friendships, customer support, and global communities. When language breaks, trust also breaks. People misunderstand one another, accuse each other of bad intent, or stop engaging entirely.",
            },
            {
                type: "paragraph",
                text:
                    "6chatting is designed as a translation-first communication layer. Translation is not an optional add-on or a separate mode. It is part of the product’s core logic: message composition, delivery, reading, and (in future iterations) calling all revolve around making meaning clear across languages.",
            },

            { type: "heading", text: "What users should expect on launch week" },
            {
                type: "bullets",
                items: [
                    "A clean onboarding flow with language selection and preferences",
                    "Core chat experience that prioritizes clarity and speed",
                    "Personal verification (Real Tick) and business verification tiers (Gold/White) available as structured trust signals",
                    "Continuous stability improvements after launch based on real usage feedback",
                ],
            },
            {
                type: "paragraph",
                text:
                    "Launch week is about stability and core experience. That means fewer gimmicks and more attention to reliability: message delivery, translation quality, account integrity, and a UI that does not confuse users. You should expect incremental updates—tight, practical releases that improve the same core flows repeatedly until they are excellent.",
            },

            { type: "heading", text: "Personal vs Business accounts: what is the difference?" },
            {
                type: "paragraph",
                text:
                    "A personal account is optimized for individual identity and safe interactions. It prioritizes anti-impersonation protections, identity signals, and straightforward usage. A business account is optimized for reputation, customer confidence, and reduced fraud surface area—especially for sellers, service providers, SMEs, and established brands.",
            },
            {
                type: "paragraph",
                text:
                    "In practice, this means business accounts are expected to present more durable trust. Buyers and customers need to know who they are dealing with. That is why business verification is tiered and why those tiers unlock additional safeguards and visibility controls over time.",
            },

            { type: "heading", text: "Why premium pricing matters" },
            {
                type: "paragraph",
                text:
                    "Premium pricing is not only about access. It is primarily about protecting quality. Translation costs compute. Calling costs bandwidth. Abuse costs moderation effort. If a platform offers unlimited high-cost features to everyone for free, the platform eventually pays for it through degraded performance, spam, fraud, or aggressive advertising models that reduce user trust.",
            },
            {
                type: "paragraph",
                text:
                    "By being premium-first, 6chatting can allocate resources correctly: better infrastructure, improved translation accuracy, better fraud controls, and stronger uptime targets. It also creates a more serious user environment, where account quality and community behavior remain high.",
            },

            { type: "heading", text: "How to join early and what “early” means" },
            {
                type: "paragraph",
                text:
                    "Joining early means you get access to the first stable version of the translation-first experience and a clear view of the product’s direction. It also means your feedback matters more because early-stage usage patterns shape what gets prioritized next.",
            },
            {
                type: "bullets",
                items: [
                    "Set your language correctly during onboarding (this drives your default experience)",
                    "Use the product in real conversations (quality improves with real-world feedback)",
                    "If you represent a business, choose the tier that matches your visibility and risk needs",
                ],
            },

            {
                type: "note",
                text:
                    "This launch is intentionally focused: core chat, trust signals, and translation quality first. Everything else builds on that foundation.",
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

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-06T12:00:00Z",

        readMins: 14,
        bullets: [
            "Text translation that feels native inside the chat flow",
            "Voice note translation built for clarity and fast playback",
            "Fair-use allocations to keep quality stable for everyone",
        ],
        content: [
            { type: "heading", text: "The problem translation must solve" },
            {
                type: "paragraph",
                text:
                    "Translation inside messaging is not just converting words. It is converting meaning under time pressure. People chat quickly. They use slang, short phrases, emojis, and incomplete grammar. A translation-first messaging app must preserve intent, not just literal words, and it must do this without slowing conversation to a crawl.",
            },
            {
                type: "paragraph",
                text:
                    "6chatting aims to deliver translation in a way that keeps the chat flow natural. The user experience should feel like both people speak the same language, even though they do not. That requires speed, context awareness, and practical controls to reduce confusion.",
            },

            { type: "heading", text: "How text translation works in the chat flow" },
            {
                type: "paragraph",
                text:
                    "Text translation is integrated into the conversation context. Instead of forcing users to translate externally or manually, translation is presented as a core layer of the message lifecycle: composing, sending, reading, and replying. The UI should support clarity: you should see what was said and what it means in your language.",
            },
            {
                type: "bullets",
                items: [
                    "Translation is designed to feel immediate (minimize visible friction)",
                    "Context matters: the same word can mean different things depending on the conversation",
                    "Clarity controls: the product should help users avoid misunderstandings, not create them",
                ],
            },

            { type: "heading", text: "Voice notes and spoken messages" },
            {
                type: "paragraph",
                text:
                    "Voice notes are emotional and fast. People often use them when typing is too slow or when they need tone to be understood. A translation-first system must treat voice notes with extra care: tone, pauses, and emphasis all influence meaning.",
            },
            {
                type: "paragraph",
                text:
                    "On 6chatting, voice translation is intended to prioritize clarity and playback speed. That means the translated result must be understandable and practical in real time. The goal is not academic perfection; it is conversational truth—what the speaker likely meant and how the listener should interpret it.",
            },

            { type: "heading", text: "Fair-use allocations and quality protection" },
            {
                type: "paragraph",
                text:
                    "Quality must be protected. If translation usage is abused—by spam, automated behavior, or unlimited bulk translation—everyone suffers. Systems get overloaded, and quality can degrade. That is why fair-use allocations exist: to prevent a small number of abusive patterns from reducing service quality for normal users.",
            },
            {
                type: "bullets",
                items: [
                    "Allocations protect uptime and translation speed",
                    "They discourage automated spam and misuse",
                    "They support predictable quality at scale",
                ],
            },

            { type: "heading", text: "Practical expectations: what translation can and cannot do" },
            {
                type: "paragraph",
                text:
                    "No translation system is perfect. Slang, jokes, sarcasm, and cultural references can be difficult. The correct product strategy is to be transparent and helpful: when a phrase is ambiguous, the experience should reduce risk by encouraging clarification rather than confidently delivering a wrong meaning.",
            },
            {
                type: "paragraph",
                text:
                    "Over time, translation improves through iteration: better models, better context handling, and product-level feedback loops. The goal is measurable improvement: fewer misunderstandings, faster comprehension, and higher confidence in cross-language conversations.",
            },

            {
                type: "note",
                text:
                    "Translation is not a feature on 6chatting; it is the core product layer. Everything else builds around it.",
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

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-05T12:00:00Z",

        readMins: 13,
        bullets: [
            "What Real Tick means and what it does not mean",
            "Why verified identity changes how people interact with you",
            "How liveness checks protect the community",
        ],
        content: [
            { type: "heading", text: "Verification is not decoration" },
            {
                type: "paragraph",
                text:
                    "A verification badge must mean something operational, not cosmetic. If a badge does not change risk, reduce impersonation, or improve accountability, it becomes marketing—and users stop trusting it. Real Tick is designed to be a meaningful trust signal for personal accounts.",
            },

            { type: "heading", text: "What Real Tick means" },
            {
                type: "paragraph",
                text:
                    "Real Tick indicates that the account has passed identity and liveness checks intended to confirm a real human is behind the profile and that the identity process is not a simple screenshot or replay attack. The goal is to raise the cost of impersonation and make it harder for bad actors to create fake trust.",
            },
            {
                type: "bullets",
                items: [
                    "Confirms a stronger relationship between a person and the account",
                    "Raises the difficulty of impersonation attempts",
                    "Improves confidence in cross-language conversations where misunderstandings are already a risk",
                ],
            },

            { type: "heading", text: "What Real Tick does NOT mean" },
            {
                type: "paragraph",
                text:
                    "Real Tick does not mean someone is famous, important, or morally perfect. It does not guarantee someone will behave well. It means the platform has higher confidence that the account represents a real individual who completed verification checks.",
            },

            { type: "heading", text: "Why verified identity changes how people interact with you" },
            {
                type: "paragraph",
                text:
                    "In messaging, trust changes behavior. People respond faster, share more accurate information, and are less defensive when they believe the other party is real. Verified identity reduces the fear of scams and impersonation, which improves conversation quality and reduces conflict.",
            },
            {
                type: "paragraph",
                text:
                    "This effect is amplified in cross-language communication. When language is a barrier, users rely even more on trust signals to decide whether to continue. Real Tick helps create a more confident environment where people feel safer engaging.",
            },

            { type: "heading", text: "How liveness checks protect the community" },
            {
                type: "paragraph",
                text:
                    "Liveness checks exist to prevent fraud patterns like printed photos, replayed videos, and synthetic identity attempts. The point is not to inconvenience users; it is to make large-scale abuse expensive and less effective. When bad actors cannot scale impersonation cheaply, the platform becomes safer for everyone.",
            },
            {
                type: "bullets",
                items: [
                    "Reduces fake account networks",
                    "Limits impersonation-based scams",
                    "Improves long-term community safety and confidence",
                ],
            },

            {
                type: "note",
                text:
                    "Real Tick is for individuals. Business verification uses Gold/White tiers with additional protections and brand-focused controls.",
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

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-04T12:00:00Z",

        readMins: 16,
        bullets: [
            "Gold Tick for serious SMEs and operators",
            "White Tick for elite brands and high-trust visibility",
            "Everything in lower tiers, plus stronger protection and priority handling",
        ],
        content: [
            { type: "heading", text: "Business trust is different from personal trust" },
            {
                type: "paragraph",
                text:
                    "A business account is evaluated differently than a personal account. Customers need stable identity, predictable behavior, and accountability. The platform must reduce fraud risk and improve buyer confidence. That is why business verification has tiers—because different businesses carry different visibility, risk, and support needs.",
            },

            { type: "heading", text: "Gold Tick: built for SMEs and serious operators" },
            {
                type: "paragraph",
                text:
                    "Gold Tick is designed for businesses that need credibility and customer confidence without requiring the highest level of brand-specific protection. It fits SMEs, independent operators, and service providers who want to reduce impersonation, present legitimacy, and operate with better trust visibility inside the platform.",
            },
            {
                type: "bullets",
                items: [
                    "Stronger customer confidence signals",
                    "Reduced impersonation risk",
                    "Better positioning for serious commerce and service delivery",
                ],
            },

            { type: "heading", text: "White Tick: built for elite brands and high visibility" },
            {
                type: "paragraph",
                text:
                    "White Tick is reserved for elite brands and organizations with higher visibility and higher impersonation risk. The public impact of a fake account pretending to be a major brand is much larger. White Tick is designed to support that higher responsibility with stronger protections and priority handling.",
            },
            {
                type: "bullets",
                items: [
                    "Higher-trust visibility signals for high-profile brands",
                    "Enhanced brand protection posture",
                    "Priority review flows when protection is needed",
                ],
            },

            { type: "heading", text: "Everything in lower tiers, plus" },
            {
                type: "paragraph",
                text:
                    "A good tier system is cumulative: higher tiers include the baseline trust benefits, then add additional safeguards. That means if a business qualifies for White Tick, they should expect the trust foundations of Gold—plus more advanced controls and faster handling in situations that require platform intervention.",
            },

            { type: "heading", text: "Why tiers matter for community safety" },
            {
                type: "paragraph",
                text:
                    "Tiered verification is not only about status. It is about safety and clarity. When customers can quickly understand whether an account is a verified business—and which level of verification it holds—fraud becomes harder, impersonation becomes less effective, and the platform becomes more useful for real economic activity.",
            },

            {
                type: "note",
                text:
                    "If your business depends on reputation, the correct tier is the one that matches your risk exposure and visibility—not just what looks nice.",
            },
        ],
    },

    {
        slug: "music-together-while-chatting",
        category: "Features",
        title: "Music Together: play mutual music while chatting",
        subtitle:
            "A feature coming soon: start a shared music session with a friend and enjoy the same track in sync while you chat.",
        dateLabel: "Coming soon • Feature",

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-03T12:00:00Z",

        readMins: 12,
        bullets: [
            "Start a shared session with one tap",
            "Sync playback so both users hear the same moment",
            "Keep it lightweight so chat performance stays fast",
        ],
        content: [
            { type: "heading", text: "What Music Together is" },
            {
                type: "paragraph",
                text:
                    "Music Together is a shared listening experience inside 6chatting. Two people can listen to the same track in sync while messaging (and later, while calling). The point is to create a shared emotional timeline—so both users experience the same moment, not just the same song.",
            },

            { type: "heading", text: "Why it matters" },
            {
                type: "paragraph",
                text:
                    "A lot of relationships and friendships are built on shared moments. In modern communication, people often chat while listening to music separately. Music Together makes that shared context explicit. It improves bonding, reduces emotional distance, and adds a social layer that feels personal rather than performative.",
            },
            {
                type: "bullets",
                items: [
                    "Better bonding",
                    "Shared moments in real time",
                    "A lightweight social experience that does not distract from conversation",
                ],
            },

            { type: "heading", text: "How syncing should work (product principles)" },
            {
                type: "paragraph",
                text:
                    "The feature must be simple: start, invite, and listen. Syncing should be resilient under normal network conditions. The experience should avoid constant buffering, and it should never make the main chat experience slower. Music Together must feel like an enhancement, not a burden.",
            },
            {
                type: "bullets",
                items: [
                    "One tap to start a session",
                    "Clear indication of what’s playing and where you are in the track",
                    "Lightweight implementation that preserves chat performance",
                ],
            },

            {
                type: "note",
                text:
                    "Music Together is designed to strengthen real relationships, not to become noisy social content.",
            },
        ],
    },

    {
        slug: "6tv-watch-together",
        category: "Features",
        title: "6TV: watch films and videos together as a community",
        subtitle:
            "Coming soon: watch content together in a shared room—mutual, community, or solo viewing with chat integration.",
        dateLabel: "Coming soon • Feature",

        // ✅ ADD/EDIT THIS DATE WHEN YOU PUBLISH OR UPDATE THE POST
        publishedAt: "2026-01-02T12:00:00Z",

        readMins: 13,
        bullets: [
            "Mutual rooms for two people",
            "Community rooms for groups",
            "Chat and reactions synced to playback",
        ],
        content: [
            { type: "heading", text: "What 6TV is" },
            {
                type: "paragraph",
                text:
                    "6TV is a watch-together feature designed for shared viewing. Users can create a room, invite others, and watch synchronized playback while chatting. The core idea is simple: shared content becomes a shared conversation in real time.",
            },

            { type: "heading", text: "Room types: mutual, community, solo" },
            {
                type: "paragraph",
                text:
                    "Different viewing contexts require different room structures. Mutual rooms are optimized for two people. Community rooms are optimized for groups. Solo viewing exists because sometimes users want the same content experience without the social layer. The platform should support all three without forcing one mode on everyone.",
            },
            {
                type: "bullets",
                items: [
                    "Mutual rooms for two people",
                    "Community rooms for groups",
                    "Solo viewing when you want content without noise",
                ],
            },

            { type: "heading", text: "What makes 6TV valuable" },
            {
                type: "paragraph",
                text:
                    "The value of watch-together is not just the video. It is the shared timing and the integrated conversation. When chat is synchronized with playback, reactions make sense, messages feel contextual, and people feel present together—especially across distance.",
            },

            { type: "heading", text: "Product principles: keep it stable, keep it clear" },
            {
                type: "paragraph",
                text:
                    "6TV must be stable under real-world networks. Sync should not drift badly, and the UI must make it obvious what is happening. If someone joins late, the experience should handle it gracefully. The goal is reliability and clarity, not complexity.",
            },
            {
                type: "note",
                text:
                    "6TV is a community feature, but it is built on the same foundation as the rest of 6chatting: trust, stability, and clarity.",
            },
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
