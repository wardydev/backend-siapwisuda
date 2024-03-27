const express = require("express");
const { createDeposit, confirmDeposit } = require("../controllers/deposit.js");
const { createBalance } = require("../controllers/balance.js");

const router = express.Router();

router.post("/", createDeposit);
router.post("/confirm", confirmDeposit, createBalance);

module.exports = router;
