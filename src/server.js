// import modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { authenticateToken } = require("./middleware/authenticatedUser.js");
const pdfSummarizeRouter = require("./routes/pdfSummarize.js");
const usersRouter = require("./routes/users.js");
const depositRouter = require("./routes/deposit.js");
const balanceRouter = require("./routes/balance.js");
const sksRouter = require("./routes/sks.js");
const tokensRouter = require("./routes/tokens.js");
const transactionRouter = require("./routes/transactions.js");

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
app.use("/users", usersRouter);
app.use("/pdf-summarize", authenticateToken, pdfSummarizeRouter);
app.use("/deposit", authenticateToken, depositRouter);
app.use("/balance", authenticateToken, balanceRouter);
app.use("/sks", authenticateToken, sksRouter);
app.use("/tokens", authenticateToken, tokensRouter);
app.use("/transaction", authenticateToken, transactionRouter);

// default
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
