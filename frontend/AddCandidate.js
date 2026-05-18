import { useState } from "react";
import api from "../api";

export default function AddCandidate() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await api.post("/candidates", form);
    alert("Added");
  };

  return (
    <div>
      <input placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={e => setForm({...form, email: e.target.value})} />

      <input placeholder="Skills (comma)"
        onChange={e => setForm({
          ...form,
          skills: e.target.value.split(",")
        })} />

      <input placeholder="Experience"
        onChange={e => setForm({...form, experience: e.target.value})} />

      <button onClick={submit}>Add</button>
    </div>
  );
}