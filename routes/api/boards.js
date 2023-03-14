const express = require('express')
const router = express.Router()
const boardsCtrl = require('../../controllers/api/boards')
const bigStepsCtrl = require('../../controllers/api/bigSteps')
const babyStepsCtrl = require('../../controllers/api/babySteps')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/author', ensureLoggedIn, boardsCtrl.authorIndex)
router.get('/user', ensureLoggedIn, boardsCtrl.userIndex)
router.post('/new', ensureLoggedIn, boardsCtrl.create)
router.get('/:boardName', ensureLoggedIn, boardsCtrl.show)
router.put('/:boardName', ensureLoggedIn, boardsCtrl.update)
router.delete('/:boardName', ensureLoggedIn, boardsCtrl.delete)

router.post('/:boardName/big-steps/add', ensureLoggedIn, bigStepsCtrl.create)
router.delete('/:boardId/:bigStepId/delete', ensureLoggedIn, bigStepsCtrl.delete)
router.put('/:boardId/:bigStepId/update', ensureLoggedIn, bigStepsCtrl.update)
router.put('/:boardId/:bigStepId/planned', ensureLoggedIn, bigStepsCtrl.updateStatusToPlanned)
router.put('/:boardId/:bigStepId/in-progress', ensureLoggedIn, bigStepsCtrl.updateStatusToInProgress)
router.put('/:boardId/:bigStepId/complete', ensureLoggedIn, bigStepsCtrl.updateStatusToComplete)

router.post('/:boardId/:bigStepId/baby-steps/add', ensureLoggedIn, babyStepsCtrl.create)
router.delete('/:boardId/:bigStepId/:babyStepId/delete', ensureLoggedIn, babyStepsCtrl.delete)
router.put('/:boardId/:bigStepId/:babyStepId/update', ensureLoggedIn, babyStepsCtrl.update)
router.put('/:boardId/:bigStepId/:babyStepId/planned', ensureLoggedIn, babyStepsCtrl.updateStatusToPlanned)
router.put('/:boardId/:bigStepId/:babyStepId/in-progress', ensureLoggedIn, babyStepsCtrl.updateStatusToInProgress)
router.put('/:boardId/:bigStepId/:babyStepId/complete', ensureLoggedIn, babyStepsCtrl.updateStatusToComplete)

module.exports = router;