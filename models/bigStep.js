const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    due: {type: Date},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    responsible: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
        timestamps: true,
    
})


module.exports = mongoose.model('Board', boardSchema);
