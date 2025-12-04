const Ride = require('../models/ride');

exports.getRideHistory = async (req, res) => {
    try {
        const { userId, role } = req.query;
        let query = {};
        
        if (role === 'rider') {
            query.rider = userId;
        } else if (role === 'driver') {
            query.driver = userId;
        }

        const history = await Ride.find(query)
            .populate('rider', 'name')
            .populate('driver', 'name')
            .sort({ createdAt: -1 });
        
        res.json(history);
    } catch (err) {
        console.error('History fetch error:', err);
        res.status(500).json({ error: err.message });
    }
};