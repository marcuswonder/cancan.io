const express = require('express');
const router = express.Router();
const bigStepsCtrl = require('../../controllers/api/bigSteps');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/index', ensureLoggedIn, bigStepsCtrl.index)
router.post('/create', ensureLoggedIn, bigStepsCtrl.create)
router.get('/show', ensureLoggedIn, bigStepsCtrl.show)

module.exports = router;