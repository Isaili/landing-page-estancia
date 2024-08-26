const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    type: String,
    element: String,
    position: Number,
    timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    ipAddress: String,
    userAgent: String,
    referrer: String,
    visitDate: { type: Date, default: Date.now },
    activity: [activitySchema],
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
    }
});

userSchema.index({ location: '2dsphere' }); 

module.exports = mongoose.model('User', userSchema);
