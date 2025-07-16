const mongoose = require('mongoose');

// Define the update subdocument schema separately
const updateSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  created_by: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); // Disable _id for subdocuments

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  talentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Talent',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  updates: [updateSchema], // Use the explicitly defined schema
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

module.exports = mongoose.model('Gig', gigSchema); 