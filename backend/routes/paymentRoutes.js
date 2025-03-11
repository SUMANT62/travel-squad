
const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Payment routes
router.post('/process', protect, processPayment);

module.exports = router;
