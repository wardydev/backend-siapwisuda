const dbPool = require("../config/database.js");

const createBalanceQuery = ({ idUser, amount }) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.balance (idUser, amount, updatedAt) VALUES (${idUser}, ${amount}, NOW())`;
  return dbPool.execute(SQLQuery);
};
const updateBalanceQuery = ({ idUser, newAmount }) => {
  const SQLQuery = `UPDATE db_siap_wisuda.balance SET amount = ${newAmount}, updatedAt = NOW() WHERE idUser = ${idUser}`;
  return dbPool.execute(SQLQuery);
};

const getBalancesQuery = (idUser) => {
  const SQLQuery = `SELECT * FROM db_siap_wisuda.balance WHERE idUser = ${idUser}`;
  return dbPool.execute(SQLQuery);
};

const getUserBalanceQuery = (idUser) => {
  const SQLQuery = `SELECT db_siap_wisuda.balance.id, db_siap_wisuda.balance.amount, db_siap_wisuda.users.fullname, db_siap_wisuda.users.email, db_siap_wisuda.users.profile
  FROM db_siap_wisuda.balance
  INNER JOIN db_siap_wisuda.users ON db_siap_wisuda.balance.idUser = ${idUser}`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createBalanceQuery,
  updateBalanceQuery,
  getBalancesQuery,
  getUserBalanceQuery,
};
