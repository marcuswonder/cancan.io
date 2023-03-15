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
        toJSON: { virtuals: true }
    
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

  boardSchema.pre('find', function(next) {
    this.populate({
      path: 'bigSteps',
      populate: [
        { path: 'responsible', select: 'name email' },
        { path: 'babySteps', populate: { path: 'responsible', select: 'name email' } }
      ]
    })
    next();
  });


  boardSchema.virtual('totalComplete').get(function() {
    let bigStepCount = 0;
    this.bigSteps.forEach(bigStep => {
      if (bigStep.status === 'Complete') {
        bigStepCount++
      }
    })
    let totalComplete = (bigStepCount / this.bigSteps.length) * 100

    if (totalComplete == 0) {
      return "zero"

    } else {
      return totalComplete
    }
  })








  boardSchema.virtual('totalBigSteps').get(function() {
    return this.bigSteps.length, 0
  })

  boardSchema.virtual('plannedBigStepsCount').get(function() {
    let count = 0;
    this.bigSteps.forEach(bigStep => {
      if (bigStep.status === 'Planned') {
        count++
      }
    })
    return count
  })

  boardSchema.virtual('inProgressBigStepsCount').get(function() {
    let count = 0;
    this.bigSteps.forEach(bigStep => {
      if (bigStep.status === 'In Progress') {
        count++
      }
    })
    return count
  })

  boardSchema.virtual('completeBigStepsCount').get(function() {
    let count = 0;
    this.bigSteps.forEach(bigStep => {
      if (bigStep.status === 'Complete') {
        count++
      }
    })
    return count
  })

  boardSchema.virtual('totalBabySteps').get(function() {
    let total = 0
    this.bigSteps.forEach(bigStep => {
      total += bigStep.babySteps.length
    })
    return total
  })





module.exports = mongoose.model('Board', boardSchema);
