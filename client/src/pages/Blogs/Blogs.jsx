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

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading blogs...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            {blogs.length > 0 ? (
                blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            ) : (
                <p className="col-span-full text-center text-gray-500">No blogs found.</p>
            )}
        </div>
    );
}