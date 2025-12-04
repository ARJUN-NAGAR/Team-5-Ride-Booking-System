const express = require('express');
const http = require('http'); 
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const { initSocket } = require('./socket/socketHandler');

const app = express();
const server = http.createServer(app); 

app.use(cors());
app.use(express.json());

connectDB();
app.use('/api', require('./routes/apiRoutes'));

initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(Server running on port ${PORT}));
