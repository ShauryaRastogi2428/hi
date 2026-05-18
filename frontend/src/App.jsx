import AddCandidate from "./components/AddCandidate";
import JobForm from "./components/JobForm";

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