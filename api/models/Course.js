const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  },
  prerequisites: {
    type: String,
    required: true,
  },
  courseLanguage: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return urlPattern.test(value);
      },
      message: "Enter a valid URL for the Poster",
    },
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coursePhoto: {
    type: String,
    validate: {
      validator: function (value) {
        const urlPattern = /^https?:\/\/\S+/;
        return urlPattern.test(value);
      },
      message: "Enter a valid URL for the Course photo",
    },
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  instructorScope: {
    type: String,
    required: true,
  },
  chapters: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        validate: {
          validator: function (value) {
            const urlPattern = /^https?:\/\/\S+/;
            return urlPattern.test(value);
          },
          message: "Enter a valid URL for the Chapter video",
        },
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
