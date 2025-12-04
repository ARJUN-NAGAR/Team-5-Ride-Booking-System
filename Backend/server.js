
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

   
