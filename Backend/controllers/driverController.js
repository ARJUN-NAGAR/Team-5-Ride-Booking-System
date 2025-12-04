const User = require('../models/User');

// @desc    Toggle Driver Availability
// @route   PUT /api/driver/status
exports.toggleStatus = async (req, res) => {
    const { driverId, status } = req.body; // status: true (Online) or false (Offline)

    try {
        const driver = await User.findByIdAndUpdate(
            driverId, 
            { isAvailable: status },
            { new: true }
        );
        res.json({ message: `Driver is now ${status ? 'Online' : 'Offline'}`, isAvailable: driver.isAvailable });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Driver Current Location (called periodically by frontend background task)
// @route   PUT /api/driver/location
exports.updateLocation = async (req, res) => {
    const { driverId, lat, lng } = req.body;
    try {
        await User.findByIdAndUpdate(driverId, {
            location: {
                type: 'Point',
                coordinates: [parseFloat(lng), parseFloat(lat)]
            }
        });
        res.status(200).send(); // Send 200 OK fast
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
