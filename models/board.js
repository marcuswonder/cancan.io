const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const babyStepSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    due: {type: Date},
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Complete'],
        default: 'Planned',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    responsible: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bigStep: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bigStep'
      },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bigStep'
      },
}, {
        timestamps: true,
    
})

const bigStepSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    due: {type: Date},
    status: {
        type: String,
        enum: ['Planned', 'In Progress', 'Complete'],
        default: 'Planned',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    responsible: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
    },
    babySteps: [babyStepSchema]
}, {
        timestamps: true,
    
})


const boardSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    bigSteps: [bigStepSchema]
}, {
        timestamps: true,
    
})

boardSchema.virtual('bigStepsCount').get(function() {
    return this.bigSteps.length
  });

boardSchema.virtual('plannedBigStepsCount').get(function() {
return this.bigSteps.reduce((count, bigStep) => {
    if (bigStep.status === 'Planned') {
    return count + 1
    } else {
    return count
    }
}, 0)
})

boardSchema.virtual('inProgressBigStepsCount').get(function() {
    return this.bigSteps.reduce((count, bigStep) => {
        if (bigStep.status === 'In Progress') {
        return count + 1
        } else {
        return count
        }
    }, 0)
    })


boardSchema.virtual('completeBigStepsCount').get(function() {
return this.bigSteps.reduce((count, bigStep) => {
    if (bigStep.status === 'Complete') {
    return count + 1
    } else {
    return count
    }
}, 0)
})

boardSchema.virtual('bigStepCompletionRate').get(function() {
    const completeBigSteps = this.bigSteps.reduce((count, bigStep) => {
        if (bigStep.status === 'Complete') {
        return count + 1
        } else {
        return count
        }
    }, 0)
    const totalBigSteps = this.bigSteps.length
    
    return completeBigSteps / totalBigSteps
    })

boardSchema.statics.findByTitle = async function(title) {
    const board = await this.findOne({ title });
    return board;
  };

boardSchema.methods.convertBigStepDueDate = function() {
    console.log("this", this)

    const BigStepdue = this.bigSteps.due
}


boardSchema.methods.addUsersToBoard = function() {
    const babyStepUsers = this.bigSteps.babySteps.find({}).populate({ path: 'responsible', model: 'User' })
    console.log("babyStepUsers", babyStepUsers)
    const bigStepUsers = this.bigSteps.find({}).populate({ path: 'responsible', model: 'User' })
    console.log("bigStepUsers", bigStepUsers)
    const boardUsers = [...babyStepUsers, bigStepUsers]
    this.users.push(boardUsers)
    console.log("boardUsers", boardUsers)
  }

module.exports = mongoose.model('Board', boardSchema);
