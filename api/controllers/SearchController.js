const Course = require("../models/Course");
// searchController.js
exports.PartSearch = async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const searchResults = await Course.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { courseType: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.status(201).json({
      success: true,
      message: "search successfully",
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error searching courses", error: error.message });
  }
};
