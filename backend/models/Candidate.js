const router = require("express").Router();
const Candidate = require("../models/Candidate");

/* =========================
   ADD CANDIDATE (FIXED)
========================= */
router.post("/", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // debug

    const data = await Candidate.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Candidate added successfully",
      data
    });

  } catch (err) {
    console.error("POST ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to add candidate",
      error: err.message
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
    console.error("GET ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
      error: err.message
    });
  }
});

module.exports = router;