const { FamilyRestroomTwoTone } = require('@mui/icons-material');
const { formLabelClasses } = require('@mui/material');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const achievements = new schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  icon: {
    type: Buffer,
    contentType: String,
    required: false
  }
}, {timeAchieved: true});
const achieve = mongoose.model('achievements', achievements);
module.exports = achieve;