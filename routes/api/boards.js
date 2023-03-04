const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, boardsCtrl.index)
router.post('/new', ensureLoggedIn, boardsCtrl.create)

module.exports = router;