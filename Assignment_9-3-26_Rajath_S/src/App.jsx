import { useState } from "react";
import "./App.css";

const moods = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😠" },
  { label: "Calm", emoji: "😌" },
  { label: "Excited", emoji: "🤩" },
  { label: "Tired", emoji: "😴" },
];

function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState([]);

  function handleMoodSelect(mood) {
    setSelectedMood(mood);
  }

  function handleLog() {
    if (!selectedMood) return;

    const entry = {
      id: Date.now(),
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };

    setHistory([entry, ...history]);
    setSelectedMood(null);
  }

  function handleDelete(id) {
    setHistory(history.filter((e) => e.id !== id));
  }

  return (
    <div className="app">
      <h1>Mood Tracker</h1>
      <p className="subtitle">HOW ARE YOU FEELING TODAY?</p>

      <div className="divider"></div>

      {/* Mood Selector */}
      <div className="section">
        <p className="section-title">SELECT YOUR MOOD</p>
        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`mood-btn ${selectedMood?.label === mood.label ? "active" : ""}`}
              onClick={() => handleMoodSelect(mood)}
            >
              <span className="emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Mood Display */}
      {selectedMood && (
        <div className="selected-box">
          <p className="selected-text">
            You are feeling <strong>{selectedMood.label}</strong> {selectedMood.emoji}
          </p>
          <button className="log-btn" onClick={handleLog}>Log Mood</button>
        </div>
      )}

      {/* Mood History */}
      {history.length > 0 && (
        <div className="section">
          <div className="divider"></div>
          <p className="section-title">MOOD HISTORY</p>
          {history.map((entry) => (
            <div className="history-card" key={entry.id}>
              <span className="history-emoji">{entry.emoji}</span>
              <div className="history-info">
                <p className="history-mood">{entry.mood}</p>
                <p className="history-time">{entry.date} at {entry.time}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(entry.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {history.length === 0 && (
        <p className="empty">No moods logged yet. Select one above!</p>
      )}
    </div>
  );
}

export default App;