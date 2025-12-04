const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { initSocket } = require('./socket/socketHandler');

// App Setup
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taxi-app')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ DB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Driver Routes
const driverController = require('./controllers/driverController');
app.put('/api/driver/status', driverController.toggleStatus);
app.put('/api/driver/location', driverController.updateLocation);

// Ride Routes
const rideController = require('./controllers/rideController');
app.post('/api/ride/request', rideController.requestRide);
app.put('/api/ride/accept', rideController.acceptRide);
app.put('/api/ride/complete', rideController.completeRide);

// History Route
const historyController = require('./controllers/historyController');
app.get('/api/ride/history', historyController.getRideHistory);

// Initialize Sockets
initSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on Port ${PORT}`));