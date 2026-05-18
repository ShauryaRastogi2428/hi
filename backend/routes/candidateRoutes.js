const router = require("express").Router();
const Candidate = require("../models/Candidate");

router.post("/", async (req, res) => {
  const data = await Candidate.create(req.body);
  res.json(data);
});

router.get("/", async (req, res) => {
  const data = await Candidate.find();
  res.json(data);
});

module.exports = router;