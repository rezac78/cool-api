const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
  cardPhoto: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return urlPattern.test(value);
      },
      message: "Enter a valid URL for the Card photo",
    },
  },
  creatorName: {
    type: String,
    required: true,
  },
  creatorScope: {
    type: String,
    required: true,
  },
  creatorPhoto: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return urlPattern.test(value);
      },
      message: "Enter a valid URL for the creater photo",
    },
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  subject: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
