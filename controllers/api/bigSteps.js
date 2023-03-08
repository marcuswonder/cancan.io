const BigStep = require('../../models/bigStep')

module.exports = {
    create,
    delete: deleteBigStep,
}

async function create(req, res) {
    const newBigStep = req.body.bigStep
    await BigStep.create(newBigStep)
    res.status(200).json(newBigStep)
}

function deleteBigStep() {

}