const Board = require('../../models/board')

module.exports = {
    create,
    index,
    delete: deleteBigStep,
}

async function create(req, res) {
    const updatedBoard = await Board.findByIdAndUpdate(req.body.bigStep.board, {
        $push: {
          bigSteps: newBigStep
        },
      }, { new: true })
    
      res.status(200).json(updatedBoard)  
    }


async function deleteBigStep(req, res) {
  const board = await Board.findOneAndUpdate(
    {title: req.params.boardName},
    {$pull: {bigSteps: {title: req.params.bigStepName}}},
    {new: true}
  )
  res.status(200).json(board)
}

async function index(req, res) {
  const board = await Board.findOne({title: req.params.boardName})
  if(board.bigSteps.length) {
    res.status(200).json(board.bigSteps)
  } else {
    res.status(200).json([])  
  }
}