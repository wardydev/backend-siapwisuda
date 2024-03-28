const express = require("express");
const { getUserBalance } = require("../controllers/balance.js");

const router = express.Router();

router.get("/", getUserBalance);

module.exports = router;
