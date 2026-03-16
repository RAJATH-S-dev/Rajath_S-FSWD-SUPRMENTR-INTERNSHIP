import { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, text: "Buy groceries", done: false },
  { id: 2, text: "Read a book", done: false },
  { id: 3, text: "Go for a walk", done: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");

  function handleAdd() {
    if (!input.trim()) return alert("Please enter a task.");

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <p className="header-logo">✦ MyApp</p>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="app">
        <h1>Task List</h1>
        <p className="subtitle">YOU HAVE {remaining} TASK{remaining !== 1 ? "S" : ""} REMAINING</p>

        <div className="divider"></div>

        {/* Add Task */}
        <div className="add-section">
          <p className="section-title">ADD A TASK</p>
          <div className="input-row">
            <input
              type="text"
              placeholder="Enter a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>

        <div className="divider"></div>

        {/* Task List */}
        <div className="list-section">
          <p className="section-title">ALL TASKS</p>

          {tasks.length === 0 && (
            <p className="empty">No tasks yet. Add one above!</p>
          )}

          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggle(task.id)}
              />
              <span className={`task-text ${task.done ? "done" : ""}`}>
                {task.text}
              </span>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>✕</button>
            </div>
          ))}
        </div>

        {/* Clear Completed */}
        {tasks.some((t) => t.done) && (
          <button
            className="clear-btn"
            onClick={() => setTasks(tasks.filter((t) => !t.done))}
          >
            Clear Completed
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MyApp. All rights reserved.</p>
        <p className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </p>
      </footer>

    </div>
  );
}

export default App;