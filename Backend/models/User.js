const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    role: { type: String, enum: ['rider', 'driver'], required: true },
    isAvailable: { type: Boolean, default: false }, // For drivers
    // GEOSPATIAL DATA
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [Longitude, Latitude]
    }
});

UserSchema.index({ location: '2dsphere' }); // IMPORTANT for Arjun's logic

module.exports = mongoose.model('User', UserSchema);