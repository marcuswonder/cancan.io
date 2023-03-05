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
    req.body.board.author = req.user
    const board = await Board.create(req.body.board)
    res.json(board)
  }