const Board = require('../../models/board')

module.exports = {
    authorIndex,
    userIndex,
    show,
    create,
    update,
    delete: deleteBoard,
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

  const existingBoard = await Board.find({title: newBoard.title})
  
  if(!existingBoard === true) {
      console.log("controller create if statement hit!")
      return res.status(400).json({ error: 'A Board with this title already exists' })
      
    } else {
      console.log("controller create else statement hit!")
      console.log("controller create else newBoard", newBoard)
        const board = await Board.create(newBoard)
        res.status(200).json(board)
    }
}

async function update(req, res) {
  const updatedBoard = req.body.boardUpdate
  const board = await Board.findById(updatedBoard._id)
  const admins = board.admins

  const admin = admins.find(admin => admin._id.toString() === req.user._id)

  if(admin) {

    try {
      Board.findOneAndUpdate(
        { _id: updatedBoard._id },
        updatedBoard,
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

    } else {
      console.log("else if statement being hit")
      
      res.status(403).json({ error: "Only admins of a board can update it" })
  }
}

async function deleteBoard(req, res) {


  
  const board = await Board.findOne({ title: req.params.boardName });
  if( req.user._id === board.author._id.toString()) {
        await Board.findByIdAndDelete(board._id)

      } else {
        res.status(400).json({ error: 'Only the author of a Board can delete it.' })

    }
    res.status(200).json({message: 'Board deleted successfully.'})  
}

