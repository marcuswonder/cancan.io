const Board = require('../../models/board')

module.exports = {
    index,
    create,
    delete: deleteBabyStep,
    show,
    update,
    updateStatusToPlanned,
    updateStatusToInProgress,
    updateStatusToComplete,
}


async function index(req, res) {
  const boardName = req.params.boardName
  const bigStepName = req.params.bigStepName

  Board.findOne({title: boardName})
  .populate({
    path: 'bigSteps',
    match: {title: bigStepName},
    populate: {path: 'babySteps'}
  })
  .exec((err, board) => {
    if (err) {
      res.status(500).send('Error retrieving Baby Steps')
    }
    if (!board) {
      return res.status(404).send('Board not found')
    }
    const bigStep = board.bigSteps[0]
    const babySteps = bigStep.babySteps;
    
    console.log(babySteps)
    res.status(200).json(babySteps)
  })
}







async function create(req, res) {
  const { boardId, bigStepId } = req.params
  const newBabyStep = req.body.newBabyStep
  console.log("newBabyStep", newBabyStep)


  try {
    const board = await Board.findById(boardId)
    if (!board) {
      return res.status(404).json({ message: 'Board not found' })
    }

    const bigStep = board.bigSteps.id(bigStepId);
    if (!bigStep) {
      return res.status(404).json({ message: 'Big step not found' })
    }

    const babyStep = bigStep.babySteps.push(newBabyStep)
    await board.save()

    return res.status(200).json(babyStep);

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}


async function deleteBabyStep(req, res) {
  const babyStep = await Board.findOneAndUpdate(
    {title: req.params.boardName},
    {$pull: {babySteps: {title: req.params.babyStepName}}},
    {new: true}
  )
  res.status(200).json(babyStep)
}


async function show(req, res) {
  try {
    const board = await Board.findOne({ title: req.params.boardName, 'babySteps.title': req.params.babyStepName }, { 'babySteps.$': 1 });
    if (!board) {
      return res.status(404).send('Board not found')
    }
    const babyStep = board.babySteps[0];
    res.status(200).json(babyStep);
    
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving Board')
  }
}

async function update(req, res) {
  const boardId = req.params.boardId;
  const bigStepId = req.params.bigStepId;
  const babyStepId = req.params.babyStepId;

  const { title, description, responsible, due } = req.body.babyStepUpdate;

  const board = await Board.findOneAndUpdate(
    { _id: boardId, 'bigStep._id': bigStepId, 'bigStep.babyStep._id': babyStepId },
    {
      $set: {
        'bigStep.$[bigStep].babyStep.$[babyStep].title': title,
        'bigStep.$[bigStep].babyStep.$[babyStep].description': description,
        'bigStep.$[bigStep].babyStep.$[babyStep].responsible': responsible,
        'bigStep.$[bigStep].babyStep.$[babyStep].due': due,
      },
    },
    { arrayFilters: [{ 'bigStep._id': bigStepId }, { 'babyStep._id': babyStepId }], new: true }
  );

  console.log("board.bigSteps", board.bigSteps)

  res.status(200).json(board)
}

  async function updateStatusToPlanned(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId
    const babyStepId = req.params.babyStepId

    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
  
      if (!babyStep) {
        return res.status(404).json({ msg: 'Baby step not found' });
      }
  
      babyStep.status = "Planned"
  
      await board.save();
  
      res.status(200).json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  

  async function updateStatusToInProgress(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId
    const babyStepId = req.params.babyStepId


    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
  
      if (!babyStep) {
        return res.status(404).json({ msg: 'Baby step not found' });
      }
  
      babyStep.status = "In Progress"
  
      await board.save();
  
      res.status(200).json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  
  
  async function updateStatusToComplete(req, res) {
    const boardId = req.params.boardId
    const bigStepId = req.params.bigStepId
    const babyStepId = req.params.babyStepId

    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }
  
      const babyStep = board.bigSteps.find((bigStep) => bigStep.id === bigStepId).babySteps.find((babyStep) => babyStep.id === babyStepId)
  
      if (!babyStep) {
        return res.status(404).json({ msg: 'Baby step not found' });
      }
  
      babyStep.status = "Complete"
  
      await board.save();
  
      res.status(200).json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  