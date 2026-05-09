import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InternshipStatus.css";

function InternshipStatus() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Uday Kumar",
      course: "BCA",
      domain: "Web Development",
      status: "Active"
    },
    {
      id: 2,
      name: "Sandeep",
      course: "BCA",
      domain: "Web Development",
      status: "Completed"
    },
    {
      id: 3,
      name: "Dushaynth",
      course: "BCA",
      domain: "Web Development",
      status: "Pending"
    }
  ]);

  const [editingStudent, setEditingStudent] = useState(null);

  /* Add New Student Form */
  const [newStudent, setNewStudent] = useState({
    name: "",
    course: "",
    domain: "",
    status: "Active"
  });

  /* Add Student */
  const handleAddStudent = () => {
    if (
      !newStudent.name ||
      !newStudent.course ||
      !newStudent.domain
    ) {
      alert("Please fill all fields!");
      return;
    }

    const studentToAdd = {
      id: Date.now(),
      ...newStudent
    };

    setStudents([...students, studentToAdd]);

    setNewStudent({
      name: "",
      course: "",
      domain: "",
      status: "Active"
    });

    alert("Student Added Successfully!");
  };

  /* Change Status */
  const handleStatusChange = (id, newStatus) => {
    const updatedStudents = students.map((student) =>
      student.id === id
        ? { ...student, status: newStatus }
        : student
    );

    setStudents(updatedStudents);
  };

  /* Edit Student */
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  /* Update Student */
  const handleUpdate = () => {
    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? editingStudent
        : student
    );

    setStudents(updatedStudents);
    setEditingStudent(null);

    alert("Student Updated Successfully!");
  };

  /* Delete Student */
  const handleDelete = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);

    alert("Student Deleted Successfully!");
  };

  return (
    <div className="status-container">

<button
  className="back-btn"
  onClick={() => navigate("/dashboard")}
>
  ←
</button>

      <h1>Internship Status</h1>
      <p>Track Student Internship Progress</p>

      {/* Add Student Form */}
      <div className="add-form">
        <h2>Add Details</h2>

        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              name: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Course"
          value={newStudent.course}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              course: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Domain"
          value={newStudent.domain}
          onChange={(e) =>
            setNewStudent({
              ...newStudent,
              domain: e.target.value
            })
          }
        />

        <button onClick={handleAddStudent}>
          Add Details
        </button>
      </div>

      {/* Edit Form */}
      {editingStudent && (
        <div className="edit-form">
          <h2>Edit Student</h2>

          <input
            type="text"
            value={editingStudent.name}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                name: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editingStudent.course}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                course: e.target.value
              })
            }
          />

          <input
            type="text"
            value={editingStudent.domain}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                domain: e.target.value
              })
            }
          />

          <button onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Domain</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.domain}</td>

              <td>
                <select
                  value={student.status}
                  onChange={(e) =>
                    handleStatusChange(
                      student.id,
                      e.target.value
                    )
                  }
                >
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </td>

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

    </div>
  );
}

export default InternshipStatus;