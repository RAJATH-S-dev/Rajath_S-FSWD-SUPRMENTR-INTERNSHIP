// In-memory database for demonstration purposes
let tasks = [
  { id: 1, title: 'Learn MVC', completed: false },
  { id: 2, title: 'Build an API', completed: false }
];
let currentId = 3;

module.exports = {
  getAll: () => tasks,
  
  getById: (id) => tasks.find(t => t.id === parseInt(id)),
  
  create: (title) => {
    const newTask = { id: currentId++, title, completed: false };
    tasks.push(newTask);
    return newTask;
  },
  
  update: (id, updates) => {
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
      Object.assign(task, updates);
    }
    return task;
  },
  
  delete: (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      return tasks.splice(index, 1)[0];
    }
    return null;
  }
};