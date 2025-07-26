import React, { useMemo, useState } from "react";

const BLOGS = [
    {
        id: "1",
        title: "Understanding React 19 Features",
        slug: "react-19-features",
        excerpt: "A quick tour through the biggest changes in React 19.",
        content: "React 19 brings Server Components stabilisation, Actions, and more…",
        category: "Frontend",
        tags: ["react", "javascript", "web"],
        author: "Jayu",
        publishedAt: "2025-07-10T10:00:00.000Z",
        reads: 1540,
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
    },
    {
        id: "2",
        title: "Node.js Best Practices for Production",
        slug: "nodejs-best-practices",
        excerpt: "From clustering to env separation and logging.",
        content: "Running Node.js in production requires attention to configuration, monitoring…",
        category: "Backend",
        tags: ["node", "express", "performance"],
        author: "Alex Doe",
        publishedAt: "2025-06-21T09:30:00.000Z",
        reads: 980,
    },
    {
        id: "3",
        title: "Mastering MongoDB Aggregations",
        slug: "mongodb-aggregations",
        excerpt: "Practical pipelines you’ll actually use.",
        content: "The aggregation framework is MongoDB’s superpower for analytics-like queries…",
        category: "Database",
        tags: ["mongodb", "database", "aggregation"],
        author: "Jayu",
        publishedAt: "2025-05-05T14:45:00.000Z",
        reads: 2130,
    },
    {
        id: "4",
        title: "Tailwind CSS Tips You Might Be Missing",
        slug: "tailwind-css-tips",
        excerpt: "Arbitrary values, containers, logical properties and more.",
        content: "Tailwind CSS enables rapid UI building, but there are lesser-known tricks…",
        category: "Frontend",
        tags: ["tailwind", "css", "ui"],
        author: "Priya Sharma",
        publishedAt: "2025-04-19T07:20:00.000Z",
        reads: 1250,
    },
];

export default function BlogsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortBy, setSortBy] = useState("newest");

    const categories = useMemo(
        () => ["all", ...Array.from(new Set(BLOGS.map((b) => b.category)))],
        []
    );

    const tags = useMemo(
        () => Array.from(new Set(BLOGS.flatMap((b) => b.tags))).sort(),
        []
    );

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearAll = () => {
        setSearch("");
        setCategory("all");
        setSelectedTags([]);
        setSortBy("newest");
    };

    const filteredBlogs = useMemo(() => {
        const q = search.trim().toLowerCase();

        let res = BLOGS.filter((b) => {
            const matchesSearch =
                !q ||
                b.title.toLowerCase().includes(q) ||
                b.excerpt.toLowerCase().includes(q) ||
                b.content.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q) ||
                b.tags.some((t) => t.toLowerCase().includes(q));

            const matchesCategory = category === "all" || b.category === category;

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((t) => b.tags.includes(t));

            return matchesSearch && matchesCategory && matchesTags;
        });

        res = res.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.publishedAt) - new Date(a.publishedAt);
                case "oldest":
                    return new Date(a.publishedAt) - new Date(b.publishedAt);
                case "most-read":
                    return b.reads - a.reads;
                case "least-read":
                    return a.reads - b.reads;
                default:
                    return 0;
            }
        });

        return res;
    }, [search, category, selectedTags, sortBy]);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Blogs
                </h1>
                <p className="mt-2 text-gray-600">
                    Search, filter and sort through blog posts.
                </p>
            </header>

            {/* Controls */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                <div className="bg-white shadow-sm rounded-xl p-4 md:p-6 space-y-4">
                    {/* Search + clear */}
                    <div className="flex flex-col md:flex-row gap-3 md:items-center">
                        <input
                            type="text"
                            placeholder="Search by title, content, author, or tag..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={clearAll}
                            className="inline-flex w-full md:w-auto items-center justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
                        >
                            Clear all
                        </button>
                    </div>

                    {/* Category + sort */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c === "all" ? "All categories" : c}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="newest">Sort: Newest first</option>
                            <option value="oldest">Sort: Oldest first</option>
                            <option value="most-read">Sort: Most read</option>
                            <option value="least-read">Sort: Least read</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => {
                                const active = selectedTags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1 rounded-full text-sm border transition ${active
                                                ? "bg-indigo-600 text-white border-indigo-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        #{tag}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Result count */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold">{filteredBlogs.length}</span>{" "}
                    {filteredBlogs.length === 1 ? "post" : "posts"}
                </p>
            </section>

            {/* Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No posts match your criteria.
                    </div>
                ) : (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredBlogs.map((b) => (
                            <li
                                key={b.id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
                            >
                                {b.cover && (
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={b.cover}
                                            alt={b.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-5 flex flex-col gap-3 flex-1">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <span className="inline-block px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                                            {b.category}
                                        </span>
                                        <span>•</span>
                                        <span>
                                            {new Date(b.publishedAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </span>
                                        <span>•</span>
                                        <span>{b.reads.toLocaleString()} reads</span>
                                    </div>

                                    <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                                        {b.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {b.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-4">
                                        <div className="flex flex-wrap gap-1">
                                            {b.tags.slice(0, 3).map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded"
                                                >
                                                    #{t}
                                                </span>
                                            ))}
                                            {b.tags.length > 3 && (
                                                <span className="text-xs text-gray-500">
                                                    +{b.tags.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        <button className="text-indigo-600 text-sm font-medium hover:underline">
                                            Read more →
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}
