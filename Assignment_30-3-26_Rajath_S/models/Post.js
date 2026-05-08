const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true // Indexed for fast URL lookups
  },
  content: { 
    type: String, 
    required: true 
  },
  summary: { 
    type: String,
    maxLength: 300
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // References the User collection
    required: true,
    index: true
  },
  tags: [{ 
    type: String, 
    lowercase: true, 
    trim: true 
  }],
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  publishedAt: { 
    type: Date 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);