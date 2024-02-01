const mongoose = require("mongoose");

const CommentBlogSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: [true, "Comment cannot be empty"],
    trim: true,
  },
  name: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
});

module.exports = mongoose.model("CommentBlog", CommentBlogSchema);
