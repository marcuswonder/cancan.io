const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, {
        timestamps: true,
    
})

module.exports = mongoose.model('Board', boardSchema);
