import { useState } from "react";
import api from "../api";

export default function AddCandidate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await api.post("/candidates", {
      name: form.name,
      email: form.email,
      skills: form.skills.split(","),
      experience: Number(form.experience)
    });

    alert("Candidate Added ✅");
  };

  return (
    <div>
      <h2>Add Candidate</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="skills" placeholder="Skills (React,Node)" onChange={handleChange} />
      <input name="experience" placeholder="Experience" onChange={handleChange} />

      <button onClick={submit}>Add Candidate</button>
    </div>
  );
}