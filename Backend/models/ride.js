const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickup: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [Lng, Lat]
    },
    drop: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    },
    fare: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['SEARCHING', 'ACCEPTED', 'STARTED', 'COMPLETED'], 
        default: 'SEARCHING' 
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', RideSchema);