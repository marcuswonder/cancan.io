const Board = require('../../models/board')

module.exports = {
    index,
    create,
}

async function index(req, res) {
    let boards = []
    if (req.user) {
        boards = await Board.find({user: req.user._id})
    }
    res.json(boards)  
}

async function create(req, res) {
    req.body.user = req.user
    console.log(req.body)
    const newBoard = new Board()
    const board = await newBoard.addBoard(req.body)
    res.json(board)
  }