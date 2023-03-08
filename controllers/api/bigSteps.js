const BigStep = require('../../models/bigStep')

module.exports = {
    index,
    create,
    show,
}


async function index(req, res) {
    try {
        let bigSteps = []
        if(req.user) {
            bigSteps = await BigStep.find({})
        }
        res.status(200).json(bigSteps)
    } catch (err) {
        console.error(err)
        res.status(500).send('Error retrieving Big Steps')
      }
    }

async function create(req, res) {
    const newBigStep = req.body.bigStep
    await BigStep.create(newBigStep)
    res.status(200).json(newBigStep)
}

function show() {

}