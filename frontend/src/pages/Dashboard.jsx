import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();

  const [searchName, setSearchName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [completedStudents, setCompletedStudents] = useState(0);
  const [pendingStudents, setPendingStudents] = useState(0);

  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const total = students.length;

    const active = students.filter(
      (student) => student.status === "Active"
    ).length;

    const completed = students.filter(
      (student) => student.status === "Completed"
    ).length;

    const pending = students.filter(
      (student) => student.status === "Pending"
    ).length;

    setTotalStudents(total);
    setActiveStudents(active);
    setCompletedStudents(completed);
    setPendingStudents(pending);

    setGraphData([
      { name: "Total", value: total },
      { name: "Active", value: active },
      { name: "Completed", value: completed },
      { name: "Pending", value: pending }
    ]);
  }, []);

  const handleSearch = () => {
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (student) =>
        student.fullName?.toLowerCase() ===
        searchName.toLowerCase()
    );

    if (foundStudent) {
      navigate("/student-profile", {
        state: foundStudent
      });
    } else {
      alert("Student Not Found!");
    }
  };

  const COLORS = [
    "#1e3c72",
    "#28a745",
    "#17a2b8",
    "#ffc107"
  ];

  return (
    <div className="dashboard">

      {/* Toggle Button */}
      <button
        className="menu-btn"
        onClick={() =>
          setIsSidebarOpen(!isSidebarOpen)
        }
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${
          isSidebarOpen ? "open" : "close"
        }`}
      >
        <h2>C2C Nexora</h2>

        <ul>
          
          <li onClick={() => navigate("/add-student")}>
            Add Student
          </li>

          <li onClick={() => navigate("/view-students")}>
            View Students
          </li>

          <li onClick={() => navigate("/internship-status")}>
            Internship Status
          </li>

          <li onClick={() => navigate("/certificate")}>
            Certificates
          </li>

          
          <li onClick={() => navigate("/")}>
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Top Section */}
        <div className="top-banner">

          <div className="navbar">
            <div>
              <h1>C2C NEXORA</h1>
            
            </div>

            <div className="search-box">
              <input
                type="text"
                placeholder="Search Student Name"
                value={searchName}
                onChange={(e) =>
                  setSearchName(e.target.value)
                }
              />

              <button onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>

          

        </div>

        {/* Cards */}
        <div className="cards">

          <div
            className="card"
            onClick={() => navigate("/view-students")}
          >
            <h3>Total Students</h3>
            <h2>{totalStudents}</h2>
          </div>

          <div
            className="card"
            onClick={() => navigate("/internship-status")}
          >
            <h3>Active Internships</h3>
            <h2>{activeStudents}</h2>
          </div>

          <div
            className="card"
            onClick={() => navigate("/internship-status")}
          >
            <h3>Completed</h3>
            <h2>{completedStudents}</h2>
          </div>

          <div
            className="card"
            onClick={() => navigate("/internship-status")}
          >
            <h3>Pending</h3>
            <h2>{pendingStudents}</h2>
          </div>

        </div>

        {/* Graph Section */}
        <div className="graph-section">

          <div className="graph-box">
            <h2>Internship Performance</h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={graphData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#1e3c72"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="graph-box">
            <h2>Student Status Overview</h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={graphData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {graphData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;