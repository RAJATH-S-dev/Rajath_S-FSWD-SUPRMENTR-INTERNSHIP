// src/App.jsx
import React, { useState, useEffect } from 'react';
import { messageService } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  // Fetch data when the component first loads
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await messageService.getAll();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      // Send the new message to the backend
      const newMsg = await messageService.create(inputText);
      
      // Update our local React state with the new message from the backend
      setMessages([...messages, newMsg]);
      setInputText(''); 
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Connect the Stack ⚡</h2>
      
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Type a message for the backend..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send to Backend</button>
      </form>

      <ul style={styles.list}>
        {messages.map((msg) => (
          <li key={msg.id} style={styles.listItem}>
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  list: { listStyleType: 'none', padding: 0 },
  listItem: { padding: '15px', backgroundColor: '#f4f4f4', marginBottom: '10px', borderRadius: '4px', borderLeft: '4px solid #007bff' },
  error: { color: 'red', fontWeight: 'bold' }
};

export default App;