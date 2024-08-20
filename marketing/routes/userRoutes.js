const express = require('express');
const {registerVisit, logActivity, updateLocation} = require('../controllers/userControllers');
const router = express.Router();

router.post('/register', registerVisit);
router.post('/log', logActivity);


module.exports = router;