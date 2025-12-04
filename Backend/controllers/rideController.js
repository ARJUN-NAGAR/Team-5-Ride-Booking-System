const Ride = require('../models/Ride');
const User = require('../models/User');
const { getIO } = require('../socket/socketHandler'); // Connecting Ananya's logic

// --- 1. REQUEST RIDE (The Matching Algorithm) ---
exports.requestRide = async (req, res) => {
    const { riderId, pickup, drop } = req.body; // pickup = [lng, lat]

    try {
        // A. Calculate Fare (Math)
        const fare = Math.round(50 + (Math.random() * 100)); // Mock logic for speed

        // B. Create Ride in DB
        const newRide = await Ride.create({
            rider: riderId,
            pickup: { type: 'Point', coordinates: pickup },
            drop: { type: 'Point', coordinates: drop },
            fare,
            status: 'SEARCHING'
        });

        // C. FIND NEAREST DRIVERS (MongoDB Geospatial Query)
        const drivers = await User.find({
            role: 'driver',
            isAvailable: true,
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: pickup },
                    $maxDistance: 5000 // 5km Radius
                }
            }
        });

        // D. ALERT DRIVERS (Real-Time)
        if (drivers.length > 0) {
            const io = getIO();
            drivers.forEach(driver => {
                io.to(driver._id.toString()).emit('new_ride_request', {
                    rideId: newRide._id,
                    fare,
                    pickup, // Send coords so driver knows where to go
                    message: "New Passenger Nearby!"
                });
            });
        }

        res.json({ success: true, rideId: newRide._id, driversFound: drivers.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- 2. ACCEPT RIDE ---
exports.acceptRide = async (req, res) => {
    const { rideId, driverId } = req.body;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride || ride.status !== 'SEARCHING') {
            return res.status(400).json({ message: 'Ride already taken' });
        }

        // Assign Driver
        ride.driver = driverId;
        ride.status = 'ACCEPTED';
        await ride.save();

        // Mark Driver Busy
        await User.findByIdAndUpdate(driverId, { isAvailable: false });

        // Notify Rider
        const io = getIO();
        io.to(ride.rider.toString()).emit('ride_accepted', {
            rideId: ride._id,
            driverId,
            message: "Driver is coming!"
        });

        res.json({ success: true, ride });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// --- 3. COMPLETE RIDE ---
exports.completeRide = async (req, res) => {
    const { rideId } = req.body;
    try {
        const ride = await Ride.findByIdAndUpdate(rideId, { status: 'COMPLETED' }, { new: true });
        
        // Make driver available again
        await User.findByIdAndUpdate(ride.driver, { isAvailable: true });

        res.json(ride);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};