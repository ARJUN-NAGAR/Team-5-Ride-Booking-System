const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const historyController = require('../controllers/historyController');

router.post('/ride/request', rideController.requestRide);

router.get('/ride/history', historyController.getRideHistory);

module.exports = router;
