const express = require('express')
const router = express.Router()
const boardsCtrl = require('../../controllers/api/boards')
const bigStepsCtrl = require('../../controllers/api/bigSteps')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/author', ensureLoggedIn, boardsCtrl.authorIndex)
router.get('/user', ensureLoggedIn, boardsCtrl.userIndex)
router.post('/new', ensureLoggedIn, boardsCtrl.create)
router.get('/:boardName', ensureLoggedIn, boardsCtrl.show)
router.put('/:boardName', ensureLoggedIn, boardsCtrl.update)
router.delete('/:boardName', ensureLoggedIn, boardsCtrl.delete)
router.get('/:boardName/big-steps', ensureLoggedIn, bigStepsCtrl.index)
router.post('/:boardName/big-steps/add', ensureLoggedIn, bigStepsCtrl.create)
router.delete('/:boardName/:bigStepName/delete', ensureLoggedIn, bigStepsCtrl.delete)

module.exports = router;