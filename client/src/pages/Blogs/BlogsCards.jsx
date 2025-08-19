import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function BlogCard({ blog }) {
    const { _id, title, image, user, createdAt } = blog;
    const navigate = useNavigate();
    const [showIcons, setShowIcons] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const isOwner = loggedInUser?.id === user?._id;

    const formatDate = (dateStr) => {
        const today = new Date();
        const date = new Date(dateStr);
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Today";
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:3000/api/blogs/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Delete failed");

            toast.success("Blog deleted successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete blog. Please try again.");
        }
    };

    return (
        <div
            className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 border border-gray-200 hover:border-[#6438C0] transition-all duration-300 flex flex-col"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            {/* Owner Actions (Edit/Delete) */}
            {isOwner && showIcons && (
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                        onClick={() => navigate(`/edit/${_id}`)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-purple-100 transition cursor-pointer"
                        title="Edit"
                    >
                        <FiEdit2 className="text-[#6438C0]" />
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition cursor-pointer"
                        title="Delete"
                    >
                        <FiTrash2 className="text-red-600" />
                    </button>
                </div>
            )}

            {/* Blog Image */}
            <div className="overflow-hidden">
                <img
                    src={`http://localhost:3000/uploads/${image}`}
                    alt="blog cover"
                    className="w-full h-52 object-cover rounded-t-2xl transform hover:scale-105 transition duration-500"
                />
            </div>

            {/* Blog Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h2
                    onClick={() => navigate(`/blogs/${_id}`)}
                    className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-[#6438C0] cursor-pointer transition"
                >
                    {title}
                </h2>

                {/* Footer */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                        <span className="font-medium">{user?.name || "Unknown"}</span>
                        <span>{formatDate(createdAt)}</span>
                    </div>

                    <div className="mt-4">
                        <Link
                            to={`/blogs/${_id}`}
                            className="inline-flex items-center text-[#6438C0] font-medium hover:text-purple-800 transition group"
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

            {/* Delete Confirmation Modal */}
            {showConfirm && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 px-10">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center">
                        <p className="text-lg font-medium mb-4">
                            Do you want to delete this blog?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
