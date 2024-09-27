const express = require('express');
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserById,
getTeachers,
  updateUserByAdmin,
} = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Admin routes
router.get('/', protect, roleMiddleware(['Admin']), getAllUsers); // Get all users (Admin only)
router.delete('/:id', protect, roleMiddleware(['Admin']), deleteUser); // Delete a user by ID (Admin only)
router.get('/:id', protect, roleMiddleware(['Admin']), getUserById); // Get user by ID (Admin only)
router.put('/:id', protect, roleMiddleware(['Admin']), updateUserByAdmin); 
router.get('/techers',  protect, getTeachers
); // Get all techers
// User routes
router.get('/profile', protect, getUserProfile); 
router.put('/profile', protect, updateUserProfile);

module.exports = router;
