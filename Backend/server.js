const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { initSocket } = require('./socket/socketHandler'); // Ananya's Logic
const apiRoutes = require('./routes/api'); // Arsh's Logic

// App Setup
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

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