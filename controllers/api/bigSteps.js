const Board = require('../../models/board')

module.exports = {
    create,
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