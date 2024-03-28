const express = require("express");
const { createTokens } = require("../controllers/tokens.js");

const router = express.Router();

router.post("/", createTokens);

module.exports = router;
