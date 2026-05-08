const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true,
    index: true // Crucial for querying "all comments for a specific post"
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    maxLength: 1000
  },
  isApproved: { 
    type: Boolean, 
    default: true // Set to false if you want moderation before displaying
  },
  // Optional: Allows for nested replies
  parentComment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment', 
    default: null 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Comment', commentSchema);