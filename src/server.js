// import modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pdfSummarizeRouter = require("./routes/pdfSummarize.js");

// reassign
const app = express();
const corsOptions = {
  // origin: "http://localhost:5174",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// initialize
dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/pdf-summarize", pdfSummarizeRouter);

// default
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
