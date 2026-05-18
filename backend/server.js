const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* =======================
   ROUTES
======================= */
app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);

/* =======================
   SERVER START
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);