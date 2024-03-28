const express = require("express");
const { createSks } = require("../controllers/sks.js");

const router = express.Router();

router.post("/", createSks);

module.exports = router;
