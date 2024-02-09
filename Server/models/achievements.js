
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
  }, 
  xp: {
    type: Number,
    required: true
  }
}, {timeAchieved: true});
const achivement = mongoose.model('achievements', achievements);
module.exports = achivement;