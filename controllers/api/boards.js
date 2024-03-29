const Board = require('../../models/board')


module.exports = {
    adminIndex,
    userIndex,
    show,
    create,
    update,
    delete: deleteBoard,
}

async function adminIndex(req, res) {
    try {
      if (req.user) {
        const boards = await Board.find({ admins: { $in: [req.user._id] } })
        res.json(boards)
      }

    } catch (err) {
      console.error(err)
      res.status(500).send('Error retrieving Boards')
    }
  }

async function userIndex(req, res) {
    try {
      let boards = []
      if (req.user) {
        boards = await Board.find({
          admins: { $nin: [req.user._id] },
          users: { $in: [req.user._id] }
          })
      }
      res.status(200).json(boards)

    } catch (err) {
      res.status(500).send('Error retrieving Boards')
    }
  }

  async function show(req, res) {
    try {
      const board = await Board.findOne({title: req.params.boardName})
      .populate({ path: 'author', model: 'User' })
      .populate({ path: 'admins', model: 'User' })
      .populate({ path: 'users', model: 'User' })
      .populate({
        path: 'bigSteps',
        populate: {
          path: 'responsible',
          model: 'User'
        }
      })
      .populate({
        path: 'bigSteps',
        populate: {
          path: 'babySteps',
          populate: {
            path: 'responsible',
            model: 'User'
          }
        }
      })
      .exec();
      
      const approvedBoardViewers = [...new Set([...board.admins, ...board.users])]

      const verifiedUser = approvedBoardViewers.find(user => user._id.toString() === req.user._id)

      if(verifiedUser) {
          res.json(board)
      
      } else {
        res.status(403).json({ error: "Only users and admins of a board can view it" })
        console.log('Only users and admins of a board can view it')
      }
    } catch (err) {
      console.error(err)
        res.status(500).send('Error retrieving Boards')
        console.log('Error retrieving Boards')
  }
}

async function create(req, res) {
  newBoard = req.body.board

  const existingBoard = await Board.find({title: newBoard.title})
  
  if (existingBoard.length > 0) {
      return res.status(400).json({ error: 'A Board with this title already exists' })
      
    } else {
        const board = await Board.create(newBoard)
        res.status(200).json(board)
    }
}

async function update(req, res) {
  const updatedBoard = req.body.boardUpdate
  const board = await Board.findById(updatedBoard._id)
  const admins = board.admins

  const verifiedAdmin = admins.find(admin => admin._id.toString() === req.user._id.toString())

  if(verifiedAdmin) {
    try {
      Board.findOneAndUpdate(
        { _id: updatedBoard._id },
        updatedBoard,
        { new: true },
        (err, updatedBoard) => {
          if (err) {
            console.log('Error updating Board:', err);
          } else {
            console.log("updatedBoard", updatedBoard)
            res.status(200).json(updatedBoard)
          }
        }
      )
    } catch (error) {
        res.status(500).json({ error: "Server Error" })
      }

    } else {
      res.status(403).json({ error: "Only admins of a board can update it" })
  }
}

async function deleteBoard(req, res) {
  const board = await Board.findOne({ title: req.params.boardName });
  const admins = board.admins

  const verifiedAdmin = admins.find(admin => admin._id.toString() === req.user._id.toString())

  if(verifiedAdmin) {
    await Board.findByIdAndDelete(board._id)

  } else {
    res.status(400).json({ error: 'Only the admin of a Board can delete it.' })

  }
  res.status(200).json({message: 'Board deleted successfully.'})  
}