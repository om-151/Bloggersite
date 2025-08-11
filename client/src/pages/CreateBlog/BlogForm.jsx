import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

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

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description || description === "<p><br></p>") newErrors.description = "Description is required";
        if (!image && !isEdit) newErrors.image = "Image is required";
        if (tags.length === 0 || (tags.length === 1 && tags[0] === "")) newErrors.tags = "At least one tag is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        let base64Image = preview; // use existing preview as fallback
        if (image) {
            try {
                base64Image = await toBase64(image);
            } catch (err) {
                console.error("Image conversion failed:", err);
                return;
            }
        }

        const blogData = {
            title,
            description,
            image: base64Image,
            tags,
        };

        const token = localStorage.getItem("token");
        if (!token) {
            alert("User is not authenticated!");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/blogs${isEdit ? `/${blogId}` : ""}`,
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(blogData),
                }
            );

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Something went wrong");

            alert(isEdit ? "Blog updated successfully!" : "Blog created successfully!");
            navigate("/blogs");
        } catch (error) {
            console.error("Error submitting blog:", error.message);
            alert(error.message);
        }
    };

    // Fetch blog data if editing
    useEffect(() => {
        const fetchBlog = async () => {
            if (isEdit && blogId) {
                try {
                    const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
                    const data = await response.json();
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setTags(data.tags || []);
                    setPreview(data.image || null);
                } catch (err) {
                    console.error("Failed to load blog for editing", err);
                }
            }
        };

        fetchBlog();
    }, [isEdit, blogId]);

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold my-6 text-center text-gray-800">
                {isEdit ? "Edit Blog Post" : "Create Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${errors.title ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-blue-500"
                            }`}
                        placeholder="Enter blog title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill
                        theme="snow"
                        placeholder="Write your blog content here..."
                        value={description}
                        onChange={setDescription}
                        modules={modules}
                        className="bg-white"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Cover Image {!isEdit && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {preview && (
                        <img src={preview} alt="Preview" className="mt-4 w-full h-64 object-cover rounded-md shadow-sm" />
                    )}
                    {errors.image && <p className="text-red-500 text-sm mt-2">{errors.image}</p>}
                </div>

                {/* Tags Input */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
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
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                        {isEdit ? "Update Post" : "Create Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
