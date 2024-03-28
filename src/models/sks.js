const dbPool = require("../config/database.js");

const createSksQuery = ({
  amount,
  tokens,
  price,
  discount,
  title,
  isSpecial,
}) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.sks (amount, tokens, price, discount, title, isSpecial)
  VALUES (${amount}, ${tokens}, ${price}, ${discount}, "${title}", ${isSpecial})`;
  return dbPool.execute(SQLQuery);
};

module.exports = { createSksQuery };
