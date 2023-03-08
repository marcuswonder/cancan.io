const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/author', ensureLoggedIn, boardsCtrl.authorIndex)
router.get('/user', ensureLoggedIn, boardsCtrl.userIndex)
router.post('/new', ensureLoggedIn, boardsCtrl.create)
router.get('/:boardName', ensureLoggedIn, boardsCtrl.show)
router.put('/:boardName', ensureLoggedIn, boardsCtrl.update)
router.delete('/:boardName', ensureLoggedIn, boardsCtrl.delete)
router.get('/big-steps', ensureLoggedIn, boardsCtrl.bigStepIndex)

module.exports = router;