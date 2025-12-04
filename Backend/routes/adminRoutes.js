const express = require('express');
const router = express.Router();
const { getPendingDrivers, verifyDriver } = require('../controllers/adminController');

router.get('/pending-drivers', getPendingDrivers);
router.post('/verify-driver', verifyDriver);

module.exports = router;
