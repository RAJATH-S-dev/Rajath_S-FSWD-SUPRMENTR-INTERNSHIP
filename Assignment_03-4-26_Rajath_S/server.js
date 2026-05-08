const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// ⚠️ REPLACE THIS STRING with your MongoDB Atlas URI (or keep local if you installed it)
const MONGO_URI = '';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Mount the routes
app.use('/api/books', bookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});