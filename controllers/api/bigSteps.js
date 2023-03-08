const BigStep = require('../../models/bigStep')

module.exports = {
    index,
    create,
    show,
}


function index() {

}

async function create(req, res) {
    newBigStep = req.body.bigStep
    
    const bigStep = await BigStep.create(newBigStep)
    res.status(200).json(newBigStep)
//     }
// }

}

function show() {

}