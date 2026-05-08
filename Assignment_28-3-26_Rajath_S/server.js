const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the routes
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Test the API at http://localhost:3000/api/tasks');
});