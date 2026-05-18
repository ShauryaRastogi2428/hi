import { useState } from "react";
import api from "../api";

export default function JobForm() {
  const [skills, setSkills] = useState("");

  const submit = async () => {
    const res = await api.post("/match", {
      requiredSkills: skills.split(","),
      minExperience: 1
    });
    console.log(res.data);
  };

  const aiShortlist = async () => {
    const res = await api.post("/ai/shortlist", {
      requiredSkills: skills.split(","),
      minExperience: 1
    });
    console.log(res.data);
  };

  return (
    <div>
      <input placeholder="Required Skills"
        onChange={e => setSkills(e.target.value)} />

      <button onClick={submit}>Basic Match</button>
      <button onClick={aiShortlist}>AI Match</button>
    </div>
  );
}