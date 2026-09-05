const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "MediFind API is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});