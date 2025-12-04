const Ride = require('../models/Ride');
const User = require('../models/User');
const { calculateFare, getDistance } = require('../utils/mapUtils');

exports.requestRide = async (req, res) => {
    const { riderId, pickup, drop } = req.body; // pickup/drop are [lat, lng]
    
    // 1. Calculate dummy fare
    const dist = getDistance(pickup[0], pickup[1], drop[0], drop[1]);
    const fare = calculateFare(dist);

    // 2. Create Ride
    const newRide = await Ride.create({
        rider: riderId,
        pickupLoc: pickup,
        dropLoc: drop,
        fare,
        status: 'SEARCHING'
    });

    // 3. Find Drivers within 5km
    const drivers = await User.find({
        role: 'driver',
        isAvailable: true,
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [pickup[1], pickup[0]] }, // Note: MongoDB uses [Long, Lat]
                $maxDistance: 5000 // meters
            }
        }
    });

    // Return drivers to frontend (or trigger socket here)
    res.json({ success: true, rideId: newRide._id, driversFound: drivers.length, fare });
};