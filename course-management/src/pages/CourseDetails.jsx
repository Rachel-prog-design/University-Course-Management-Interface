import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!course) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500">Course not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-700 text-white px-8 py-4 shadow">
        <h1 className="text-xl font-bold">📚 Course Management</h1>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          {course.code && (
            <p className="text-sm text-gray-500 mb-2"><span className="font-semibold">Code:</span> {course.code}</p>
          )}
          {course.credits && (
            <p className="text-sm text-gray-500 mb-6"><span className="font-semibold">Credits:</span> {course.credits}</p>
          )}

          <div className="flex gap-3 mt-4">
            <Link
              to={`/edit/${course.id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-sm font-semibold"
            >
              Edit Course
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition text-sm font-semibold"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}