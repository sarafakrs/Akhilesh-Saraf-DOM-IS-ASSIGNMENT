
const main = document.querySelector(".MainContainer");
const form = document.querySelector("form");
const studentList = document.createElement("div");
studentList.classList.add("student-list");
main.appendChild(studentList);

document.addEventListener("DOMContentLoaded", loadStudents);


form.addEventListener("submit", function (event) {
    event.preventDefault();

    
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const dob = document.querySelector("#dob").value.trim();
    const gender = document.querySelector("[name='gender']").value.trim();
    const course = document.querySelector("#course").value.trim();

    
    if (!name || !email || !phone || !dob || !gender || !course) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Student name should contain only letters.");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits.");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // unique student ID
    const studentID = new Date().getTime();

    
    const student = { id: studentID, name, email, phone, dob, gender, course };

    
    saveStudent(student);

    
    addStudentToUI(student);

    
    form.reset();
});

// save student 
function saveStudent(student) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
}

// load students from localStorage
function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(addStudentToUI);
}

// add student record to UI
function addStudentToUI(student) {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-record");
    studentDiv.setAttribute("data-id", student.id);
    studentDiv.innerHTML = `
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Phone:</strong> ${student.phone}</p>
        <p><strong>Date of Birth:</strong> ${student.dob}</p>
        <p><strong>Gender:</strong> ${student.gender}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    
    studentList.appendChild(studentDiv);

    // Handle Edit functionality
    studentDiv.querySelector(".edit").addEventListener("click", function () {
        document.querySelector("#name").value = student.name;
        document.querySelector("#email").value = student.email;
        document.querySelector("#phone").value = student.phone;
        document.querySelector("#dob").value = student.dob;
        document.querySelector("[name='gender']").value = student.gender;
        document.querySelector("#course").value = student.course;
        

        // Remove the student from UI 
        removeStudent(student.id);
        studentDiv.remove();
    });

    
    studentDiv.querySelector(".delete").addEventListener("click", function () {
        removeStudent(student.id);
        studentDiv.remove();
    });
}

// Function to remove student 
function removeStudent(id) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
}
