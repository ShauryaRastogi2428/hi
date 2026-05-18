import { useState } from "react";
import api from "../api";

export default function JobForm() {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const basicMatch = async () => {
    try {
      setLoading(true);

      const res = await api.post("/match", {
        requiredSkills: skills.split(",").map(s => s.trim()),
        minExperience: 1
      });

      console.log("Basic Match:", res.data);
      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("Basic Match failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const aiMatch = async () => {
    try {
      setLoading(true);

      const res = await api.post("/ai/shortlist", {
        requiredSkills: skills.split(",").map(s => s.trim()),
        minExperience: 1
      });

      console.log("AI Match:", res.data);
      setResult(res.data);

    } catch (err) {
      console.error(err);
      alert("AI Match failed ❌ Check backend route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Job Matching</h2>

      <input
        placeholder="Required Skills (React, Node)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button onClick={basicMatch} disabled={loading}>
        Basic Match
      </button>

      <button onClick={aiMatch} disabled={loading}>
        AI Match
      </button>

      {result && (
        <pre style={{ marginTop: "20px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}