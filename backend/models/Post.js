const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Userモデルとつながる
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comment: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
