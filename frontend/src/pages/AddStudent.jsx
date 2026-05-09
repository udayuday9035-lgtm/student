

import { useState } from "react";
import "../styles/AddStudent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    year: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    photo: ""
  });

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = URL.createObjectURL(e.target.files[0]);

      setForm({
        ...form,
        photo: file
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const oldStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    const newStudent = {
      id: Date.now(),
      ...form,
      status: "Active"
    };

    const updatedStudents = [...oldStudents, newStudent];

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Student Added Successfully!");

    setForm({
      fullName: "",
      email: "",
      phone: "",
      college: "",
      course: "",
      year: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      photo: ""
    });
  };

  return (
    <div className="add-student-container">
      <div className="form-box">

        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← 
        </button>

        <h1>Add Student</h1>
        <p>Enter Internship Student Details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={form.college}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={form.course}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;