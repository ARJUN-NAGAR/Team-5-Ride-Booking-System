const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authController');
const rideController = require('../controllers/rideController');
const driverController = require('../controllers/driverController');

// --- Routes ---

// Auth (Ankur)
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// Ride (Arjun)
router.post('/ride/request', rideController.requestRide);
// router.put('/ride/accept', rideController.acceptRide); // Add this when Arjun finishes accept logic

// Driver (Arsh)
router.put('/driver/status', driverController.toggleStatus);
router.put('/driver/location', driverController.updateLocation);

module.exports = router;