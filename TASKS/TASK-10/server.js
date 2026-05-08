const express = require('express');
const app = express();
const PORT = 3000;

// Built-in middleware to parse incoming JSON data
app.use(express.json());

// ==========================================
// 📝 CUSTOM LOGGER MIDDLEWARE
// ==========================================
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next(); // This tells Express to move on to the actual route handler
};

// Apply the logger middleware to all routes
app.use(logger);

// ==========================================
// 💾 IN-MEMORY DATABASE
// ==========================================
let students = [
    { id: 1, name: "Arjun", course: "AI" },
    { id: 2, name: "Priya", course: "Web" }
];

// ==========================================
// 🛣️ ROUTES
// ==========================================

// 1. GET all students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// 2. GET student by ID
app.get('/students/:id', (req, res) => {
    // req.params.id is always a string, so we convert it to a number
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

// 3. POST Add student
// Note: Standard REST APIs usually just use POST '/students', 
// but we are using '/students/add' to match your specific requirements!
app.post('/students/add', (req, res) => {
    const { name, course } = req.body;

    // Basic validation
    if (!name || !course) {
        return res.status(400).json({ message: "Please provide both name and course." });
    }

    // Generate a new ID (finds the highest current ID and adds 1)
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = {
        id: newId,
        name: name,
        course: course
    };

    students.push(newStudent);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Student API is running on http://localhost:${PORT}`);
});