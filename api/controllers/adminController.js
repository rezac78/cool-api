const User = require("../models/User");
// adminController.js
exports.getAdminDashboard = async (req, res) => {
  // Logic to fetch data relevant to admin dashboard
  res.status(200).json({
    success: true,
    data: {
      /* admin data */
    },
  });
};

exports.updateAdmin = async (req, res) => {
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