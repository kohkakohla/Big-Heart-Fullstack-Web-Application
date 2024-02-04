const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    eventTitle:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Resolved", "Unresolved", "Unresolved and important"],
        require: true
    }
}, {timestamps: true});

const feedback = mongoose.model('Blog', feedbackSchema)
module.exports = feedback;