const mongoose = require('mongoose');
const volunteer = require('./volunteers').schema;
const schema = mongoose.Schema;
const feedbackSchemas = require('./feedback').schema;
const commentSchema = require('./comment').schema;

const addressSchema = new schema({
    city: String,
    street: String,
    houseNumber: String,
    postal_code: String
  });

const cEventSchema = new schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    address : {
        type: addressSchema,
        required: true
    },
    current_volunteers: {
        type: [String],
        required: false
    },
    capacity: {
        type: Number, 
        required: true
    },
    typeOfService: {
        type: String,
        enum: ['Elderly', 'Children', 'Environment', 'Animal', 'Social'],
    },
    typeOfEvent: {
        type: String,
        enum: ["Ad-Hoc", "Regular"],
    },

    timeFrame: {
        type: String,
        enum: ["Weekly", "Bi-Weekly", "Monthly", "Bi-Monthly", "Annual"]
    },

    communityProvider: {
        type: String
    },
    dateOfEvent: { // will change to a date time
        type: String
    },
    timeOfEvent: { // will change to a date time
        type: String
    },
    feedback: { //Array of feedback collection
        type: [feedbackSchemas]
    }, 
    comments: { // Array of comment collection
        type: [commentSchema]

    }, 
    status: {
        type: String,
        enum: ["Ongoing", "Completed", "Cancelled"],
    },
    hours: {
        type: Number,
        default: 1
    },
    image: {
        data: Buffer,
        contentType: String
    }


});
const volEvent = mongoose.model('cEvents', cEventSchema);
module.exports = volEvent;