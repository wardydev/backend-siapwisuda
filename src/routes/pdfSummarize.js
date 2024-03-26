const express = require("express");
const { summarizePdf } = require("../controllers/pdfSummarize.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: path.join(__dirname, "../../pdfsummary") });

router.post("/", upload.single("pdf"), summarizePdf);

module.exports = router;
