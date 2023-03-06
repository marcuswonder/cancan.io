const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, boardsCtrl.index)
router.post('/new', ensureLoggedIn, boardsCtrl.create)
router.get('/:boardName', ensureLoggedIn, boardsCtrl.show)
router.delete('/:boardName', ensureLoggedIn, boardsCtrl.delete)

module.exports = router;