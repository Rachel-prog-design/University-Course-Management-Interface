import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/api/courses", { title, description });
      alert("Course created successfully!");
      navigate("/dashboard");
    } catch {
      alert("Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white px-8 py-4 shadow">
        <h1 className="text-xl font-bold">📚 Course Management</h1>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-10">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                placeholder="e.g. Introduction to Computer Science"
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter course description..."
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold text-sm disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
              <Link
                to="/dashboard"
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition text-sm font-semibold"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}