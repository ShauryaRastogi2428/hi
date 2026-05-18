import AddCandidate from "./components/AddCandidate.jsx";
import JobForm from "./components/JobForm.jsx";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Candidate Shortlisting System 🚀</h1>

      <AddCandidate />
      <hr />
      <JobForm />
    </div>
  );
}