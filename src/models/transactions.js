const dbPool = require("../config/database.js");

const createTransactionsQuery = ({
  idUser,
  price,
  sks,
  tokens,
  remainsBalance,
}) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.transactions 
    (idUser, price, sks, tokens, remainsBalance, createdAt)
    VALUES (${idUser}, ${price}, ${sks}, ${tokens}, ${remainsBalance}, NOW())`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createTransactionsQuery,
};
