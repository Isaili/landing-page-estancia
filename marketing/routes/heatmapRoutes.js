const express = require('express');
const { updateHeatmap, getHeatmapData } = require('../controllers/heatmapController');
const router = express.Router();

router.post('/heatmap', updateHeatmap);

router.get('/regresar', getHeatmapData);

module.exports = router;