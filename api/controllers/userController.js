const User = require("../models/User");
const bcrypt = require("bcryptjs");
// userController.js
exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: user,
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
