const dbPool = require("../config/database.js");

const createTokensQuery = ({ idUser, amount, sks, remains }) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.tokens 
    (idUser, amount, sks, remains, updatedAt)
    VALUES (${idUser}, ${amount}, ${sks}, ${remains}, NOW())`;
  return dbPool.execute(SQLQuery);
};

module.exports = { createTokensQuery };
