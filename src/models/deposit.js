const dbPool = require("../config/database.js");

const createDepositQuery = ({
  idUser,
  fullName,
  email,
  phoneNumber,
  amount,
  paymentMethod,
  status,
}) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.deposit 
  (idUser, fullName, email, phoneNumber, amount, paymentMethod, status, createdAt)
  VALUES (${idUser}, "${fullName}", "${email}", "${phoneNumber}", ${amount}, "${paymentMethod}", "${status}", NOW())`;
  return dbPool.execute(SQLQuery);
};

const confirmDepositQuery = ({ id, idUser }) => {
  const SQLQuery = `UPDATE db_siap_wisuda.deposit  SET status = "success" WHERE id = ${id} AND idUser = ${idUser}`;
  return dbPool.execute(SQLQuery);
};

const getDepositByIdQuery = (idUser) => {
  const SQLQuery = `SELECT * FROM db_siap_wisuda.deposit WHERE idUser = ${idUser};`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createDepositQuery,
  confirmDepositQuery,
  getDepositByIdQuery,
};
