const Course = require("../models/Course");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const xssFilters = require("xss-filters");
const User = require("../models/User");
function sanitizeInput(input) {
  return typeof input === "string" ? xssFilters.inHTMLData(input) : input;
}
// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const sanitizedBody = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = sanitizeInput(req.body[key]);
      return acc;
    }, {});
    const course = await Course.create(sanitizedBody);
    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, error: "No course found with this ID" });
    }
    res
      .status(200)
      .json({ success: true, message: "َUpdate successfully", data: course });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      error: error.message,
    });
  }
};
// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "No course found with this ID" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Delete a Chapter by ID
exports.deleteChapter = async (req, res) => {
  try {
    const { courseId, chapterId } = req.params;
    await Course.updateOne(
      { _id: courseId },
      { $pull: { chapters: { _id: chapterId } } }
    );
    res
      .status(200)
      .json({ success: true, message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    console.log(req.user);
    let isPurchased = false;
    if (req.user) {
      const user = await User.findById(req.user._id);
      if (user && user.purchasedCourses.includes(courseId)) {
        isPurchased = true;
      }
    }
    res
      .status(200)
      .json({ success: true, data: { ...course._doc, isPurchased } });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Error fetching course data" });
  }
};
// Create addComment
exports.addComment = async (req, res) => {
  try {
    const sanitizedData = {
      comment: sanitizeInput(req.body.data.comment),
      name: sanitizeInput(req.body.data.name),
      courseId: sanitizeInput(req.body.data.courseId),
    };
    const newComment = await Comment.create(sanitizedData);
    res.status(200).json({
      data: newComment,
      success: true,
      message: "Comment Created successfully",
    });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "Error posting comment" });
  }
};
// Get all CommentCourse
exports.getComments = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).send("Invalid Course ID");
    }
    const comments = await Comment.find({ courseId }).sort({ postedAt: -1 });
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, error: "Error fetching comments" });
  }
};
// Get postReply
exports.postReply = async (req, res) => {
  try {
    const { comment, name, parentComment, courseId } = req.body;
    const newReply = await Comment.create({
      courseId,
      comment,
      name,
      parentComment,
    });
    res.status(201).json({ success: true, data: newReply });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
