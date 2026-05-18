import { useEffect, useState } from "react";
import AddCandidate from "./components/AddCandidate";
import JobForm from "./components/JobForm";
import Analytics from "./components/Analytics";
import api from "./api";

export default function App() {

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      const res = await api.get("/candidates");

      // safe fallback (important for Render/API mismatch)
      const data = res.data?.data || [];

      setCandidates(data);
      setError("");

    } catch (err) {
      console.log("Fetch error:", err);
      setError("Failed to load candidates ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        🚀 AI Candidate Shortlisting System
      </header>

      {/* STATUS */}
      {loading && (
        <div className="status">
          🔄 Loading candidates...
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid">

        <div className="card hoverCard">
          <AddCandidate onSuccess={fetchCandidates} />
        </div>

        <div className="card hoverCard">
          <JobForm />
        </div>

      </div>

      {/* ANALYTICS */}
      <div className="card full hoverCard">
        <Analytics candidates={candidates} />
      </div>

    </div>
  );
}