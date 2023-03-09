const Board = require('../../models/board')

module.exports = {
    create,
    index,
    delete: deleteBigStep,
    show,
    update,
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
  console.log("req.params", req.params)
  console.log("req.body", req.body)
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