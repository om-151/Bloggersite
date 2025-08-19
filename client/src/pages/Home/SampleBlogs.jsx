import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LatestBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/blogs");
                const data = await res.json();

                // sort by latest (createdAt) and take only 5
                const latest = data
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);

                setBlogs(latest);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading)
        return <p className="text-center text-gray-500">Loading blogs...</p>;

    return (
        <section className="py-5 max-w-6xl mx-auto bg-gray-100">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                    Latest Blog Posts
                </h2>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="group relative rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#6438C0]"
                    >

                        <span className="absolute top-3 right-3 bg-[#6438C0] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                            NEW
                        </span>

                        {/* Blog Image */}
                        <div className="overflow-hidden">
                            <img
                                src={blog.imageUrl}
                                alt={blog.title}
                                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-[#6438C0] transition">
                                {blog.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                By{" "}
                                <span className="font-medium text-gray-700">
                                    {blog.user?.name}
                                </span>{" "}
                                • {new Date(blog.createdAt).toLocaleDateString()}
                            </p>

                            <div className="mt-4">
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="inline-flex items-center text-[#6438C0] font-medium hover:text-purple-800 transition"
                                >
                                    Read Blog
                                    <svg
                                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Read More Button */}
            <div className="text-center mt-12">
                <Link
                    to="/blogs"
                    className="px-6 py-3 rounded-xl bg-[#6438C0] text-white font-medium shadow-md hover:bg-purple-800 hover:shadow-lg transition-all duration-300"
                >
                    Explore More Blogs
                </Link>
            </div>
        </section>
    );
}
