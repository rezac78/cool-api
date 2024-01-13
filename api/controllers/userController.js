// userController.js
exports.getUserDashboard = async (req, res) => {
  // Logic to fetch user-specific data, such as purchased courses
  res.status(200).json({
    success: true,
    data: {
      /* user data */
    },
  });
};
