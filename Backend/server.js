const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Needed for Socket.io

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { server, app }; // Export for Ananya