const express = require('express');
const router = express.Router();
const bigStepsCtrl = require('../../controllers/api/bigSteps');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.post('/create', ensureLoggedIn, bigStepsCtrl.create)
router.delete('/:bigStepId', ensureLoggedIn, bigStepsCtrl.delete)

module.exports = router;