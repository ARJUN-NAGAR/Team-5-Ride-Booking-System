const Ride = require('../models/ride');
const User = require('../models/User');
const { getIO } = require('../socket/socketHandler');

// --- 1. REQUEST RIDE (The Matching Algorithm) ---
exports.requestRide = async (req, res) => {
    const { riderId, pickup, drop } = req.body;

    try {
        // A. Calculate Fare
        const fare = Math.round(50 + (Math.random() * 100));

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

        console.log(`Found ${drivers.length} drivers near pickup location`);

        // D. ALERT DRIVERS (Real-Time)
        if (drivers.length > 0) {
            const io = getIO();
            drivers.forEach(driver => {
                console.log(`Sending request to driver: ${driver._id}`);
                io.to(driver._id.toString()).emit('new_ride_request', {
                    rideId: newRide._id,
                    fare,
                    pickup,
                    message: "New Passenger Nearby!"
                });
            });
            res.json({ success: true, rideId: newRide._id, driversFound: drivers.length });
        } else {
            // No drivers found
            const io = getIO();
            io.to(riderId).emit('no_drivers_found', {
                message: "No drivers available nearby. Please try again."
            });
            res.json({ success: false, rideId: newRide._id, driversFound: 0 });
        }
    } catch (error) {
        console.error('Request ride error:', error);
        res.status(500).json({ error: error.message });
    }
};

// --- 2. ACCEPT RIDE ---
exports.acceptRide = async (req, res) => {
    const { rideId, driverId } = req.body;

    try {
        const ride = await Ride.findById(rideId);
        if (!ride || ride.status !== 'SEARCHING') {
            return res.status(400).json({ message: 'Ride already taken or cancelled' });
        }

        // Assign Driver
        ride.driver = driverId;
        ride.status = 'ACCEPTED';
        await ride.save();

        // Mark Driver Busy
        await User.findByIdAndUpdate(driverId, { isAvailable: false });

        // Get driver info
        const driver = await User.findById(driverId);

        // Notify Rider
        const io = getIO();
        io.to(ride.rider.toString()).emit('ride_accepted', {
            rideId: ride._id,
            driverId,
            driver: {
                name: driver.name,
                _id: driver._id
            },
            message: "Driver is coming!"
        });

        console.log(`Ride ${rideId} accepted by driver ${driverId}`);
        res.json({ success: true, ride });
    } catch (error) {
        console.error('Accept ride error:', error);
        res.status(500).json({ error: error.message });
    }
};

// --- 3. COMPLETE RIDE ---
exports.completeRide = async (req, res) => {
    const { rideId } = req.body;
    try {
        const ride = await Ride.findByIdAndUpdate(
            rideId, 
            { status: 'COMPLETED' }, 
            { new: true }
        );
        
        if (ride && ride.driver) {
            // Make driver available again
            await User.findByIdAndUpdate(ride.driver, { isAvailable: true });
        }

        console.log(`Ride ${rideId} completed`);
        res.json(ride);
    } catch (error) {
        console.error('Complete ride error:', error);
        res.status(500).json({ error: error.message });
    }
};