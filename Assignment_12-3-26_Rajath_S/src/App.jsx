import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function getPasswordStrength(pwd) {
    if (pwd.length === 0) return null;
    if (pwd.length < 6) return "Weak";
    if (pwd.length < 10) return "Medium";
    return "Strong";
  }

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirm) {
      newErrors.confirm = "Please confirm your password.";
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match.";
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
    setPassword("");
    setConfirm("");
    setErrors({});
    setSubmitted(false);
  }

  const strength = getPasswordStrength(password);

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
          <h1>Sign Up</h1>
          <p className="subtitle">CREATE YOUR ACCOUNT</p>
          <div className="divider"></div>

          {submitted ? (

            /* Success Screen */
            <div className="card success-box">
              <p className="success-title">ACCOUNT CREATED</p>
              <p>Welcome, <strong>{name}</strong>!</p>
              <p>A confirmation has been sent to <strong>{email}</strong>.</p>
              <button onClick={handleReset} style={{ marginTop: "16px" }}>Sign Up Again</button>
            </div>

          ) : (

            /* Signup Form */
            <div className="form">

              {/* Full Name */}
              <div className="field">
                <label>FULL NAME</label>
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
                <label>EMAIL ADDRESS</label>
                <input
                  type="text"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="field">
                <label>PASSWORD</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <p className={`strength strength-${strength.toLowerCase()}`}>
                    Strength: {strength}
                  </p>
                )}
                {errors.password && <p className="error">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="field">
                <label>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                {errors.confirm && <p className="error">{errors.confirm}</p>}
              </div>

              <button className="submit-btn" onClick={handleSubmit}>Create Account</button>

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