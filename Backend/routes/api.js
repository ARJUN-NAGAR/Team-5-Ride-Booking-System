const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Direct use for simple updates
const rideController = require('../controllers/rideController');
const authController = require('../controllers/authController'); // Assume you have this from previous steps

// --- AUTH ---
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// --- RIDE FLOW ---
router.post('/ride/request', rideController.requestRide);
router.put('/ride/accept', rideController.acceptRide);
router.put('/ride/complete', rideController.completeRide);

// --- DRIVER OPS ---
// Toggle Online/Offline
router.put('/driver/status', async (req, res) => {
    const { driverId, status } = req.body;
    await User.findByIdAndUpdate(driverId, { isAvailable: status });
    res.json({ success: true });
});

// Update Location (Persistence)
router.put('/driver/location', async (req, res) => {
    const { driverId, lat, lng } = req.body;
    await User.findByIdAndUpdate(driverId, {
        location: { type: 'Point', coordinates: [lng, lat] }
    });
    res.send("Location Saved");
});

// --- HISTORY ---
router.get('/ride/history', async (req, res) => {
    const { userId } = req.query;
    // Simple mock history fetch
    const Ride = require('../models/ride');
    const history = await Ride.find({ $or: [{ rider: userId }, { driver: userId }] });
    res.json(history);
});

module.exports = router;