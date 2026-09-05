const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "MediFind API is running" });
});
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});