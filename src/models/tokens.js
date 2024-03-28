const dbPool = require("../config/database.js");

const createTokensQuery = ({ idUser, amount, sks }) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.tokens 
    (idUser, amount, sks, updatedAt)
    VALUES (${idUser}, ${amount}, ${sks}, NOW())`;
  return dbPool.execute(SQLQuery);
};
const updateTokensQuery = ({ idUser, amount, sks }) => {
  const SQLQuery = `UPDATE db_siap_wisuda.tokens SET amount = ${amount}, sks=${sks}, updatedAt = NOW() WHERE idUser = ${idUser}`;
  return dbPool.execute(SQLQuery);
};
const getTokensByIduserQuery = (idUser) => {
  const SQLQuery = `SELECT * FROM db_siap_wisuda.tokens WHERE idUser = ${idUser};`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createTokensQuery,
  getTokensByIduserQuery,
  updateTokensQuery,
};
