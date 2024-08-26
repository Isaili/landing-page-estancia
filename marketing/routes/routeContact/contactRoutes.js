const express = require('express');
const { submitForm } = require('../../controllers/controllerContact/contactController');
const router = express.Router();

router.post('/submit', submitForm);

module.exports = router;
