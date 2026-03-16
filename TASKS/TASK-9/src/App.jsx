import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@")) {
      newErrors.email = "Enter a valid email.";
    }

    if (!position) newErrors.position = "Please select a position.";

    return newErrors;
  }

  function handleSubmit() {
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setPosition("");
    setErrors({});
    setSubmitted(false);
  }

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

      {/* Main */}
      <main className="main">
        <div className="container">
          <h1>Job Application</h1>
          <p className="subtitle">APPLY FOR A POSITION</p>
          <div className="divider"></div>

          {submitted ? (

            <div className="card" style={{ textAlign: "center" }}>
              <p className="success-text">APPLICATION SUBMITTED</p>
              <p>Thank you, <strong>{name}</strong>!</p>
              <p>We will contact you at <strong>{email}</strong>.</p>
              <p>Position: <strong>{position}</strong></p>
              <button onClick={handleReset} style={{ marginTop: "16px" }}>Apply Again</button>
            </div>

          ) : (

            <div className="card">

              <div className="field">
                <label>NAME</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="field">
                <label>EMAIL</label>
                <input
                  type="text"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="field">
                <label>POSITION</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="">Select a position</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Data Analyst">Data Analyst</option>
                </select>
                {errors.position && <p className="error">{errors.position}</p>}
              </div>

              <button className="submit-btn" onClick={handleSubmit}>Submit</button>

            </div>
          )}

        </div>
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
  );
}

export default App;