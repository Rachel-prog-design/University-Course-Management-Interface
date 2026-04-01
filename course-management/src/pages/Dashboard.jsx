import { useEffect, useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await API.get("/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-8 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">📚 Course Management</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-4 py-1.5 rounded hover:bg-gray-100 text-sm font-semibold transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-semibold"
          >
            + Add Course
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No courses found. Add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-gray-800">{course.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{course.description}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/course/${course.id}`}
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${course.id}`}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded text-sm hover:bg-yellow-200 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-100 text-red-600 px-3 py-1.5 rounded text-sm hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}