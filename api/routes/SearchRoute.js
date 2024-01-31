// userRoutes.js
const express = require("express");
const router = express.Router();
const { PartSearch } = require("../controllers/SearchController");

router.get("/", PartSearch);

module.exports = router;
