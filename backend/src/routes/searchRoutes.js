/*
  Search Routes
*/

const express = require("express");
const router = express.Router();

const { searchRepository } = require("../controllers/searchController");

/*
  POST /api/search
*/
router.post("/", searchRepository);

module.exports = router;