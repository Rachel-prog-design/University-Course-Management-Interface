import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/courses", { title, description });
      alert("Course created!");
      navigate("/dashboard");
    } catch {
      alert("Error creating course");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Course</h2>
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Create</button>
    </form>
  );
}