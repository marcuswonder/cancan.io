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
    }}, {
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

boardSchema.statics.findByTitle = async function(title) {
    const board = await this.findOne({ title });
    return board;
  };


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
