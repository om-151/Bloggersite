const Blog = require("../models/Blog");

// CREATE
exports.createBlog = async (req, res) => {
    const { title, description, image, tags } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const blog = new Blog({
            title,
            description,
            image,
            tags,
            user: req.user.id
        });

        const saved = await blog.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ALL
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ ONE
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('user', 'name email');
        if (!blog) return res.status(404).json({ message: "Not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateBlog = async (req, res) => {
    const { title, description, image, tags } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Not found" });

        // Check ownership
        if (blog.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.image = image || blog.image;
        blog.tags = tags || blog.tags;

        const updated = await blog.save();
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Not found" });

        // Check ownership
        if (blog.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await blog.deleteOne();
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
