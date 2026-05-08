import React, { useState, useEffect } from 'react';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  // This state tracks if we are logged in by checking for a token
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');

    // Determine which endpoint to hit based on the current view
    const endpoint = isLoginView ? '/api/login' : '/api/signup';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Save the JWT to local storage and update state
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setMessage('');
      } else {
        // Show error message from backend
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to connect to server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setEmail('');
    setPassword('');
  };

  // --- PROTECTED VIEW (User is logged in) ---
  if (token) {
    return (
      <div style={styles.container}>
        <h2>Welcome to the Secure Dashboard! 🔒</h2>
        <p>Your browser is currently holding a valid JSON Web Token.</p>
        <button onClick={handleLogout} style={styles.logoutBtn}>Log Out</button>
      </div>
    );
  }

  // --- AUTH VIEW (User is not logged in) ---
  return (
    <div style={styles.container}>
      <h2>{isLoginView ? 'Log In' : 'Sign Up'}</h2>
      
      {message && <p style={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isLoginView ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <p style={styles.toggleText}>
        {isLoginView ? "Don't have an account? " : "Already have an account? "}
        <span 
          style={styles.link} 
          onClick={() => setIsLoginView(!isLoginView)}
        >
          {isLoginView ? 'Sign up here' : 'Log in here'}
        </span>
      </p>
    </div>
  );
}

// Basic inline styles to make it look clean
const styles = {
  container: {
    maxWidth: '400px', margin: '50px auto', padding: '20px',
    textAlign: 'center', fontFamily: 'sans-serif',
    border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  logoutBtn: { padding: '10px 20px', fontSize: '16px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' },
  message: { color: 'red', fontWeight: 'bold' },
  toggleText: { marginTop: '20px', fontSize: '14px' },
  link: { color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }
};

export default App;