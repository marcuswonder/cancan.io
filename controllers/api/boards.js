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
    newBoard = req.body.board
    const existingBoard = await Board.findByTitle(newBoard.title)

    if(existingBoard) {
        return res.status(400).json({ error: 'Document with this title already exists' })
    } else {
        const board = await Board.create(newBoard)
        res.json(board)
    }
}