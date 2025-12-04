const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join a room based on User ID (e.g., "room-driver-123")
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(User ${userId} joined room);
        });

        // Driver updates location -> Send to Rider
        socket.on('driver_location', (data) => {
            // data = { riderId, lat, lng }
            io.to(data.riderId).emit('track_driver', { lat: data.lat, lng: data.lng });
        });

        // Driver Accepts Ride
        socket.on('accept_ride', (data) => {
             // Notify Rider
             io.to(data.riderId).emit('ride_accepted', { driverId: data.driverId });
        });

        socket.on('disconnect', () => console.log('Client disconnected'));
    });
};

const getIO = () => {
    if (!io) throw new Error("Socket not initialized");
    return io;
}

module.exports = { initSocket, getIO };
