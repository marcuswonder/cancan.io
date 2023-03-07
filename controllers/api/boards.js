const Board = require('../../models/board')

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteBoard,
}


async function index(req, res) {
    try {
      let boards = []
      if (req.user) {
        boards = await Board.find({author: req.user._id})
      }
      res.json(boards)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error retrieving Boards')
    }
  }

  async function show(req, res) {
    try {
      let board = {}
      if (req.user) {
        board = await Board.findOne({user: req.user._id, title: req.params.boardName})
      }
      if (!board) {
        return res.status(404).send('Board not found')
      }
      res.json(board)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error retrieving Board')
    }
  }


async function create(req, res) {
    newBoard = req.body.board
    newBoard.author = req.user._id
    const existingBoard = await Board.findByTitle(newBoard.title)

    if(existingBoard) {
        return res.status(400).json({ error: 'A Board with this title already exists' })
    } else {
        const board = await Board.create(newBoard)
        res.status(200).json(board)
    }
}

async function update(req, res) {
  const boardId = req.body.boardUpdate._id
  
  try {
    const boardUpdate = req.body.boardUpdate
    boardUpdate.author = req.user._id
    
    Board.findOneAndUpdate(
      { _id: boardId },
      boardUpdate,
      { new: true },
      (err, updatedBoard) => {
        if (err) {
          console.log('Error updating board:', err);
        } else {
          res.status(200).json(updatedBoard)
          console.log("updatedBoard", updatedBoard)
        }
      }
    )
  } catch (error) {
      console.log("try block failing")
      res.status(500).json({ error: "Server Error" })
  }
}


async function deleteBoard(req, res) {
    let board = {}
    if (req.user) {
        board = await Board.deleteOne({user: req.user._id, title: req.params.boardName})
    }
    res.status(200).json({message: 'Board deleted successfully.'})  
}