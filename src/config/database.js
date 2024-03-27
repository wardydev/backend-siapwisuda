const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

dbPool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to database!");
    connection.release();
  }
});

module.exports = dbPool.promise();
