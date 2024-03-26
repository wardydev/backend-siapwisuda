const express = require("express");
const { createUser, loginUser } = require("../controllers/users.js");

const router = express.Router();

router.post("/auth", createUser);
router.post("/auth/login", loginUser);

module.exports = router;
