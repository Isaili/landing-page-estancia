const express = require('express');
const {registerVisit, logActivity, updateLocation} = require('../controllers/userControllers');
const router = express.Router();

router.post('/register', registerVisit);
router.post('/log', logActivity);
router.post('/location', updateLocation);// esta ruta es innecesaria asi que se eliminara en en 22/08/2024

module.exports = router;