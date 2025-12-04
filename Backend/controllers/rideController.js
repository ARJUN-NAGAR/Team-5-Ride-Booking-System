const Ride = require('../models/ride.js');
const User = require('../models/User');
// IMPORT ANANYA'S SOCKET GETTER
const { getIO } = require('../socket/socketHandler'); 

// @desc    Driver accepts a ride
// @route   PUT /api/ride/accept
exports.acceptRide = async (req, res) => {
    const { rideId, driverId } = req.body;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) return res.status(404).json({ message: 'Ride not found' });
        if (ride.status !== 'SEARCHING') return res.status(400).json({ message: 'Ride already taken' });

        // 1. Update Ride Status
        ride.driver = driverId;
        ride.status = 'ACCEPTED';
        await ride.save();

        // 2. Mark Driver as Busy (Unavailable)
        await User.findByIdAndUpdate(driverId, { isAvailable: false });

        // 3. NOTIFY RIDER via SOCKET (The Integration!)
        const io = getIO(); 
        // We assume Rider joined a room with their own ID
        io.to(ride.rider.toString()).emit('ride_accepted', {
            rideId: ride._id,
            driverId: driverId,
            message: "A driver is on the way!"
        });

        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete the trip
// @route   PUT /api/ride/complete
exports.completeRide = async (req, res) => {
    const { rideId } = req.body;
    try {
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'COMPLETED' }, { new: true });
        
        // Make driver available again
        await User.findByIdAndUpdate(ride.driver, { isAvailable: true });

        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};