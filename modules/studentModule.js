import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "..", "students.json");

function readStudents() {
  const data = fs.readFileSync(dbFile, "utf8");
  return JSON.parse(data);
}

function writeStudents(students) {
  fs.writeFileSync(dbFile, JSON.stringify(students, null, 2));
}

function getAllStudents() {
  return readStudents();
}

function createStudent(student) {
  const students = readStudents();

  const newStudent = {
    id: Date.now(),
    name: student.name,
    age: student.age,
    course: student.course
  };

  students.push(newStudent);
  writeStudents(students);
  return newStudent;
}

function updateStudent(id, updatedData) {
  const students = readStudents();

  const updatedStudents = students.map((student) =>
    student.id === Number(id)
      ? {
          ...student,
          name: updatedData.name,
          age: updatedData.age,
          course: updatedData.course
        }
      : student
  );

  writeStudents(updatedStudents);
}

function deleteStudent(id) {
  const students = readStudents();
  const filteredStudents = students.filter(
    (student) => student.id !== Number(id)
  );
  writeStudents(filteredStudents);
}

export {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
};