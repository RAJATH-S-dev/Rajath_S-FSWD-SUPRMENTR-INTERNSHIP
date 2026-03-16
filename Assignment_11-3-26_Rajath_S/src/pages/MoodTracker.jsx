import { useState } from "react";

const moods = [
  { label: "Happy",   emoji: "😊" },
  { label: "Sad",     emoji: "😢" },
  { label: "Angry",   emoji: "😠" },
  { label: "Calm",    emoji: "😌" },
  { label: "Excited", emoji: "🤩" },
  { label: "Tired",   emoji: "😴" },
];

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [history, setHistory] = useState([]);

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
    <div className="container">
      <h1>Mood Tracker</h1>
      <p className="subtitle">HOW ARE YOU FEELING TODAY?</p>
      <div className="divider"></div>

      {/* Mood Grid */}
      <div className="section">
        <p className="section-title">SELECT YOUR MOOD</p>
        <div className="mood-grid">
          {moods.map((mood) => (
            <button
              key={mood.label}
              className={`mood-btn ${selectedMood?.label === mood.label ? "active" : ""}`}
              onClick={() => setSelectedMood(mood)}
            >
              <span className="emoji">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Mood */}
      {selectedMood && (
        <div className="card" style={{ textAlign: "center" }}>
          <p>You are feeling <strong>{selectedMood.label}</strong> {selectedMood.emoji}</p>
          <button style={{ marginTop: "10px" }} onClick={handleLog}>Log Mood</button>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="section">
          <div className="divider"></div>
          <p className="section-title">MOOD HISTORY</p>
          {history.map((entry) => (
            <div className="card history-row" key={entry.id}>
              <span className="emoji">{entry.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0 }}>{entry.mood}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#999" }}>{entry.date} at {entry.time}</p>
              </div>
              <button className="x-btn" onClick={() => handleDelete(entry.id)}>✕</button>
            </div>
          ))}
        </div>
      )}

      {history.length === 0 && (
        <p className="empty">No moods logged yet.</p>
      )}
    </div>
  );
}

export default MoodTracker;