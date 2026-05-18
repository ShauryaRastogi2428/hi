import { useState } from "react";
import api from "../api";

export default function AddCandidate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.skills || !form.experience) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        skills: form.skills.split(",").map(s => s.trim()),
        experience: Number(form.experience)
      };

      const res = await api.post("/candidates", payload);

      console.log("SUCCESS RESPONSE:", res.data);

      alert(res.data?.message || "Candidate Added ✅");

      setForm({
        name: "",
        email: "",
        skills: "",
        experience: ""
      });

    } catch (err) {
      console.log("❌ FULL ERROR:", err);
      console.log("❌ RESPONSE:", err.response?.data);
      console.log("❌ STATUS:", err.response?.status);
      console.log("❌ MESSAGE:", err.message);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Backend Error ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Candidate</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (React, Node)" />
      <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" />

      <button onClick={submit} disabled={loading}>
        {loading ? "Adding..." : "Add Candidate"}
      </button>
    </div>
  );
}