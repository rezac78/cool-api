const User = require("../models/User");
const mongoose = require("mongoose");
// userController.js
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("purchasedCourses");
    const purchasedCoursesWithCount = await Promise.all(
      user.purchasedCourses.map(async (course) => {
        const purchaseCount = await User.countDocuments({
          purchasedCourses: course._id,
        });
        return { ...course._doc, purchaseCount };
      })
    );
    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: {
        ...user._doc,
        purchasedCourses: purchasedCoursesWithCount,
      },
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.updateUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (password) {
      user.password = password;
      user.markModified("password");
    }
    await user.save();
    res
      .status(201)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", success: false });
  }
};
exports.purchaseCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseIds } = req.body;
    if (!courseIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid course IDs" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.purchasedCourses.push(...courseIds);
    await user.save();
    res
      .status(200)
      .json({ message: "Courses purchased successfully", success: true });
  } catch (error) {
    console.error("Error in purchaseCourses:", error);
    res
      .status(500)
      .json({ message: "Error processing purchase", success: false });
  }
};
