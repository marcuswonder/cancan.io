const Board = require('../../models/board')

module.exports = {
    index,
    create,
    delete: deleteBabyStep,
    update,
    updateStatusToPlanned,
    updateStatusToInProgress,
    updateStatusToComplete,
}


async function index(req, res) {
  const boardName = req.params.boardName
  const bigStepName = req.params.bigStepName

  Board.findOne({title: boardName})
  .populate({
    path: 'bigSteps',
    match: {title: bigStepName},
    populate: {path: 'babySteps'}
  })
  .exec((err, board) => {
    if (err) {
      res.status(500).send('Error retrieving Baby Steps')
    }
    if (!board) {
      return res.status(404).send('Board not found')
    }
    const bigStep = board.bigSteps[0]
    const babySteps = bigStep.babySteps;
    
    console.log(babySteps)
    res.status(200).json(babySteps)
  })
}


async function create(req, res) {
  const newBabyStep = req.body.newBabyStep
  const bigStepId = req.params.bigStepId

  const board = await Board.findById(newBabyStep.board)
  const admins = board.admins
  const verifiedAdmin = admins.find(admin => admin._id.toString() === req.user._id)

  if (verifiedAdmin) {
    try {
      if (!board) {
        return res.status(404).json({ message: 'Board not found' })
      }

      const bigStep = board.bigSteps.id(bigStepId);

    if (!bigStep) {
      return res.status(404).json({ message: 'Big step not found' })
    }

    const updatedBoard = await Board.findByIdAndUpdate(newBabyStep.board, {
      $push: { bigSteps: newBabyStep },
          // $addToSet: { users: newBigStep.responsible },
      }, { new: true })

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
  const babyStep = await Board.findOneAndUpdate(
    {title: req.params.boardName},
    {$pull: {babySteps: {title: req.params.babyStepName}}},
    {new: true}
  )
  res.status(200).json(babyStep)
}

async function update(req, res) {
  const updatedBabyStep = req.body.babyStepUpdate
  
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  const board = await Board.findOne({ _id: boardId })
  const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)
  const babyStep = bigStep.babySteps.find(bStep => bStep._id.toString() === babyStepId)

  babyStep.title = updatedBabyStep.title
  babyStep.description = updatedBabyStep.description
  babyStep.due = updatedBabyStep.due
  babyStep.responsible = updatedBabyStep.responsible

  await board.save()

  res.status(200).json(board)
}

async function updateStatusToPlanned(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)

    if (!babyStep) {
      return res.status(404).json({ msg: 'Baby step not found' });
    }

    babyStep.status = "Planned"

    await board.save();

    res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


async function updateStatusToInProgress(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId


  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)

    if (!babyStep) {
      return res.status(404).json({ msg: 'Baby step not found' });
    }

    babyStep.status = "In Progress"

    await board.save();

    res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


async function updateStatusToComplete(req, res) {
  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId
  const babyStepId = req.params.babyStepId

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)

    if (!babyStep) {
      return res.status(404).json({ msg: 'Baby step not found' });
    }

    babyStep.status = "Complete"

    await board.save();

    res.status(200).json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
