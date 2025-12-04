const User = require('../models/User');

// Get all unverified drivers
exports.getPendingDrivers = async (req, res) => {
    try {
        const drivers = await User.find({ role: 'driver', isVerified: false });
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify a driver
exports.verifyDriver = async (req, res) => {
    const { driverId } = req.body;
    try {
        await User.findByIdAndUpdate(driverId, { isVerified: true });
        res.status(200).json({ message: 'Driver Verified Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
