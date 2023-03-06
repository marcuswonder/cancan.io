const Board = require('../../models/board')

module.exports = {
    index,
    show,
    create,
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
      res.status(500).send('Error retrieving boards')
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
      res.status(500).send('Error retrieving board')
    }
  }


async function create(req, res) {
    newBoard = req.body.board
    newBoard.author = req.user._id
    const existingBoard = await Board.findByTitle(newBoard.title)

    if(existingBoard) {
        return res.status(400).json({ error: 'Document with this title already exists' })
    } else {
        const board = await Board.create(newBoard)
        res.status(200).json(board)
    }
}

async function deleteBoard(req, res) {
    let board = {}
    if (req.user) {
        board = await Board.deleteOne({user: req.user._id, title: req.params.boardName})
    }
    res.status(200).json({message: 'Board deleted successfully.'})  
}