import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function BlogCard({ blog }) {
    const { _id, title, image, user, createdAt } = blog;
    const navigate = useNavigate();
    const [showIcons, setShowIcons] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Get logged-in user ID from localStorage
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

            alert("Blog deleted successfully.");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Failed to delete blog.");
        }
    };

    return (
        <div
            className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
        >
            {/* Show Edit/Delete only if logged-in user is the blog owner */}
            {isOwner && showIcons && (
                <div className="absolute top-2 right-2 flex gap-2 z-100">
                    <button
                        onClick={() => navigate(`/edit/${_id}`)}
                        className="p-2 bg-white rounded-full shadow hover:bg-blue-100 cursor-pointer"
                        title="Edit"
                    >
                        <FiEdit2 className="text-blue-600" />
                    </button>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="p-2 bg-white rounded-full shadow hover:bg-red-100 cursor-pointer"
                        title="Delete"
                    >
                        <FiTrash2 className="text-red-600" />
                    </button>
                </div>
            )}

            {/* Blog Image */}
            <img
                src={image?.startsWith("data:image") ? image : `data:image/jpeg;base64,${image}`}
                alt="blog cover"
                className="w-full h-48 object-cover"
            />

            {/* Blog Content */}
            <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-3">
                    {title}
                </h2>

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{user?.name || "Unknown"}</span>
                    <span>{formatDate(createdAt)}</span>
                </div>

                <button
                    onClick={() => navigate(`/blogs/${_id}`)}
                    className="mt-2 w-fit text-sm text-blue-600 hover:underline cursor-pointer"
                >
                    Read More →
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showConfirm && (
                <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-20 px-10">
                    <div className="bg-white p-6 rounded-xl shadow-xl text-center">
                        <p className="text-lg font-medium mb-4">
                            Do you want to delete this blog?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
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
