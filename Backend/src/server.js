const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const medicineRoutes = require("./routes/medicineroutes");

const authenticateToken = require("./middleware/authMiddleware");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });
const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);

connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "MediFind API is running" });
});

// Protected route
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