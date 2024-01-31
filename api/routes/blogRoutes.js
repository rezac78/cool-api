const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  addComment,
  getComments,
  postReply,
  postLike,
} = require("../controllers/blogController");
const { optionalAuth } = require("../middlewares/optionalAuthMiddleware");

// Example routes for Blog
router.post("/", protect, authorize("admin"), createBlog);
router.get("/", getAllBlog);
router.get("/:id", getBlogById);
router.put("/:id", protect, authorize("admin"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);
router.post("/comments", addComment);
router.get("/comments/:blogId", getComments);
router.post("/comments/reply", postReply);
router.put("/like/:id", optionalAuth, postLike);
module.exports = router;
