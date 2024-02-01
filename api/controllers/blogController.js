const BlogPost = require("../models/BlogPost");
const Comment = require("../models/CommentBlog");
const mongoose = require("mongoose");
const xssFilters = require("xss-filters");
function sanitizeInput(input) {
  return typeof input === "string" ? xssFilters.inHTMLData(input) : input;
}
// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const sanitizedBody = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = sanitizeInput(req.body[key]);
      return acc;
    }, {});
    const blogPost = await BlogPost.create(sanitizedBody);
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
    const blogsWithCommentsCount = await Promise.all(
      blogPosts.map(async (blog) => {
        const commentsCount = await Comment.countDocuments({
          blogId: blog._id,
        });
        return { ...blog._doc, commentsCount };
      })
    );
    res.status(200).json({ success: true, data: blogsWithCommentsCount });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const sanitizedBody = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = sanitizeInput(req.body[key]);
      return acc;
    }, {});
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      sanitizedBody,
      {
        new: true,
        runValidators: true,
      }
    );

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
  const { blogId } = req.params;
  try {
    const sanitizedData = {
      comment: sanitizeInput(req.body.data.comment),
      name: sanitizeInput(req.body.data.name),
      parentId: sanitizeInput(req.body.data.parentId),
      blogId: sanitizeInput(blogId),
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
    console.log(first);
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get postLike
exports.postLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user._id;
    const blogPost = await BlogPost.findById(blogId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    let message;
    if (blogPost.likes.includes(userId)) {
      blogPost.likes.pull(userId);
      message = "Blog post unliked successfully";
    } else {
      blogPost.likes.push(userId);
      message = "Blog post liked successfully";
    }
    await blogPost.save();
    res.status(200).json({
      message: message,
      data: blogPost,
    });
  } catch (error) {
    console.error("Error toggling like on the blog post:", error);
    res.status(500).json({ message: "Error toggling like on the blog post" });
  }
};