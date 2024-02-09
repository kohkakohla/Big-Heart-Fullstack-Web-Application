
const mongoose = require('mongoose');
const achievements = require('./achievements').schema;
const schema = mongoose.Schema;
const addressSchema = new schema({
  city: String,
  street: String,
  houseNumber: String,
  postal_code: String
});

const volunteerSchema =  new schema({
    // Common fields for all users (base user is defined as a volunteer)
    // if isAdmin then will have access to admin pages
    username: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    // Volunteer-specific fields
    firstName: {
      type: String,
      required: true

    },
    lastName: {
      type: String,
      required: true

    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true,

    },

    education: {
      type: String,
      required: true,
    },

    address: {
        type: addressSchema,
        required: true
    },

    dateOfBirth: {
      type: String,
      required: true
    },

    residentialStatus: {
      type: String,
      enum: ['Singapore PR', 'Singaporean Citizen', 'Long term visit pass', 'Employment pass or SPass'],
      required: true
    },

    skills: {
      type: [String],
      default: [],
      required: true
    },

    pastExperiences: {
      type: String,
      required: true
    },

    volunteerPreferences: {
      type: [String],
      enum: ["Children", "Social", "Elderly", "Environmental", "Animal"],
      required: true
    },
    userStatus: {
        type: String,
        enum: ['unverified', 'active', 'inactive', 'banned', 'deleted'],
        required: true
    },
    PersonalityResult: {
      type: String,
      enum: ["Selfless Skid", "Social Siloca", "Natural Aurten", "Hands-on Dhan", "Admirable Lamina"],
      required: false
    },
    userRole: {
      type: String,
      enum: ['admin', 'volunteer']
    },
    currentEnrolledServiceEvents: {
      type: [String],
      required: false
    },
    pastEnrolledServiceEvents: {
      type: [String], // stores event ids
      required: false
    },
    hours: {
      type: Number,
      default: 0
    },
    xp: {
      type: Number,
      default: 0
    },
    achievement: {
      type: [achievements],
      required: false
    }

  });
  const volunteer = mongoose.model('Volunteer', volunteerSchema);
  module.exports = volunteer;

