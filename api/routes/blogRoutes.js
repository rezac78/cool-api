const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createBlog, getAllBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

// Example routes for Blog
router.post('/', protect, authorize('admin'), createBlog);
router.get('/', getAllBlog);
router.put('/:id', protect, authorize('admin'), updateBlog);
router.delete('/:id', protect, authorize('admin'), deleteBlog);

module.exports = router;