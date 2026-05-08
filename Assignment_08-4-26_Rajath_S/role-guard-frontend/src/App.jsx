import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleInput, setRoleInput] = useState('user'); // Just for lab testing!
  const [isLoginView, setIsLoginView] = useState(true);
  
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [systemMessage, setSystemMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLoginView ? '/api/login' : '/api/signup';
    const bodyPayload = isLoginView ? { email, password } : { email, password, role: roleInput };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      const data = await response.json();

      if (response.ok && isLoginView) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setToken(data.token);
        setRole(data.role);
        setSystemMessage('');
      } else {
        setSystemMessage(data.message);
      }
    } catch (err) {
      setSystemMessage('Server connection failed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    setSystemMessage('');
  };

  // Test Route Functions
  const fetchUserData = async () => {
    const res = await fetch('http://localhost:5000/api/user-data', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setSystemMessage(data.message);
  };

  const fetchAdminData = async () => {
    const res = await fetch('http://localhost:5000/api/admin-data', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setSystemMessage(data.message); // Will show error if not admin!
  };

  // --- PROTECTED DASHBOARD ---
  if (token) {
    return (
      <div style={styles.container}>
        <h2>{role === 'admin' ? '🛡️ Admin Command Center' : '👤 User Dashboard'}</h2>
        <p>Logged in as: <strong>{role.toUpperCase()}</strong></p>
        
        {systemMessage && <div style={styles.alertBox}>{systemMessage}</div>}

        <div style={styles.buttonGroup}>
          <button onClick={fetchUserData} style={styles.btnBasic}>Fetch User Data</button>
          
          {/* We hide this button for users, but even if they force it via code, the backend blocks them */}
          {role === 'admin' && (
            <button onClick={fetchAdminData} style={styles.btnAdmin}>Fetch Admin Data</button>
          )}
        </div>
        
        <button onClick={handleLogout} style={{...styles.btnBasic, marginTop: '20px', backgroundColor: '#666'}}>Log Out</button>
      </div>
    );
  }

  // --- AUTH FORMS ---
  return (
    <div style={styles.container}>
      <h2>{isLoginView ? 'Log In' : 'Create Account'}</h2>
      {systemMessage && <p style={{color: 'red'}}>{systemMessage}</p>}

      <form onSubmit={handleAuth} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
        
        {!isLoginView && (
          <select value={roleInput} onChange={e => setRoleInput(e.target.value)} style={styles.input}>
            <option value="user">Register as Normal User</option>
            <option value="admin">Register as Admin</option>
          </select>
        )}
        
        <button type="submit" style={styles.btnBasic}>{isLoginView ? 'Log In' : 'Sign Up'}</button>
      </form>

      <p style={{marginTop: '20px', cursor: 'pointer', color: 'blue', textDecoration: 'underline'}} onClick={() => setIsLoginView(!isLoginView)}>
        {isLoginView ? 'Switch to Sign Up' : 'Switch to Log In'}
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' },
  input: { padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  buttonGroup: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' },
  btnBasic: { padding: '10px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnAdmin: { padding: '10px', fontSize: '16px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  alertBox: { padding: '15px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', margin: '15px 0' }
};

export default App;