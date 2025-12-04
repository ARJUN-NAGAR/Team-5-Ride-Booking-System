// ... (keep existing imports)
const { updateLocation, toggleAvailability, getRideHistory, rateRide } = require('../controllers/rideController');

router.post('/update-location', updateLocation);
router.post('/toggle-availability', toggleAvailability);
router.get('/history/:role/:userId', getRideHistory);
router.post('/rate', rateRide); // <--- Added this line

module.exports = router;