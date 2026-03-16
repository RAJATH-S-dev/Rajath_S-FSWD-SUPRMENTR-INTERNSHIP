import "./App.css";

const students = [
  {
    id: 1,
    name: "Rajath S",
    course: "Information Science & Engineering",
    year: "2nd Year",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Alice",
  },
  {
    id: 2,
    name: "R Pradhyumna",
    course: "Computer Science & Engineering",
    year: "3rd Year",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Bob",
  },
  {
    id: 3,
    name: "My Nigga",
    course: "Electronics & Communication",
    year: "1st Year",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Charlie",
  },
  {
    id: 4,
    name: "Batman",
    course: "Mechanical Engineering",
    year: "4th Year",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=Diana",
  },
];

function StudentCard({ student }) {
  return (
    <div style={{
      background: "#ffffff",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "220px",
    }}>

      
      <img
        src={student.image}
        alt={student.name}
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          border: "1px solid #ccc",
          marginBottom: "16px",
          background: "#e8e8e8",
        }}
      />

      
      <p style={{
        fontSize: "0.65rem",
        letterSpacing: "2px",
        color: "#888",
        marginBottom: "12px",
        textTransform: "uppercase",
      }}>
        MyApp University
      </p>

      <div style={{
        borderTop: "1px solid #ccc",
        width: "100%",
        marginBottom: "12px",
      }}></div>

      
      <p style={{
        fontSize: "0.65rem",
        letterSpacing: "2px",
        color: "#888",
        marginBottom: "4px",
      }}>NAME</p>
      <p style={{
        fontSize: "1rem",
        color: "#111",
        fontWeight: "bold",
        marginBottom: "14px",
      }}>{student.name}</p>

      
      <p style={{
        fontSize: "0.65rem",
        letterSpacing: "2px",
        color: "#888",
        marginBottom: "4px",
      }}>COURSE</p>
      <p style={{
        fontSize: "0.85rem",
        color: "#333",
        marginBottom: "14px",
      }}>{student.course}</p>

      
      <p style={{
        fontSize: "0.65rem",
        letterSpacing: "2px",
        color: "#888",
        marginBottom: "4px",
      }}>YEAR</p>
      <p style={{
        fontSize: "0.85rem",
        color: "#333",
      }}>{student.year}</p>

      <div style={{
        borderTop: "1px solid #ccc",
        width: "100%",
        marginTop: "16px",
        paddingTop: "10px",
      }}>
        <p style={{
          fontSize: "0.65rem",
          letterSpacing: "1px",
          color: "#bbb",
        }}>STUDENT ID · {student.id.toString().padStart(4, "0")}</p>
      </div>

    </div>
  );
}

function App() {
  return (
    <div className="page">

      
      <header className="header">
        <p className="header-logo">✦ MyApp</p>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      
      <main className="main">
        <div className="container">
          <h1>Student ID Cards</h1>
          <p className="subtitle">ENROLLED STUDENTS</p>
          <div className="divider"></div>

          <div className="cards-grid">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
      </main>

      
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