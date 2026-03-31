import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/courses/${id}`);
      fetchCourses();
    } catch (error) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <Link to="/create">Add Course</Link>

      {courses.map((course) => (
        <div key={course.id} className="card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <Link to={`/course/${course.id}`}>View</Link>
          <Link to={`/edit/${course.id}`}>Edit</Link>
          <button onClick={() => deleteCourse(course.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}