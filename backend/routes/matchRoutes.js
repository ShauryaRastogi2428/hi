const router = require("express").Router();
const Candidate = require("../models/Candidate");
const { matchCandidates } = require("../utils/match");

router.post("/", async (req, res) => {
  try {
    const { requiredSkills, minExperience } = req.body;

    if (!requiredSkills || !Array.isArray(requiredSkills)) {
      return res.status(400).json({
        message: "requiredSkills must be an array"
      });
    }

    const candidates = await Candidate.find();

    const result = matchCandidates(candidates, {
      requiredSkills,
      minExperience: minExperience || 0
    });

    res.json(result);

  } catch (err) {
    console.error("Match error:", err);
    res.status(500).json({
      message: "Server error in matching",
      error: err.message
    });
  }
});

module.exports = router;