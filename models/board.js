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

    const admins = board.admins
    
    const users = usersToAdd.filter(user => {
      if (admins.some(admin => admin.toString() === user.toString())) {
        return false
      } else {
        return true
      }
    }).filter((user, index, array) => {
      return !array.slice(0, index).some((otherUser) => {
        return otherUser.toString() === user.toString();
      });
    });
    
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


  // boardSchema.virtual('totalComplete').get(function() {
  //   let bigStepCount = 0;
  //   this.bigSteps.forEach(bigStep => {
  //     if (bigStep.status === 'Complete') {
  //       bigStepCount++
  //     }
  //   })
  //   let totalComplete = (bigStepCount / this.bigSteps.length) * 100

  //   if (totalComplete === 0 || bigStepCount === 0) {
  //     return 0

  //   } else {
  //     return totalComplete
  //   }
  // })

  boardSchema.virtual('completionRate').get(function() {
    let completionRate = 0

    let totalBigSteps = this.bigSteps.length
    
    let totalBigStepsWithBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length > 0) {
        totalBigStepsWithBabySteps++
      }
    })
    
    let totalBigStepsWithoutBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length === 0) {
        totalBigStepsWithoutBabySteps++
      }
    })

    let completeBigStepsWithoutBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length === 0 && bigStep.status === 'Complete') {
        completeBigStepsWithoutBabySteps++
      }
    })

    let totalBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      bigStep.babySteps.forEach(babyStep => {
        totalBabySteps++
      }) 
    }) 

    let totalCompleteBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      bigStep.babySteps.forEach(babyStep => {
        if(babyStep.status === 'Complete') {
          totalCompleteBabySteps++
        } 
      }) 
    })

    // No Big Steps have Baby Steps
    if(totalBigStepsWithBabySteps === 0) {
      completionRate = completeBigStepsWithoutBabySteps / totalBigStepsWithoutBabySteps * 100

    // All Big Steps Have Baby Steps
    } else if(totalBigStepsWithBabySteps === totalBigSteps) {
      completionRate = totalCompleteBabySteps / totalBabySteps * 100
    
      // Mixed Big Steps with and Without Baby Steps
    } else {
      let individualCompletionRates = []
      
      this.bigSteps.forEach(bigStep => {
        if(bigStep.babySteps.length > 0) {
          let completeBabySteps = 0
          bigStep.babySteps.forEach(babyStep => {
            if(babyStep.status === 'Complete') {
              completeBabySteps++
            }
          })
          individualCompletionRates.push(completeBabySteps / bigStep.babySteps.length * 100)
      
        } if(bigStep.babySteps.length === 0){
          let completeBigSteps = 0
          if(bigStep.status === 'Complete') {
            completeBigSteps++
          }
          individualCompletionRates.push(completeBigSteps / 1 * 100)

          console.log("individualCompletionRates", individualCompletionRates)
        }
        if(individualCompletionRates.length > 0) {
          completionRate = individualCompletionRates.reduce((total, rate) => total + rate, 0) / individualCompletionRates.length
        }
      })
      
    }
    if(completionRate > 0) {
      return completionRate.toFixed(0)
    } else {
      return "zero"
    }
  })






  boardSchema.virtual('totalBigSteps').get(function() {    
    return this.bigSteps.length
  })

  boardSchema.virtual('totalBigStepsWithBabySteps').get(function() {
    let totalBigStepsWithBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length > 0) {
        totalBigStepsWithBabySteps++
      }
    })
    return totalBigStepsWithBabySteps
  })

  boardSchema.virtual('totalBigStepsWithoutBabySteps').get(function() {
    let totalBigStepsWithoutBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length === 0) {
        totalBigStepsWithoutBabySteps++
      }
    })
    return totalBigStepsWithoutBabySteps
  })

  boardSchema.virtual('completeBigStepsWithoutBabySteps').get(function() {
    let completeBigStepsWithoutBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      if (bigStep.babySteps.length === 0 && bigStep.status === 'Complete') {
        completeBigStepsWithoutBabySteps++
      }
    })
    return completeBigStepsWithoutBabySteps
  })

  boardSchema.virtual('totalBabySteps').get(function() {
    let totalBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      bigStep.babySteps.forEach(babyStep => {
        totalBabySteps++
      }) 
    }) 
    return totalBabySteps
  })

  boardSchema.virtual('totalCompleteBabySteps').get(function() {
    let totalCompleteBabySteps = 0
    this.bigSteps.forEach(bigStep => {
      bigStep.babySteps.forEach(babyStep => {
        if(babyStep.status === 'Complete') {
          totalCompleteBabySteps++
        } 
      }) 
    }) 
    return totalCompleteBabySteps
  })



  // boardSchema.virtual('completeBigStepsCount').get(function() {
  //   let count = 0;
  //   this.bigSteps.forEach(bigStep => {
  //     if (bigStep.status === 'Complete') {
  //       count++
  //     }
  //   })
  //   return count
  // })

  // boardSchema.virtual('totalBabySteps').get(function() {
  //   let total = 0
  //   this.bigSteps.forEach(bigStep => {
  //     total += bigStep.babySteps.length
  //   })
  //   return total
  // })





module.exports = mongoose.model('Board', boardSchema);
