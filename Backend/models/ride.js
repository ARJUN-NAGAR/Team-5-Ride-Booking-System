const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pickupLoc: { type: [Number], required: true }, // [Lat, Lng]
    dropLoc: { type: [Number], required: true },
    fare: Number,
    status: { type: String, enum: ['SEARCHING', 'ACCEPTED', 'COMPLETED'], default: 'SEARCHING' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ride', RideSchema);