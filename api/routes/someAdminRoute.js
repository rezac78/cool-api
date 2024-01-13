const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.status(200).json({ success: true, message: "Admin content" });
});

module.exports = router;
