const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    index: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  profilePicture: { 
    type: String, 
    default: 'default-avatar.png' 
  },
  bio: { 
    type: String, 
    maxLength: 500 
  },
  role: { 
    type: String, 
    enum: ['reader', 'author', 'admin'], 
    default: 'reader' 
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);