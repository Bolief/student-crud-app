import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "./modules/studentModule.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Web pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/students-page", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "students.html"));
});

// CRUD routes
app.get("/students", (req, res) => {
  res.json(getAllStudents());
});

app.post("/students", (req, res) => {
  const newStudent = createStudent(req.body);
  res.json(newStudent);
});

app.put("/students/:id", (req, res) => {
  updateStudent(req.params.id, req.body);
  res.json({ message: "Student updated" });
});

app.delete("/students/:id", (req, res) => {
  deleteStudent(req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});