const Board = require('../../models/board')

module.exports = {
    create,
    delete: deleteBabyStep,
    update,
    updateStatusToPlanned,
    updateStatusToInProgress,
    updateStatusToComplete,
}

async function create(req, res) {
  const newBabyStep = req.body.newBabyStep
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId

  const board = await Board.findById(boardId)
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if (verifiedAdmin) {
    try {
      if (!board) {
        return res.status(404).json({ message: 'Board not found' })
      }
      const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)

      if (!bigStep) {
        return res.status(404).json({ message: 'Big step not found' })
      }
    
      bigStep.babySteps.push(newBabyStep);
      const updatedBoard = await board.save();
      res.status(200).json(updatedBoard)     

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Server error' })
    }

  } else {
    res.status(403).json({ error: "Only the administrator of a Board can add a Big Step" })
  }
}


async function deleteBabyStep(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findOne({_id: boardId})
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible
  const babyStep = bigStep.babySteps.find((babyStep) => babyStep.id === babyStepId)
  const babyStepResponsible = babyStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible, babyStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    const updatedBabySteps = bigStep.babySteps.filter((babyStep) => babyStep.id !== babyStepId)
    console.log("updatedBabySteps", updatedBabySteps)

    bigStep.babySteps = updatedBabySteps

    await board.save()
    res.status(200).json(updatedBabySteps)
    
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can delete a Big Step" })
  }
}

async function update(req, res) {
  const updatedBabyStep = req.body.babyStepUpdate
  
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findOne({ _id: boardId })
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible
  const babyStep = bigStep.babySteps.find((babyStep) => babyStep.id === babyStepId)
  const babyStepResponsible = babyStep.responsible
  
  
  const verifiedEditors = [...boardAdmins, bigStepResponsible, babyStepResponsible]

  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)
    const babyStep = bigStep.babySteps.find(bStep => bStep._id.toString() === babyStepId)

    babyStep.title = updatedBabyStep.title
    babyStep.description = updatedBabyStep.description
    babyStep.due = updatedBabyStep.due
    babyStep.responsible = updatedBabyStep.responsible

  await board.save()

  res.status(200).json(board)

  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Baby Step" })
  }
}

async function updateStatusToPlanned(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findById(boardId);
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible
  const babyStep = bigStep.babySteps.find((babyStep) => babyStep.id === babyStepId)
  const babyStepResponsible = babyStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible, babyStepResponsible]
  
  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
      babyStep.status = "Planned"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}


async function updateStatusToInProgress(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findById(boardId);
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible
  const babyStep = bigStep.babySteps.find((babyStep) => babyStep.id === babyStepId)
  const babyStepResponsible = babyStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible, babyStepResponsible]
  
  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
      babyStep.status = "In Progress"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}


async function updateStatusToComplete(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findById(boardId);
  const boardAdmins = board.admins
  const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId)
  const bigStepResponsible = bigStep.responsible
  const babyStep = bigStep.babySteps.find((babyStep) => babyStep.id === babyStepId)
  const babyStepResponsible = babyStep.responsible

  const verifiedEditors = [...boardAdmins, bigStepResponsible, babyStepResponsible]
  
  const verifiedAdmin = verifiedEditors.find(admin => admin._id.toString() === req.user._id)

  if(verifiedAdmin) {
    try {
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
      babyStep.status = "Complete"
      await board.save()
      res.status(200).json(board)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    res.status(403).json({ error: "Only the administrator of a Board can update a Big Step" })
  }
}
