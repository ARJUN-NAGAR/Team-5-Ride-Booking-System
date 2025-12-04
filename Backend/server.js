const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');

const { initSocket } = require('./socket/socketHandler'); // Ananya's Logic
const apiRoutes = require('./routes/api'); // Arsh's Logic

// App Setup
const app = express();
const server = http.createServer(app);
app.use('/api/auth', authRoutes);
app.use('/api/ride', rideRoutes);

    // 3.5 Driver Declines Ride (NEW CODE)
    socket.on('decline_ride', async (data) => {
        const { rideId, driverId } = data;
        console.log(`Ride ${rideId} declined by driver ${driverId}`);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taxi-app')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

// Routes
app.use('/api', apiRoutes);

// Initialize Sockets
initSocket(server);

// Start
const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on Port ${PORT}`));
        try {
            const ride = await Ride.findById(rideId);
            if (ride) {
                io.to(ride.rider.toString()).emit('ride_declined', {
                    message: "Driver is busy. Please search again."
                });
                ride.status = 'cancelled'; 
                await ride.save();
            }
        } catch (error) {
            console.error(error);
        }
    });

   
