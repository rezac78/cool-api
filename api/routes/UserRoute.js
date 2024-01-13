// userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getUserDashboard } = require('../controllers/userController');

router.get('/dashboard', protect, getUserDashboard);

module.exports = router;
