const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    rider: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    driver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    pickup: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true } // [Lng, Lat]
    },
    drop: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], required: true }
    },
    fare: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['SEARCHING', 'ACCEPTED', 'STARTED', 'COMPLETED', 'CANCELLED'], 
        default: 'SEARCHING' 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });

// Index for geospatial queries
RideSchema.index({ pickup: '2dsphere' });

module.exports = mongoose.model('Ride', RideSchema);