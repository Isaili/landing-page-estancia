const express = require('express');
const {registerVisit, logActivity,} = require('../../controllers/controllerUser/userControllers');
const router = express.Router();

router.post('/register', registerVisit);
router.post('/log', logActivity);


module.exports = router;