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
  const boardAdmins = board.admins
  const boardUsers = board.users

  const verifiedEditors = [...boardAdmins, ...boardUsers] 

  const verifiedEditor = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedEditor) {
    try {
      board.bigSteps.push(newBigStep);
      board.users.push(newBigStep.responsible)
      const updatedBoard = await board.save();
      
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

  const verifiedEditors = [...boardAdmins, bigStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {  
    const updatedBigSteps = board.bigSteps.filter((bigStep) => bigStep.id !== bigStepId)
    board.bigSteps = updatedBigSteps

    await board.save()
    res.status(200).json(board)
  
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

  const verifiedEditors = [...boardAdmins, bigStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)
    bigStep.title = updatedBigStep.title
    bigStep.description = updatedBigStep.description
    bigStep.due = updatedBigStep.due
    bigStep.responsible = updatedBigStep.responsible
    board.users.push(updatedBigStep.responsible)

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

  const verifiedEditors = [...boardAdmins, bigStepResponsible]

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
  
    const verifiedEditors = [...boardAdmins, bigStepResponsible]
  
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
  
    const verifiedEditors = [...boardAdmins, bigStepResponsible]
  
    const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId);
      bigStep.status = "Complete"
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
  