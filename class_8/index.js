const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory store for students
let nextId = 1;
const students = [];

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

// Create student
app.post("/students", (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const student = { id: nextId++, name, email };
  students.push(student);

  return res.status(201).json(student);
});

// Read all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Read one student
app.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "student not found" });
  }

  return res.json(student);
});

// Update student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ error: "student not found" });
  }

  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  student.name = name;
  student.email = email;

  return res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "student not found" });
  }

  const deleted = students.splice(index, 1)[0];
  return res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
