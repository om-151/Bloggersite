import React, { useEffect, useState } from "react";
import BlogCard from "./BlogsCards";

export default function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/blogs");
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 mt-16">
            {/* Heading & Subheading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                    Explore Blogs
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Read trending articles, tips, and stories curated just for you.
                </p>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No blogs found.
                    </p>
                )}
            </div>
        </div>
    );
}
