const express = require("express");
const cors = require("cors");

const app = express();
const pdfSummarizeRouter = require("./routes/pdfSummarize.js");

const corsOptions = {
  // origin: "http://localhost:5174",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/pdf-summarize", pdfSummarizeRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(8080, () => {
  console.log("Listening on port 8080");
});
