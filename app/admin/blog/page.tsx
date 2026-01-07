// app/admin/blog/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BlogPostRow = {
    id: string;
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    cover_label: string | null;
    read_mins: number;
    bullets: any[];
    content: any[];
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

function cx(...parts: Array<string | false | undefined | null>) {
    return parts.filter(Boolean).join(" ");
}

const BevelCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={cx("water-bevel", className)}>{children}</div>
);

const Pill = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cx(
            "inline-flex max-w-full items-center justify-center rounded-full",
            "border border-black/10 bg-white/95 px-3 py-2",
            "text-xs font-semibold text-black/90 text-center leading-snug",
            "whitespace-normal break-words",
            "shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]",
            className
        )}
    >
        {children}
    </span>
);

const Button = ({
    children,
    onClick,
    variant = "default",
    className = "",
    disabled,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "primary" | "danger";
    className?: string;
    disabled?: boolean;
}) => {
    const base =
        "water-btn inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold tracking-[-0.01em] select-none";
    const primary = "water-btn-primary";
    const danger =
        "border border-black/10 bg-white/95 text-red-700 shadow-[6px_6px_14px_rgba(0,0,0,0.10),_-6px_-6px_14px_rgba(255,255,255,0.95)]";
    return (
        <button
            className={cx(base, variant === "primary" && primary, variant === "danger" && danger, className)}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

const CATEGORY_OPTIONS = [
    "Launch",
    "Translation",
    "Trust",
    "Calls",
    "Business",
    "Safety",
    "Social",
    "Stories",
    "Music",
    "6TV",
];

function prettyDate(iso: string) {
    const d = new Date(iso);
    try {
        return new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        }).format(d);
    } catch {
        return d.toISOString();
    }
}

