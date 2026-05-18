import { useState } from "react";
import api from "../api";

export default function JobForm() {
  const [skills, setSkills] = useState("");

  const basicMatch = async () => {
    const res = await api.post("/match", {
      requiredSkills: skills.split(","),
      minExperience: 1
    });

    console.log(res.data);
  };

  const aiMatch = async () => {
    const res = await api.post("/ai/shortlist", {
      requiredSkills: skills.split(","),
      minExperience: 1
    });

    console.log(res.data);
  };

  return (
    <div>
      <h2>Job Matching</h2>

      <input
        placeholder="Required Skills (React,Node)"
        onChange={(e) => setSkills(e.target.value)}
      />

      <button onClick={basicMatch}>Basic Match</button>
      <button onClick={aiMatch}>AI Match</button>
    </div>
  );
}