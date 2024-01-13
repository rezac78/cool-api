const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date, 
    required: true,
  },
  tags: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
