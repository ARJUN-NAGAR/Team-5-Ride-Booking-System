const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ride', rideRoutes);

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

// ROUTES IMPORT
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { server, app };
