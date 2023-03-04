const express = require('express');
const router = express.Router();
const bigStepCtrl = require('../../controllers/api/bigSteps');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/new', ensureLoggedIn, bigStepsCtrl.show)
router.post('/new', ensureLoggedIn, bigStepsCtrl.create)

module.exports = router;