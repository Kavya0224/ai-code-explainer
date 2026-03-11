const express = require("express");
const cors = require("cors");
require("dotenv").config();

const repoRoutes = require("./src/routes/repoRoutes");
const searchRoutes = require("./src/routes/searchRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/repo", repoRoutes);
app.use("/api/search", searchRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("AI Codebase Explainer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});