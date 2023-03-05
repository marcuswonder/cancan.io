const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
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
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
        timestamps: true,
    
})

module.exports = mongoose.model('Board', boardSchema);
