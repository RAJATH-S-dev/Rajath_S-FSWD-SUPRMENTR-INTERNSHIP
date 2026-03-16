import { useState } from "react";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Alice", math: 88, science: 92, english: 79 },
  { id: 2, name: "Bob", math: 73, science: 65, english: 81 },
];

function getAverage(student) {
  return ((student.math + student.science + student.english) / 3).toFixed(1);
}

function App() {
  const [students, setStudents] = useState(initialStudents);
  const [name, setName] = useState("");
  const [math, setMath] = useState("");
  const [science, setScience] = useState("");
  const [english, setEnglish] = useState("");

  function handleAdd() {
    if (!name || !math || !science || !english) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: name,
      math: Number(math),
      science: Number(science),
      english: Number(english),
    };

    setStudents([...students, newStudent]);
    setName("");
    setMath("");
    setScience("");
    setEnglish("");
  }

  function handleDelete(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div className="app">
      <h1>Student Manager</h1>

      {/* Add Student Form */}
      <div className="form">
        <h2>Add Student</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Math (0-100)" type="number" value={math} onChange={(e) => setMath(e.target.value)} />
        <input placeholder="Science (0-100)" type="number" value={science} onChange={(e) => setScience(e.target.value)} />
        <input placeholder="English (0-100)" type="number" value={english} onChange={(e) => setEnglish(e.target.value)} />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      {/* Student List */}
      <div className="list">
        <h2>Students</h2>
        {students.length === 0 && <p>No students yet.</p>}
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <h3>{student.name}</h3>
            <p>Math: {student.math}</p>
            <p>Science: {student.science}</p>
            <p>English: {student.english}</p>
            <p><strong>Average: {getAverage(student)}%</strong></p>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;