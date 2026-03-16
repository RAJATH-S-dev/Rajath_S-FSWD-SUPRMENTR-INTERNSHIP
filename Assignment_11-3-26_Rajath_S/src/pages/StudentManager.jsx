import { useState } from "react";

const initialStudents = [
  { id: 1, name: "Alice", math: 88, science: 92, english: 79 },
  { id: 2, name: "Bob", math: 73, science: 65, english: 81 },
];

function getAverage(student) {
  return ((student.math + student.science + student.english) / 3).toFixed(1);
}

function StudentManager() {
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
    <div className="container">
      <h1>Student Manager</h1>
      <p className="subtitle">MANAGE STUDENT MARKS</p>
      <div className="divider"></div>

      {/* Form */}
      <div className="section">
        <p className="section-title">ADD STUDENT</p>
        <input style={{
    display: "block",
    width: "100%",
    padding: "9px 10px",
    marginBottom: "10px",
    border: "1px solid #bbb",
    borderRadius: "4px",
    fontSize: "1rem",
    background: "#ffffff",
    color: "#111",
    fontFamily: "Georgia, serif",
  }} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Math (0-100)" type="number" value={math} onChange={(e) => setMath(e.target.value)} />
        <input placeholder="Science (0-100)" type="number" value={science} onChange={(e) => setScience(e.target.value)} />
        <input placeholder="English (0-100)" type="number" value={english} onChange={(e) => setEnglish(e.target.value)} />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      <div className="divider"></div>

      {/* Student List */}
      <div className="section">
        <p className="section-title">ALL STUDENTS</p>
        {students.length === 0 && <p className="empty">No students yet.</p>}
        {students.map((student) => (
          <div className="card" key={student.id}>
            <h3>{student.name}</h3>
            <p>Math: {student.math}</p>
            <p>Science: {student.science}</p>
            <p>English: {student.english}</p>
            <p><strong>Average: {getAverage(student)}%</strong></p>
            <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentManager;