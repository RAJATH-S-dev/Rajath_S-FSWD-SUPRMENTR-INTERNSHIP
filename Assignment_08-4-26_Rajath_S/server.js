// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Connect to MongoDB (Replace with your Atlas URI!)
mongoose.connect('mongodb://127.0.0.1:27017/roleGuardDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('DB Error:', err));

// 2. User Model (Now with a 'role' field!)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Default is basic user
});
const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'super_secret_role_key';

// ==========================================
// 🛡️ THE GUARDS (MIDDLEWARE)
// ==========================================

// Guard 1: Must be logged in
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header
  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided!' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the user payload (id and role) to the request
    next(); // Pass control to the next function
  } catch (error) {
    res.status(403).json({ message: 'Access Denied: Invalid Token!' });
  }
};

// Guard 2: Must be an Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required!' });
  }
  next(); // User is admin, let them through
};

// ==========================================
// 🛣️ THE ROUTES
// ==========================================

// Auth Routes
app.post('/api/signup', async (req, res) => {
  try {
    // We allow passing a role just for testing purposes in this lab
    const { email, password, role } = req.body; 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword, role: role || 'user' });
    res.status(201).json({ message: 'User created! Try logging in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Embed both ID AND ROLE into the token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, role: user.role, message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected Routes
// Anyone logged in can access this
app.get('/api/user-data', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the User Dashboard! This is standard secure data.' });
});

// ONLY Admins can access this (Protected by BOTH guards)
app.get('/api/admin-data', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: '🚨 TOP SECRET ADMIN DATA 🚨 System settings and user management go here.' });
});

app.listen(5000, () => console.log('🚀 Backend running on http://localhost:5000'));