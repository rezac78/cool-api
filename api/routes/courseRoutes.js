const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  deleteChapter,
  getCourseById,
  addComment,
  getComments,
  postReply,
} = require("../controllers/courseController");

// Example routes for courses
router.post("/", protect, authorize("admin"), createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", protect, authorize("admin"), updateCourse);
router.delete("/:id", protect, authorize("admin"), deleteCourse);
router.delete(
  "/:courseId/chapter/:chapterId",
  protect,
  authorize("admin"),
  deleteChapter
);
router.post("/comments", addComment);
router.get("/comments/:courseId", getComments);
router.post("/comments/reply", postReply);
module.exports = router;
