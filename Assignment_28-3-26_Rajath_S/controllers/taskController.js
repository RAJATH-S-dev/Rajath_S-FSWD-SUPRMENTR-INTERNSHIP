const Task = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  const tasks = Task.getAll();
  res.status(200).json(tasks);
};

exports.getTaskById = (req, res) => {
  const task = Task.getById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
};

exports.createTask = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTask = Task.create(req.body.title);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const updatedTask = Task.update(req.params.id, req.body);
  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(updatedTask);
};

exports.deleteTask = (req, res) => {
  const deletedTask = Task.delete(req.params.id);
  if (!deletedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
};