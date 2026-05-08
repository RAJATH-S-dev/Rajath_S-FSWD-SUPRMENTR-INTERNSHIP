// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allows React to communicate with this API

// 1. Connect to MongoDB (Replace with your Atlas URI if needed)
mongoose.connect('')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('DB Error:', err));

// 2. User Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'super_secret_jwt_key_for_lab'; // In production, use .env files!

// 3. SIGNUP Route
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, message: 'Signup successful!' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. LOGIN Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login successful!' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('🚀 Backend running on http://localhost:5000'));