import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import StudentManager from "./pages/StudentManager";
import MoodTracker from "./pages/MoodTracker";
import TaskList from "./pages/TaskList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page">

        {/* Header */}
        <header className="header">
          <p className="header-logo">✦ MyApp</p>
          <nav className="header-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Students</NavLink>
            <NavLink to="/mood" className={({ isActive }) => isActive ? "active" : ""}>Mood</NavLink>
            <NavLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>Tasks</NavLink>
          </nav>
        </header>

        {/* Pages */}
        <main className="main">
          <Routes>
            <Route path="/" element={<StudentManager />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 MyApp. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;