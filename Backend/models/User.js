const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['rider', 'driver', 'admin'], required: true },
    isAvailable: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    
    // Geospatial field for location-based matching
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } // [Longitude, Latitude]
    }
}, { timestamps: true });

// Create 2dsphere index for geospatial queries
UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);