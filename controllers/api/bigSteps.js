const Board = require('../../models/board')

module.exports = {
    create,
    index,
    delete: deleteBigStep,
    show,
    update,
    updateStatusToPlanned,
    updateStatusToInProgress,
    updateStatusToComplete,
}

async function create(req, res) {
    const newBigStep = req.body.bigStep

    const updatedBoard = await Board.findByIdAndUpdate(newBigStep.board, {
        $push: {
          bigSteps: newBigStep
        },
      }, { new: true })
    
      res.status(200).json(updatedBoard)  
    }


async function deleteBigStep(req, res) {
  const bigStep = await Board.findOneAndUpdate(
    {title: req.params.boardName},
    {$pull: {bigSteps: {title: req.params.bigStepName}}},
    {new: true}
  )
  res.status(200).json(bigStep)
}

async function index(req, res) {
  const boardName = req.params.boardName
  const board = await Board.findOne({title: boardName})
  if(board.bigSteps.length) {
    res.status(200).json(board.bigSteps)
  } else {
    res.status(200).json([])  
  }
}

async function show(req, res) {
  try {
    const board = await Board.findOne({ title: req.params.boardName, 'bigSteps.title': req.params.bigStepName }, { 'bigSteps.$': 1 });
    if (!board) {
      return res.status(404).send('Board not found')
    }
    const bigStep = board.bigSteps[0];
    res.status(200).json(bigStep);
    
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving Board')
  }
}

async function update(req, res) {
  const boardId = req.body.bigStepUpdate.board
  const updatedBigStep = req.body.bigStepUpdate

  await Board.findOneAndUpdate(
    {_id: req.params.boardId},
    {$pull: {bigSteps: {_id: req.params.bigStepId}}},
    {new: true}
  )


  const updatedBoard = await Board.findByIdAndUpdate(boardId, {
      $push: {
        bigSteps: updatedBigStep
      },
    }, { new: true })
  
    res.status(200).json(updatedBoard)  
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
  