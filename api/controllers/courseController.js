const Course = require("../models/Course");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
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
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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
    res
      .status(200)
      .json({ success: true, message: "Deleted successfully"});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Delete a course by ID
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
