const express = require('express');
const { assignBranchByIP } = require('../../controllers/controllerLocation/locationController');
const router = express.Router();

router.post('/branch', assignBranchByIP); // Cambia a /branch

module.exports = router;
