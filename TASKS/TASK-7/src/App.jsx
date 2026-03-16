import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(age) || Number(age) < 18) {
      newErrors.age = "You must be at least 18 years old.";
    } else if (Number(age) > 120) {
      newErrors.age = "Enter a valid age.";
    }

    return newErrors;
  }

  function handleSubmit() {
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      setSubmitted(false);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  }

  function handleReset() {
    setName("");
    setEmail("");
    setAge("");
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
          <h1>Registration</h1>
          <p className="subtitle">CREATE YOUR ACCOUNT</p>
          <div className="divider"></div>

          {/* Success Screen */}
          {submitted ? (
            <div className="card" style={{ textAlign: "center" }}>
              <p style={{
                fontSize: "0.75rem",
                letterSpacing: "3px",
                color: "#3a7a3a",
                marginBottom: "14px",
              }}>
                REGISTRATION SUCCESSFUL
              </p>
              <p style={{ color: "#333", marginBottom: "6px" }}>
                Welcome, <strong>{name}</strong>!
              </p>
              <p style={{ color: "#333", marginBottom: "6px" }}>
                Email: <strong>{email}</strong>
              </p>
              <p style={{ color: "#333", marginBottom: "20px" }}>
                Age: <strong>{age}</strong>
              </p>
              <button onClick={handleReset}>Register Again</button>
            </div>

          ) : (

            /* Registration Form */
            <div className="card">
              <p className="section-title">YOUR DETAILS</p>

              {/* Name */}
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

              {/* Email */}
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

              {/* Age */}
              <div className="field">
                <label>AGE</label>
                <input
                  type="number"
                  placeholder="Must be 18 or older"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                {errors.age && <p className="error">{errors.age}</p>}
              </div>

              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
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