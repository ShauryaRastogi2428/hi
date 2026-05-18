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

      const res = await api.post("/candidates", {
        name: form.name,
        email: form.email,
        skills: form.skills.split(",").map(s => s.trim()),
        experience: Number(form.experience)
      });

      console.log("Response:", res.data);

      alert("Candidate Added ✅");

      // reset form
      setForm({
        name: "",
        email: "",
        skills: "",
        experience: ""
      });

    } catch (err) {
      console.error("Error adding candidate:", err);
      alert("Failed to add candidate ❌ Check backend/API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Candidate</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="skills"
        placeholder="Skills (React, Node)"
        value={form.skills}
        onChange={handleChange}
      />

      <input
        name="experience"
        placeholder="Experience"
        value={form.experience}
        onChange={handleChange}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Adding..." : "Add Candidate"}
      </button>
    </div>
  );
}