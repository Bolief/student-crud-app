const form = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const studentId = document.getElementById("studentId");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");

async function loadStudents() {
  const res = await fetch("/students");
  const students = await res.json();

  studentTableBody.innerHTML = "";

  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>
        <button class="btn btn-warning btn-sm me-2"
          onclick="editStudent(${student.id}, '${student.name}', '${student.age}', '${student.course}')">
          Edit
        </button>
        <button class="btn btn-danger btn-sm"
          onclick="deleteStudent(${student.id})">
          Delete
        </button>
      </td>
    `;

    studentTableBody.appendChild(row);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentData = {
    name: nameInput.value,
    age: ageInput.value,
    course: courseInput.value
  };

  if (studentId.value) {
    await fetch(`/students/${studentId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
  } else {
    await fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData)
    });
  }

  form.reset();
  studentId.value = "";
  loadStudents();
});

function editStudent(id, name, age, course) {
  studentId.value = id;
  nameInput.value = name;
  ageInput.value = age;
  courseInput.value = course;
}

async function deleteStudent(id) {
  await fetch(`/students/${id}`, {
    method: "DELETE"
  });
  loadStudents();
}

loadStudents();