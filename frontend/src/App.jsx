import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import ViewStudents from "./pages/ViewStudents";
import InternshipStatus from "./pages/InternshipStatus";
import Certificate from "./pages/Certificate";
import StudentProfile from "./pages/StudentProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-student" element={<AddStudent />} />

        <Route path="/view-students" element={<ViewStudents />} />

        <Route path="/internship-status"element={<InternshipStatus />}/>

        <Route path="/certificate"  element={<Certificate />}/>

         <Route path="/student-profile" element={<StudentProfile/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;