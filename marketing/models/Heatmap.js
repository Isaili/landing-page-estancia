const mongoose = require('mongoose');

const heatmapSchema = new mongoose.Schema({
    section: String,
    action: String,
    count: {type: Number, default: 1},
});

module.exports = mongoose.model('Heatmap', heatmapSchema);