const express = require("express");
const { protect, authorize } = require("../middlewares/authMiddleware");
const {
  getAdminDashboard,
  updateAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), getAdminDashboard);
router.put("/update", protect, authorize("admin"), updateAdmin);

module.exports = router;
