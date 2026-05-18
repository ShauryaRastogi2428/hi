const router = require("express").Router();
const axios = require("axios");
const Candidate = require("../models/Candidate");

router.post("/shortlist", async (req, res) => {
  try {
    const candidates = await Candidate.find();

    const { requiredSkills = [], minExperience = 0 } = req.body;

    const prompt = `
You are an AI HR assistant.

Job Requirements:
Skills: ${requiredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidates.map((c, i) =>
`${i + 1}. Name: ${c.name}
Skills: ${c.skills.join(", ")}
Experience: ${c.experience} years`
).join("\n\n")}

Task:
1. Rank candidates from best to worst match
2. Give match score out of 100
3. Give short reason for each candidate

Return response in clean JSON format.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data?.choices?.[0]?.message?.content;

    res.json({
      success: true,
      result: aiText
    });

  } catch (err) {
    console.error("AI Match Error:", err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "AI matching failed",
      error: err.message
    });
  }
});

module.exports = router;