const router = require("express").Router();
const axios = require("axios");
const Candidate = require("../models/Candidate");

router.post("/shortlist", async (req, res) => {
  const candidates = await Candidate.find();

  const prompt = `
Job: ${req.body.requiredSkills.join(",")} (${req.body.minExperience}+ years)

Candidates:
${candidates.map((c, i) =>
`${i+1}. ${c.name} - ${c.skills.join(",")} - ${c.experience} years`
).join("\n")}

Rank candidates and explain why.
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  res.json(response.data);
});

module.exports = router;