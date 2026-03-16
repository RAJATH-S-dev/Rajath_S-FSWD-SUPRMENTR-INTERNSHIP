import { useState } from "react";

const initialTasks = [
  { id: 1, text: "Buy groceries", done: false },
  { id: 2, text: "Read a book", done: false },
  { id: 3, text: "Go for a walk", done: true },
];

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");

  function handleAdd() {
    if (!input.trim()) return alert("Please enter a task.");

    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="container">
      <h1>Task List</h1>
      <p className="subtitle">YOU HAVE {remaining} TASK{remaining !== 1 ? "S" : ""} REMAINING</p>
      <div className="divider"></div>

      {/* Add Task */}
      <div className="section">
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
      <div className="section">
        <p className="section-title">ALL TASKS</p>
        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
        {tasks.map((task) => (
          <div className="card task-row" key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => handleToggle(task.id)}
            />
            <span className={`task-text ${task.done ? "done" : ""}`}>{task.text}</span>
            <button className="x-btn" onClick={() => handleDelete(task.id)}>✕</button>
          </div>
        ))}
      </div>

      {tasks.some((t) => t.done) && (
        <button className="clear-btn" onClick={() => setTasks(tasks.filter((t) => !t.done))}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default TaskList;