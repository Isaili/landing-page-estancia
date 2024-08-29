const express = require('express');
const { updateHeatmap, getHeatmapData, getHeatmapCounts} = require('../../controllers/controllerHeatmap/heatmapController');
const router = express.Router();

router.post('/heatmap', updateHeatmap);

router.get('/regresar', getHeatmapData);

router.get('/conteo', getHeatmapCounts);  

module.exports = router;