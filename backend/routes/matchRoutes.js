const router = require("express").Router();
const Candidate = require("../models/Candidate");
const { matchCandidates } = require("../utils/match");

router.post("/", async (req, res) => {
  const candidates = await Candidate.find();
  const result = matchCandidates(candidates, req.body);
  res.json(result);
});

module.exports = router;