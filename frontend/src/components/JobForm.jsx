import { useState } from "react";
import api from "../api";

export default function JobForm() {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const parseSkills = (str) =>
    str.split(",").map(s => s.trim()).filter(Boolean);

  const basicMatch = async () => {
    try {
      setLoading(true);

      const res = await api.post("/match", {
        requiredSkills: parseSkills(skills),
        minExperience: 1
      });

      setResult({ type: "basic", data: res.data });

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
        requiredSkills: parseSkills(skills),
        minExperience: 1
      });

      setResult({ type: "ai", data: res.data });

    } catch (err) {
      console.error(err);
      alert("AI Match failed ❌ Check backend route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jobBox">

      {/* TITLE */}
      <h2 className="title">🎯 AI Job Matching Engine</h2>

      {/* INPUT */}
      <input
        className="input"
        placeholder="Enter skills (React, Node, MongoDB)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      {/* BUTTONS */}
      <div className="btnGroup">

        <button className="basicBtn" onClick={basicMatch} disabled={loading}>
          ⚡ Basic Match
        </button>

        <button className="aiBtn" onClick={aiMatch} disabled={loading}>
          🧠 AI Match
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          🔄 AI analyzing candidates...
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="resultBox">

          {/* BASIC MATCH UI */}
          {result.type === "basic" && (
            <>
              <h3 className="sectionTitle">⚡ Basic Matching Results</h3>

              <div className="gridCards">
                {result.data.map((c, i) => (
                  <div key={i} className="card glowCard">
                    <div className="badge">#{i + 1}</div>

                    <p><b>👤 Name:</b> {c.name}</p>
                    <p><b>📧 Email:</b> {c.email}</p>

                    <div className="score">
                      ⚡ Match Score:
                      <span className="highlight">
                        {Math.round(c.matchScore * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* AI MATCH UI */}
          {result.type === "ai" && (
            <>
              <h3 className="sectionTitle">🧠 AI Shortlisted Candidates</h3>

              <div className="aiBox fancyAI">
                {result.data?.choices?.[0]?.message?.content || "No AI response"}
              </div>
            </>
          )}

        </div>
      )}

    </div>
  );
}