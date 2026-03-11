const express = require("express");

const router = express.Router();

// Import controller
const { analyzeRepo } = require("../controllers/repoController");


// Route for analyzing repository
router.post("/analyze", analyzeRepo);


module.exports = router;