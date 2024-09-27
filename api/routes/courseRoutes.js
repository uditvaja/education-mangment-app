const express = require('express');
const { createCourse, getCourses, updateCourse, deleteCourse, enrollStudents, getCourseById } = require('../controllers/courseController');
const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

router
  .route('/')
  .post(protect, roleMiddleware(['Admin']), createCourse)
  .get(protect, getCourses);

// Route for enrolling students in a course
router.patch('/:id/enroll', protect, roleMiddleware(['Admin']), enrollStudents);

// Route for fetching a course by its ID
router.get('/:id', protect, getCourseById); // Add this line

router
  .route('/:id')
  .put(protect, roleMiddleware(['Admin']), updateCourse)
  .delete(protect, roleMiddleware(['Admin']), deleteCourse);

module.exports = router;