function defaultContentFromBullets(bullets: string[]) {
    return [
        { type: "heading", text: "Overview" },
        { type: "paragraph", text: "Write your overview here." },
        { type: "heading", text: "Key points" },
        { type: "bullets", items: bullets },
        { type: "note", text: "Optional note (remove if not needed)." },
    ];
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPostRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // editor state
    const [editingId, setEditingId] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
    const [coverLabel, setCoverLabel] = useState<string>("");
    const [readMins, setReadMins] = useState<number>(5);

    const [bulletsText, setBulletsText] = useState<string>(""); // one per line
    const [contentJson, setContentJson] = useState<string>(""); // JSON sections

    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [publishedAt, setPublishedAt] = useState<string>(""); // ISO string input optional

    const sorted = useMemo(() => {
        return [...posts].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }, [posts]);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const res = await fetch("/api/admin/blog", { cache: "no-store" });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Failed to load");
            setPosts(data.posts || []);
        } catch (e: any) {
            setErr(e?.message ?? "Failed to load posts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    function resetEditor() {
        setEditingId(null);
        setTitle("");
        setSubtitle("");
        setSlug("");
        setCategory(CATEGORY_OPTIONS[0]);
        setCoverLabel("");
        setReadMins(5);
        setBulletsText("");
        setContentJson("");
        setStatus("draft");
        setPublishedAt("");
    }

    function startCreate() {
        resetEditor();
        setCoverLabel("Update • Blog");
    }

    function startEdit(p: BlogPostRow) {
        setEditingId(p.id);
        setTitle(p.title);
        setSubtitle(p.subtitle);
        setSlug(p.slug);
        setCategory(p.category);
        setCoverLabel(p.cover_label ?? "");
        setReadMins(p.read_mins ?? 5);
        setBulletsText((p.bullets || []).join("\n"));
        setContentJson(JSON.stringify(p.content || [], null, 2));
        setStatus(p.status);
        setPublishedAt(p.published_at ?? "");
    }

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/blog/login";
    }

    async function save() {
        setSaving(true);
        setErr(null);
        try {
            const bullets = bulletsText
                .split("\n")
                .map((x) => x.trim())
                .filter(Boolean);

            let content: any[] = [];
            if (contentJson.trim()) {
                content = JSON.parse(contentJson);
            } else {
                content = defaultContentFromBullets(bullets);
            }

            const payload: any = {
                id: editingId ?? undefined,
                slug: slug || slugify(title),
                category,
                title,
                subtitle,
                cover_label: coverLabel || null,
                read_mins: readMins,
                bullets,
                content,
                status,
                published_at: publishedAt || null,
            };

            const res = await fetch("/api/admin/blog", {
                method: editingId ? "PUT" : "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Save failed");

            await load();
            resetEditor();
        } catch (e: any) {
            setErr(e?.message ?? "Save failed");
        } finally {
            setSaving(false);
        }
    }

    async function remove(id: string) {
        const yes = confirm("Delete this post permanently?");
        if (!yes) return;
        setErr(null);
        try {
            const res = await fetch("/api/admin/blog", {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || "Delete failed");
            await load();
            if (editingId === id) resetEditor();
        } catch (e: any) {
            setErr(e?.message ?? "Delete failed");
        }
    }

    return (
        <main className="mx-auto w-[min(1160px,calc(100%-24px))] pb-14 pt-6 sm:pt-10">
            {/* Header */}
            <BevelCard className="p-6 sm:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <Pill>Admin • Blog</Pill>
                            <Pill>Draft + Published</Pill>
                            <Pill>Server-driven</Pill>
                        </div>

                        <h1 className="mt-3 text-[clamp(22px,3.8vw,34px)] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>
                            Publish updates that appear instantly on /blog
                        </h1>

                        <p className="mt-2 text-[13.5px] leading-[1.85] text-neutral-700">
                            Create or edit a post below. When you set status to <b>published</b>, it will show on the public blog and “Read more” will open the full article.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link className="water-btn inline-flex items-center justify-center px-5 py-3 text-sm font-semibold" href="/blog">
                            View public blog
                        </Link>
                        <Button onClick={logout} variant="danger" className="px-5">
                            Logout
                        </Button>
                    </div>
                </div>

                {err ? (
                    <div className="mt-4 rounded-2xl border border-black/10 bg-white/90 p-4 text-[12.5px] font-semibold text-red-700 shadow-[8px_8px_18px_rgba(0,0,0,0.06),_-8px_-8px_18px_rgba(255,255,255,0.95)]">
                        {err}
                    </div>
                ) : null}
            </BevelCard>

            {/* Editor + List */}
            <section className="mt-4 grid gap-4 lg:grid-cols-[1fr_.95fr]">
                {/* Editor */}
                <BevelCard className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                {editingId ? "Edit post" : "Create new post"}
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-600">
                                Same premium style as your blog cards. Paste JSON content or let it auto-generate from bullets.
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={startCreate}>New</Button>
                            <Button onClick={resetEditor} className="px-5">
                                Clear
                            </Button>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                        <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <div className="text-[12px] font-semibold text-neutral-600">Title</div>
                            <input
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (!editingId && !slug) setSlug(slugify(e.target.value));
                                }}
                                className="mt-1 w-full bg-transparent text-[14px] font-extrabold outline-none"
                                placeholder="Post title"
                            />
                        </label>

                        <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <div className="text-[12px] font-semibold text-neutral-600">Subtitle</div>
                            <textarea
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="mt-1 w-full bg-transparent text-[13.5px] font-semibold outline-none"
                                rows={3}
                                placeholder="Short summary under the title"
                            />
                        </label>

                        <div className="grid gap-3 md:grid-cols-2">
                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Slug</div>
                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="mt-1 w-full bg-transparent text-[13.5px] font-extrabold outline-none"
                                    placeholder="my-post-slug"
                                />
                            </label>

                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Category</div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 w-full bg-transparent text-[13.5px] font-extrabold outline-none"
                                >
                                    {CATEGORY_OPTIONS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Cover label (pill)</div>
                                <input
                                    value={coverLabel}
                                    onChange={(e) => setCoverLabel(e.target.value)}
                                    className="mt-1 w-full bg-transparent text-[13.5px] font-extrabold outline-none"
                                    placeholder="Update • Feature"
                                />
                            </label>

                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Read mins</div>
                                <input
                                    type="number"
                                    value={readMins}
                                    onChange={(e) => setReadMins(Number(e.target.value))}
                                    className="mt-1 w-full bg-transparent text-[13.5px] font-extrabold outline-none"
                                    min={1}
                                />
                            </label>
                        </div>

                        <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <div className="text-[12px] font-semibold text-neutral-600">Bullets (one per line)</div>
                            <textarea
                                value={bulletsText}
                                onChange={(e) => setBulletsText(e.target.value)}
                                className="mt-1 w-full bg-transparent text-[13px] font-semibold outline-none"
                                rows={5}
                                placeholder={"Point 1\nPoint 2\nPoint 3"}
                            />
                        </label>

                        <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                            <div className="text-[12px] font-semibold text-neutral-600">Content JSON (sections)</div>
                            <textarea
                                value={contentJson}
                                onChange={(e) => setContentJson(e.target.value)}
                                className="mt-1 w-full bg-transparent text-[12.5px] font-semibold outline-none"
                                rows={10}
                                placeholder={`[
  { "type": "heading", "text": "Overview" },
  { "type": "paragraph", "text": "..." },
  { "type": "bullets", "items": ["..."] },
  { "type": "note", "text": "..." }
]`}
                            />
                            <div className="mt-2 text-[12px] font-medium text-neutral-600 leading-[1.7]">
                                If you leave this empty, it auto-generates a clean article from your bullets.
                            </div>
                        </label>

                        <div className="grid gap-3 md:grid-cols-2">
                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Status</div>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="mt-1 w-full bg-transparent text-[13.5px] font-extrabold outline-none"
                                >
                                    <option value="draft">draft</option>
                                    <option value="published">published</option>
                                </select>
                                <div className="mt-2 text-[12px] font-medium text-neutral-600 leading-[1.7]">
                                    Published posts show on /blog. Drafts are hidden from public.
                                </div>
                            </label>

                            <label className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[10px_10px_22px_rgba(0,0,0,0.06),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                <div className="text-[12px] font-semibold text-neutral-600">Published at (optional ISO)</div>
                                <input
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                    className="mt-1 w-full bg-transparent text-[13px] font-semibold outline-none"
                                    placeholder="Leave empty to publish as ‘now’"
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button variant="primary" onClick={save} disabled={saving || !title || !subtitle || !category}>
                                {saving ? "Saving…" : editingId ? "Update post" : "Create post"}
                            </Button>

                            <Link
                                className="water-btn inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
                                href={slug ? `/blog/${slug}` : "/blog"}
                                target="_blank"
                            >
                                Preview
                            </Link>
                        </div>
                    </div>
                </BevelCard>

                {/* Posts list */}
                <BevelCard className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                                All posts
                            </div>
                            <div className="mt-1 text-[12.5px] font-medium text-neutral-600">
                                {loading ? "Loading…" : `${posts.length} total`} • newest updates on top
                            </div>
                        </div>
                        <Button onClick={load} className="px-5">
                            Refresh
                        </Button>
                    </div>

                    <div className="mt-5 grid gap-3">
                        {sorted.map((p) => (
                            <div
                                key={p.id}
                                className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]"
                            >
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-extrabold">
                                        {p.status.toUpperCase()}
                                    </span>
                                    <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                        {p.category}
                                    </span>
                                    <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                        updated {prettyDate(p.updated_at)}
                                    </span>
                                    {p.published_at ? (
                                        <span className="inline-flex rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-700">
                                            published {prettyDate(p.published_at)}
                                        </span>
                                    ) : null}
                                </div>

                                <div className="mt-3 text-[14px] font-extrabold leading-[1.35]" style={{ fontFamily: "var(--font-display)" }}>
                                    {p.title}
                                </div>
                                <div className="mt-1 text-[12.5px] font-medium leading-[1.7] text-neutral-700">
                                    {p.subtitle}
                                </div>

                                <div className="mt-3 text-[12px] font-semibold text-neutral-600">
                                    /blog/{p.slug}
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Button onClick={() => startEdit(p)} variant="primary">
                                        Edit
                                    </Button>
                                    <Link className="water-btn inline-flex items-center justify-center px-4 py-3 text-sm font-semibold" href={`/blog/${p.slug}`} target="_blank">
                                        View
                                    </Link>
                                    <Button onClick={() => remove(p.id)} variant="danger">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {sorted.length === 0 && !loading ? (
                            <div className="rounded-3xl border border-black/10 bg-white/85 p-5 text-[13px] font-semibold text-neutral-700 shadow-[10px_10px_22px_rgba(0,0,0,0.08),_-10px_-10px_22px_rgba(255,255,255,0.95)]">
                                No posts yet. Click “New” and create your first blog post.
                            </div>
                        ) : null}
                    </div>
                </BevelCard>
            </section>

            <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .water-bevel {
            transform: translateZ(0);
          }
        }
      `}</style>
        </main>
    );
}
