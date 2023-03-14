const Board = require('../../models/board')

module.exports = {
    create,
    delete: deleteBigStep,
    update,
    updateStatusToPlanned,
    updateStatusToInProgress,
    updateStatusToComplete,
}

async function create(req, res) {
    const newBigStep = req.body.bigStep
    const board = await Board.findById(newBigStep.board)
    const admins = board.admins
    const verifiedAdmin = admins.find(admin => admin._id.toString() === req.user._id)

    if(verifiedAdmin) {
      try {
        const updatedBoard = await Board.findByIdAndUpdate(newBigStep.board, {
            $push: { bigSteps: newBigStep },
            // $addToSet: { users: newBigStep.responsible },
          }, { new: true })

          res.status(200).json(updatedBoard)

        } catch (error) {
          res.status(500).json({ error: "Server Error" })
        }

      } else {
        res.status(403).json({ error: "Only the administrator of a Board can add a Big Step" })
      }
}

async function deleteBigStep(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  
  const board = await Board.findOne({_id: boardId})
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible

  const verifiedEditors = Array.from(new Set(boardAdmins.concat(bigStepResponsible)))

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: boardId, 'bigSteps._id': bigStepId },
      { $pull: { bigSteps: { _id: bigStepId } } },
      { new: true }
    ).exec()

    res.status(200).json(updatedBoard)
  
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can delete a Big Step" })
  }
}

async function update(req, res) {
  const updatedBigStep = req.body.bigStepUpdate

  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId

  const board = await Board.findOne({ _id: boardId })
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible

  const verifiedEditors = Array.from(new Set(boardAdmins.concat(bigStepResponsible)))

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)
    bigStep.title = updatedBigStep.title
    bigStep.description = updatedBigStep.description
    bigStep.due = updatedBigStep.due
    bigStep.responsible = updatedBigStep.responsible

    await board.save()

    res.status(200).json(board)

  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}

async function updateStatusToPlanned(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId

  const board = await Board.findById(boardId)
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible

  const verifiedEditors = Array.from(new Set(boardAdmins.concat(bigStepResponsible)))

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
      bigStep.status = "Planned"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}
  

  async function updateStatusToInProgress(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId

    const board = await Board.findById(boardId)
    const boardAdmins = board.admins
    const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
    const bigStepResponsible = bigStep.responsible
  
    const verifiedEditors = Array.from(new Set(boardAdmins.concat(bigStepResponsible)))
  
    const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
      bigStep.status = "In Progress"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}
  
  
  async function updateStatusToComplete(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId

    const board = await Board.findById(boardId)
    const boardAdmins = board.admins
    const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
    const bigStepResponsible = bigStep.responsible
  
    const verifiedEditors = Array.from(new Set(boardAdmins.concat(bigStepResponsible)))
  
    const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId);
      bigStep.status = "Planned"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}
  