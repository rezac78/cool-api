const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createBlog, getAllBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

// Example routes for Blog
router.post('/blog/', protect, authorize('admin'), createBlog);
router.get('/blog/', getAllBlog);
router.put('/blog/:id', protect, authorize('admin'), updateBlog);
router.delete('/blog/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;
