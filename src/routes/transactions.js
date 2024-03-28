const express = require("express");
const { createTransactions } = require("../controllers/transaction.js");

const router = express.Router();

router.post("/", createTransactions);

module.exports = router;
