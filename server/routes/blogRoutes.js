const express = require("express");
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");
const upload = require("../middlewares/upload");

const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.post("/", authenticate, upload.single("image"), createBlog);
router.put("/:id", authenticate, upload.single("image"), updateBlog);
router.delete("/:id", authenticate, deleteBlog);

module.exports = router;
