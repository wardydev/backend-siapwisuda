const dbPool = require("../config/database.js");

const createSksQuery = ({
  idUser,
  amount,
  tokens,
  price,
  discount,
  title,
  isSpecial,
}) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.sks (idUser, amount, tokens, price, discount, title, isSpecial)
  VALUES (${idUser}, ${amount}, ${tokens}, ${price}, ${discount}, "${title}", ${isSpecial})`;
  return dbPool.execute(SQLQuery);
};

module.exports = { createSksQuery };
