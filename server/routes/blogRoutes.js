const express = require("express");
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

module.exports = router;
