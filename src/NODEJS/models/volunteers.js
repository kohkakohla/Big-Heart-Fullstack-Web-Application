const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipCode: String,
})

const volunteerSchema = new Schema({
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
      type: Date,
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
      type: String,
      required: true
    },
    userStatus: {
        type: String,
        enum: ['unverified', 'active', 'inactive', 'banned', 'deleted'],
        required: true
    },

  });

  const volunteer = mongoose.model('Volunteer', volunteerSchema);
  module.exports = volunteer;

