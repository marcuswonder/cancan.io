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
  const bigStep = await Board.findOneAndUpdate(
    {title: req.params.boardName},
    {$pull: {bigSteps: {title: req.params.bigStepName}}},
    {new: true}
  )
  res.status(200).json(bigStep)
}

async function update(req, res) {
  const updatedBigStep = req.body.bigStepUpdate

  const boardId = req.params.boardId
  const bigStepId = req.params.bigStepId

  const board = await Board.findOne({ _id: boardId })
  const bigStep = board.bigSteps.find(bStep => bStep._id.toString() === bigStepId)
  
  bigStep.title = updatedBigStep.title
  bigStep.description = updatedBigStep.description
  bigStep.due = updatedBigStep.due
  bigStep.responsible = updatedBigStep.responsible

  await board.save()

  res.staus(200).json(board)
}

  async function updateStatusToPlanned(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId

    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId);
  
      if (!bigStep) {
        return res.status(404).json({ msg: 'Big step not found' });
      }
  
      bigStep.status = "Planned"
  
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

    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId);
  
      if (!bigStep) {
        return res.status(404).json({ msg: 'Big step not found' });
      }
  
      bigStep.status = "In Progress"
  
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

    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const bigStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId);
  
      if (!bigStep) {
        return res.status(404).json({ msg: 'Big step not found' });
      }
  
      bigStep.status = "Complete"
  
      await board.save();
  
      res.status(200).json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  