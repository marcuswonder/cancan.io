const Board = require('../../models/board')

module.exports = {
    index,
    show,
    create,
}

async function index(req, res) {
    let boards = []
    if (req.user) {
        boards = await Board.find({user: req.user._id})
    }
    res.json(boards)  
}

async function show(req, res) {
    console.log("controller line 18", req.params)
    let board = {}
    if (req.user) {
        board = await Board.findOne({user: req.user._id, title: req.params.boardName})
    }
    console.log("controller line 23", board)
    res.json(board)  
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