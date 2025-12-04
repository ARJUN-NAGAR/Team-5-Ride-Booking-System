const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['rider', 'driver'], required: true },
    isAvailable: { type: Boolean, default: false }, // Critical for "Online/Offline"
    
    // 📍 GEOSPATIAL FIELD (This is what makes the "Uber" logic work)
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [Longitude, Latitude]
    }
});

// Create Index for Fast Geospatial Searching
UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);