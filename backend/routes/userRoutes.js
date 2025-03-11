
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  getUserTrips,
  updateTripCount 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId/trips', getUserTrips);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.post('/increment-trip-count', protect, updateTripCount);

module.exports = router;
