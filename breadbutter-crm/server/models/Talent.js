const mongoose = require('mongoose');

const talentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  city: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Talent', talentSchema); 