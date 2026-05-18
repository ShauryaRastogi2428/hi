import AddCandidate from "./components/AddCandidate.jsx";
import JobForm from "./components/JobForm.jsx";

export default function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 AI Candidate Shortlisting System</h1>
        <p style={styles.subtitle}>
          Smart Hiring Dashboard with AI + Basic Matching
        </p>
      </header>

      <div style={styles.grid}>
        {/* Add Candidate Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>➕ Add Candidate</h2>
          <AddCandidate />
        </div>

        {/* Job Matching Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🎯 Job Matching</h2>
          <JobForm />
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        Built with ❤️ using React + Node + MongoDB + AI
      </footer>
    </div>
  );
}

/* =========================
   STYLES
========================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #eef2f3, #cfd9df)",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "32px",
    margin: "0",
    color: "#111827",
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    alignItems: "start",
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  cardTitle: {
    marginBottom: "15px",
    fontSize: "20px",
    color: "#111827",
  },

  footer: {
    marginTop: "40px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
};