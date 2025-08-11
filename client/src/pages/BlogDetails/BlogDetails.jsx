import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
                if (!res.ok) throw new Error("Blog not found");
                const data = await res.json();
                setBlog(data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Loader
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Error
    if (error) {
        return <div className="text-center py-20 text-red-600">{error}</div>;
    }

    if (!blog) return null;

    return (
        <div className="w-full mt-16">
            {/* Full-width Cover Image */}
            <div className="w-full h-[500px] overflow-hidden">
                <img
                    src={
                        blog.image?.startsWith("data:image")
                            ? blog.image
                            : `data:image/jpeg;base64,${blog.image}`
                    }
                    alt="Blog cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 py-12">
                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {blog.title}
                </h1>

                <div className="text-sm text-gray-500 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span>
                        By{" "}
                        <span className="font-medium text-gray-700">
                            {blog.user?.name || "Unknown Author"}
                        </span>
                    </span>
                    <span>{formatDate(blog.createdAt)}</span>
                </div>

                <article
                    className="prose max-w-none prose-lg prose-slate prose-headings:text-gray-800 prose-img:rounded-lg prose-a:text-blue-600 hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
            </section>
        </div>
    );
}
