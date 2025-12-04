const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    role: { type: String, enum: ['rider', 'driver'], required: true },
    isAvailable: { type: Boolean, default: false },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] } 
    }
});

UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);