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
  const [success, setSuccess] = useState("");

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
      setSuccess("");

      const payload = {
        name: form.name,
        email: form.email,
        skills: form.skills.split(",").map(s => s.trim()),
        experience: Number(form.experience)
      };

      const res = await api.post("/candidates", payload);

      console.log("SUCCESS:", res.data);

      setSuccess("✅ Candidate added successfully!");

      setForm({
        name: "",
        email: "",
        skills: "",
        experience: ""
      });

    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Backend Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formBox">

      <h2 className="title">➕ Add Candidate</h2>

      <input
        className="input"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <input
        className="input"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address"
      />

      <input
        className="input"
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills (React, Node, MongoDB)"
      />

      <input
        className="input"
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience (Years)"
      />

      <button
        className="addBtn"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "⏳ Adding Candidate..." : "🚀 Add Candidate"}
      </button>

      {success && (
        <div className="successBox">
          {success}
        </div>
      )}

    </div>
  );
}