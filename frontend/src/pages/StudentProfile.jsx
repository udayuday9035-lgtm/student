import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentProfile.css";

function StudentProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state;

  if (!student) {
    return <h2>No Student Data Found</h2>;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">

        <button
          className="back-btn"
          onClick={() => navigate("/view-students")}
        >
          ← Back
        </button>

        <img
          src={student.photo}
          alt="student"
          className="profile-image"
        />

        <h1>{student.fullName}</h1>
        <p>{student.email}</p>

        <div className="profile-details">
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>College:</strong> {student.college}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Status:</strong> {student.status}</p>
        </div>

      </div>
    </div>
  );
}

export default StudentProfile;