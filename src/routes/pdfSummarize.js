const express = require("express");
const { getStringTest } = require("../controllers/pdfSummarize.js");
const router = express.Router();

router.get("/", getStringTest);

module.exports = router;
