import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get(`/courses/${id}`).then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
    });
  }, [id]);

  const updateCourse = async (e) => {
    e.preventDefault();
    await API.put(`/api/courses/${id}`, { title, description });
    alert("Updated!");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={updateCourse}>
      <h2>Edit Course</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Update</button>
    </form>
  );
}