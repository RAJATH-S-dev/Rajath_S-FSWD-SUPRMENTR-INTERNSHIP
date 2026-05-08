const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 1. Enable CORS so React (running on port 5173) can talk to Express (port 5000)
app.use(cors({
  origin: 'http://localhost:5174', // Only allow requests from this React app
  methods: ['GET', 'POST', 'DELETE']
}));

// 2. Middleware to parse JSON bodies
app.use(express.json());

// In-memory database for testing
let messages = [
  { id: 1, text: "Hello from the Node.js Backend!" }
];

// --- API ROUTES ---

// GET: Send data to React
app.get('/api/messages', (req, res) => {
  res.status(200).json(messages);
});

// POST: Receive data from React
app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  
  const newMessage = { id: Date.now(), text };
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend is running on http://localhost:${PORT}`);
});