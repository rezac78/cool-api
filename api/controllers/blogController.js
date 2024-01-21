const BlogPost = require("../models/BlogPost");
const Comment = require("../models/CommentBlog");
const mongoose = require("mongoose");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const blogPost = await BlogPost.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Created successfully", data: blogPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get all blog posts
exports.getAllBlog = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json({ success: true, data: blogPosts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blogPost) {
      return res
        .status(404)
        .json({ success: false, error: "No blog post found with this ID" });
    }

    res
      .status(200)
      .json({ success: true, message: "َUpdate successfully", data: blogPost });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      error: error.message,
    });
  }
};
// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res
        .status(404)
        .json({ success: false, error: "No blog post found with this ID" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Create addComment
exports.addComment = async (req, res) => {
  try {
    const { comment, name, courseId } = req.body.data;
    const newComment = await Comment.create({
      blogId: courseId,
      comment,
      name,
    });
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
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send("Invalid Course ID");
    }
    const comments = await Comment.find({ blogId }).sort({ postedAt: -1 });
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
      blogId: courseId,
      comment,
      name,
      parentComment,
    });
    res.status(201).json({ success: true, data: newReply });
  } catch (error) {
    console.log(first)
    res.status(500).json({ success: false, error: error.message });
  }
};
