const express = require('express');
const { assignBranchByIP } = require('../controllers/locationController');
const router = express.Router();

router.post('/branch', assignBranchByIP); // Cambia a /branch

module.exports = router;
