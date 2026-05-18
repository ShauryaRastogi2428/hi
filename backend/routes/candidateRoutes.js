const router = require("express").Router();
const Candidate = require("../models/Candidate");

/* =========================
   ADD CANDIDATE
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const data = await Candidate.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Candidate added successfully",
      data
    });

  } catch (err) {
    console.error("ADD ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* =========================
   GET ALL CANDIDATES
========================= */
router.get("/", async (req, res) => {
  try {
    const data = await Candidate.find();

    return res.status(200).json({
      success: true,
      data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;