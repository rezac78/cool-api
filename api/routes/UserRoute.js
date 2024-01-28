// userRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  getUserDashboard,
  updateUser,
} = require("../controllers/userController");

router.get("/dashboard", protect, getUserDashboard);
router.put("/update", protect, updateUser);

module.exports = router;
