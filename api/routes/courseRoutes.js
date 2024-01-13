const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createCourse, getAllCourses, updateCourse, deleteCourse } = require('../controllers/courseController');

// Example routes for courses
router.post('/course/', protect, authorize('admin'), createCourse);
router.get('/course/', getAllCourses);
router.put('/course/:id', protect, authorize('admin'), updateCourse);
router.delete('/course/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;
