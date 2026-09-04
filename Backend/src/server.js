const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MediFind backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`MediFind backend running on port ${PORT}`);
});