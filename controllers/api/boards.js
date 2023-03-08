const Board = require('../../models/board')
const BigStep = require('../../models/bigStep')

module.exports = {
    authorIndex,
    userIndex,
    show,
    create,
    update,
    delete: deleteBoard,
    bigStepIndex,
}

async function authorIndex(req, res) {
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

async function userIndex(req, res) {
    try {
      let boards = []
      if (req.user) {
        boards = await Board.find({users: req.user._id})
      }
      res.status(200).json(boards)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error retrieving Boards')
    }
  }

  async function show(req, res) {
    try {
      let board = {}
      if (req.user) {
        board = await Board.findOne({user: req.user._id, title: req.params.boardName}).populate({path: 'author', model: 'User'}).populate({ path: 'users', model: 'User' })
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

  const board = Board.findById(boardId)
  
  try {
    const boardUpdate = req.body.boardUpdate
    
    Board.findOneAndUpdate(
      { _id: boardId, author: req.user },
      boardUpdate,
      { new: true },
      (err, updatedBoard) => {
        if (err) {
          console.log('Error updating Board:', err);
        } else {
          res.status(200).json(updatedBoard)
        }
      }
    )
  } catch (error) {
      res.status(500).json({ error: "Server Error" })
  }
}

async function deleteBoard(req, res) {
    let board = {}
    if (req.user) {
        board = await Board.deleteOne({author: req.user._id, title: req.params.boardName})
        await BigStep.deleteMany({board: board._id})

    } else {
      res.status(400).json({ error: 'Only the author of a Board may delete it.' })
    }
    res.status(200).json({message: 'Board deleted successfully.'})  
}

async function bigStepIndex(req, res) {
  try {
    if (req.user) {
      const board = await Board.findOne({ title: req.params.boardName });
      const boardBigSteps = await BigStep.find({board: board._id})
      console.log("boardBigSteps", boardBigSteps)
      res.status(200).json(boardBigSteps)
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving Big Steps");
  }
}