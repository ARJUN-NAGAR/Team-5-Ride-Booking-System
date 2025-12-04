const socketIo = require('socket.io');

let io; 

const initSocket = (server) => {
    io = socketIo(server, {
        cors: { origin: "*" } 
    });

    io.on('connection', (socket) => {
        socket.on('join_user_room', (userId) => {
            socket.join(userId); // Room Name = User's MongoDB ID
            console.log(User ${userId} joined their personal room.);
        });

        socket.on('update_driver_location', async (data) => {
            const { driverId, riderId, lat, lng } = data;
            if (riderId) {
                io.to(riderId).emit('driver_moved', { lat, lng });
            }
        });
        
        socket.on('disconnect', () => {
        });
    });
};
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initSocket, getIO };
