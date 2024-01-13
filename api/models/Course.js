const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Course", CourseSchema);
