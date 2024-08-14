const express = require('express');
const { updateHeatmap } = require('../controllers/heatmapController');
const router = express.Router();

router.post('/heatmap', updateHeatmap);

module.exports = router;