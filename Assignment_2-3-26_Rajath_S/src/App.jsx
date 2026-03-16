import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (phone.length !== 10 || isNaN(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
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
    setPhone("");
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className="app">
      <h1>Interactive Form</h1>
      <p className="subtitle">FILL IN YOUR DETAILS BELOW</p>

      <div className="divider"></div>

      {submitted ? (
        <div className="success-box">
          <p className="success-title">SUCCESS</p>
          <p>Your form was submitted successfully!</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <button onClick={handleReset}>Submit Another</button>
        </div>
      ) : (
        <div className="form">

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

          <div className="field">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="field">
            <label>PHONE NUMBER</label>
            <input
              type="text"
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <button className="submit-btn" onClick={handleSubmit}>Submit</button>

        </div>
      )}
    </div>
  );
}

export default App;