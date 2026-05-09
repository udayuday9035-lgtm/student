
import { useEffect, useState } from "react";
import "../styles/ViewStudents.css";
import { useNavigate } from "react-router-dom";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);
  }, []);

  // Delete Student
  const handleDelete = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Student Deleted Successfully!");
  };

  // Edit Student
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // Update Student
  const handleUpdate = () => {
    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? editingStudent
        : student
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    setEditingStudent(null);

    alert("Student Updated Successfully!");
  };

  return (
    <div className="view-students-container">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← 
      </button>

      <h1>View Students</h1>
      <p>Manage Internship Student Records</p>

      {/* Edit Form */}
      {editingStudent && (
        <div className="edit-form">
          <h2>Edit Student</h2>

          <input
            type="text"
            value={editingStudent.fullName}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                fullName: e.target.value
              })
            }
          />

          <input
            type="email"
            value={editingStudent.email}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                email: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editingStudent.phone}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                phone: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editingStudent.college}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                college: e.target.value
              })
            }
          />

          <button onClick={handleUpdate}>
            Update Student
          </button>
        </div>
      )}

      {students.length === 0 ? (
        <h3>No Students Added Yet</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>Course</th>
              <th>Year</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <img
                    src={student.photo}
                    alt="student"
                  />
                </td>

                {/* Click student name → Student Profile page */}
                <td
                  style={{
                    cursor: "pointer",
                    color: "#1e3c72",
                    fontWeight: "bold"
                  }}
                  onClick={() =>
                    navigate("/student-profile", {
                      state: student
                    })
                  }
                >
                  {student.fullName}
                </td>

                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.college}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>{student.gender}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.address}</td>
                <td>{student.status}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(student.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewStudents;