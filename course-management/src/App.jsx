import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import CourseDetails from "./pages/CourseDetails";
import EditCourse from "./pages/EditCourse";

export default function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/edit/:id" element={<EditCourse />} />
      </Routes>
    
  );
}