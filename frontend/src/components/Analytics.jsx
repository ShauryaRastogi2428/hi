import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

export default function Analytics({ candidates = [] }) {

  const skillMap = {};
  const expData = [];

  // SAFE GUARD (important for production)
  candidates?.forEach(c => {
    expData.push({
      name: c.name || "Unknown",
      experience: c.experience || 0
    });

    (c.skills || []).forEach(skill => {
      skillMap[skill] = (skillMap[skill] || 0) + 1;
    });
  });

  const skillData = Object.keys(skillMap).map(key => ({
    name: key,
    value: skillMap[key]
  }));

  const COLORS = [
    "#ff6b6b",
    "#4dabf7",
    "#51cf66",
    "#ffd43b",
    "#845ef7",
    "#f97316",
    "#22c55e"
  ];

  return (
    <div className="analyticsBox">

      {/* HEADER */}
      <h2 className="title">📊 AI Talent Analytics</h2>

      {candidates.length === 0 ? (
        <div className="emptyState">
          ⚠️ No candidates available for analytics
        </div>
      ) : (
        <div className="chartGrid">

          {/* PIE CHART */}
          <div className="chartCard">
            <h3>🔥 Skill Distribution</h3>

            <PieChart width={320} height={260}>
              <Pie
                data={skillData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {skillData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* BAR CHART */}
          <div className="chartCard">
            <h3>📈 Experience Level</h3>

            <BarChart width={420} height={260} data={expData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="experience"
                fill="#4dabf7"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>

        </div>
      )}

      {/* AI INSIGHT BOX */}
      {candidates.length > 0 && (
        <div className="insightBox">
          🧠 AI Insight:
          <br />
          • Total Candidates: <b>{candidates.length}</b>
          <br />
          • Most Common Skill:{" "}
          <b>
            {Object.keys(skillMap).sort(
              (a, b) => skillMap[b] - skillMap[a]
            )[0] || "N/A"}
          </b>
        </div>
      )}

    </div>
  );
}