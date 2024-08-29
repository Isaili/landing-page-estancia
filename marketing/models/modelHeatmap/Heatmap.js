const mongoose = require('mongoose');

const heatmapSchema = new mongoose.Schema({
    section: String,
    action: String,
    x: Number,
    y: Number,
    count: { type: Number, default: 1 }
});

module.exports = mongoose.model('Heatmap', heatmapSchema);