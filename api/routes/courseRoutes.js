const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createCourse, getAllCourses, updateCourse, deleteCourse } = require('../controllers/courseController');

// Example routes for courses
router.post('/', protect, authorize('admin'), createCourse);
router.get('/', getAllCourses);
router.put('/:id', protect, authorize('admin'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
