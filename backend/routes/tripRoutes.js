
const express = require('express');
const router = express.Router();
const { 
  getTrips, 
  getTripById, 
  createTrip, 
  joinTrip 
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getTrips);
router.get('/:id', getTripById);

// Protected routes
router.post('/', protect, createTrip);
router.post('/:id/join', protect, joinTrip);

module.exports = router;
