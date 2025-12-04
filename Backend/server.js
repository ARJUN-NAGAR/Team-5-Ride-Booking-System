const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ride', rideRoutes);

    // 3.5 Driver Declines Ride (NEW CODE)
    socket.on('decline_ride', async (data) => {
        const { rideId, driverId } = data;
        console.log(`Ride ${rideId} declined by driver ${driverId}`);

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

   
