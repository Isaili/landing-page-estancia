const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: [Number]
    }
});

module.exports = mongoose.model('Branch', branchSchema);
