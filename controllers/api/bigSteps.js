const Board = require('../../models/board')

module.exports = {
    create,
    index,
    delete: deleteBigStep,
}

async function create(req, res) {
    const newBigStep = req.body.bigStep
    console.log("newBigStep", newBigStep)

    const updatedBoard = await Board.findByIdAndUpdate(newBigStep.board, {
        $push: {
          bigSteps: newBigStep
        },
      }, { new: true })
    
      res.status(200).json(updatedBoard)  
    }


function deleteBigStep() {

}

async function index(req, res) {
  const boardName = req.params.boardName
  const board = await Board.findOne({title: boardName})
  if(board.bigSteps.length) {
    res.status(200).json(board.bigSteps)
  } else {
    res.status(200).send("No Big Steps on this Board").json([])  
  }
}