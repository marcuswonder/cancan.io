const Board = require('../../models/board')

module.exports = {
    index,
    show,
    create,
    delete: deleteBoard,
}

// async function index(req, res) {
//     console.log("User Request", req.user._id)
//     let boards = []
//     if (req.user) {
//         boards = await Board.find({'author._id': req.user._id})
//     }
//     // add in some error handling here!
//     res.json(boards)
// }

async function index(req, res) {
    try {
      console.log("User Request", req.user._id)
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
    let board = {}
    if (req.user) {
        board = await Board.findOne({user: req.user._id, title: req.params.boardName})
    }
    res.json(board)  
}


async function create(req, res) {
    newBoard = req.body.board
    newBoard.author = req.user._id
    const existingBoard = await Board.findByTitle(newBoard.title)

    if(existingBoard) {
        return res.status(400).json({ error: 'Document with this title already exists' })
    } else {
        const board = await Board.create(newBoard)
        res.json(board)
    }
}

async function deleteBoard(req, res) {
    console.log("Delete Board hit", req.params)
    console.log("Delete 2", req.params.boardID)
    let board = {}
    if (req.user) {
        board = await Board.deleteOne({user: req.user._id, title: req.params.boardName})
    }
    res.status(200).json({message: "Board deleted successfully."})  
}