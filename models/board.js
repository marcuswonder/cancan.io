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
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    bigSteps: [bigStepSchema]
}, {
        timestamps: true,
    
})

boardSchema.pre('save', function(next) {
  const board = this
  let usersToAdd = []
  
    board.bigSteps.forEach((bigStep) => {
      if (bigStep.responsible) {
        console.log("middleware function bigSteps forEach loop hit")
        usersToAdd.push(bigStep.responsible)
      }
      bigStep.babySteps.forEach((babyStep) => {
        if (babyStep.responsible) {
          console.log("middleware function babySteps forEach loop hit")
          usersToAdd.push(babyStep.responsible)
        }
      })
    })
    let users = new Set(usersToAdd)
    console.log("users", users)
    
    board.users = []

    users.forEach((userId) => {
      board.users.push(userId)
    })
    console.log("board.users", board.users)
    
    return next();
  })

module.exports = mongoose.model('Board', boardSchema);
