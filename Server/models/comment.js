const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentUser = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    personality: {
        type: String
    }
})
const commentSchema = new Schema({
    user: {
        type: commentUser,
    },
    body: {
        type: String,
        required: true
    },
}, {timestamps: true});

const comments = mongoose.model('cEventComments', commentSchema);
module.exports = comments;
