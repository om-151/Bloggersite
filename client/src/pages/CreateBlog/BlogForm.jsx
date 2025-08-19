import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import toast from "react-hot-toast";

export default function BlogForm({ blogId = null, isEdit = false }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
            ],
        },
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description || description === "<p><br></p>")
            newErrors.description = "Description is required";
        if (!image && !isEdit) newErrors.image = "Image is required";
        if (tags.length === 0 || (tags.length === 1 && tags[0] === ""))
            newErrors.tags = "At least one tag is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        tags.forEach((tag) => formData.append("tags[]", tag));
        if (image) {
            formData.append("image", image);
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to create or edit a blog post.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/blogs${isEdit ? `/${blogId}` : ""}`,
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Something went wrong");

            toast.success(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
            navigate("/blogs");
        } catch (error) {
            console.error("Error submitting blog:", error.message);
            toast.error(error.message || "Failed to submit blog");
        }
    };

    useEffect(() => {
        const fetchBlog = async () => {
            if (isEdit && blogId) {
                try {
                    const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
                    const data = await response.json();
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setTags(data.tags || []);
                    if (data.imageUrl) {
                        setPreview(data.imageUrl);
                    }
                } catch (err) {
                    console.error("Failed to load blog for editing", err);
                }
            }
        };

        fetchBlog();
    }, [isEdit, blogId]);

    return (
        <div className="max-w-3xl mx-auto mt-20 mb-6 p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#6438C0]">
                {isEdit ? "Edit Blog Post" : "Create Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 shadow-sm transition focus:outline-none focus:ring-2 ${errors.title
                            ? "border-red-500 ring-red-300"
                            : "border-gray-300 focus:ring-[#6438C0]"
                            }`}
                        placeholder="Enter an engaging blog title..."
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill
                        theme="snow"
                        placeholder="Write your blog content here..."
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        className="bg-white rounded-lg"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-2">{errors.description}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Cover Image {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
            file:rounded-xl file:border-0 file:font-semibold 
            file:bg-[#6438C0]/10 file:text-[#6438C0] 
            hover:file:bg-[#6438C0]/20 cursor-pointer"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-4 w-full h-64 object-cover rounded-xl shadow-md"
                        />
                    )}
                    {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Tags <span className="text-red-500">*</span>
                    </label>
                    <ReactTagInput
                        tags={tags}
                        onChange={(newTags) => setTags(newTags)}
                        placeholder="Enter tags and press enter"
                    />
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-8 py-3 rounded-xl font-semibold shadow-md text-white bg-[#6438C0] hover:bg-purple-800 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                        {isEdit ? "Update Post" : "Create Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
