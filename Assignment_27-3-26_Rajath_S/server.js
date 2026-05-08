import express from 'express';
import { tasks } from './data.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: #C2652A;">✅ Task API is running!</h1>
        <p style="color: #605850;">Use Postman to test the /api/tasks endpoints.</p>
        <p>Available Routes: GET, POST, PUT, DELETE on /api/tasks</p>
      </body>
    </html>
  `);
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET a specific task by ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.status(200).json(task);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description,
    status: status || 'Pending',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json({ message: 'Task created successfully', task: newTask });
});

// PUT (update) an existing task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update only provided fields
  const updatedTask = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updatedAt: new Date().toISOString()
  };

  tasks[taskIndex] = updatedTask;

  res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Task API is running!`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`\nReady for Postman testing!`);
});
