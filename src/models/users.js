const dbPool = require("../config/database.js");

const loginUserQuery = (email) => {
  const SQLQuery = `SELECT * FROM db_siap_wisuda.users WHERE email = "${email}";`;
  return dbPool.execute(SQLQuery);
};
const createUserQuery = ({
  fullName,
  email,
  phoneNumber,
  password,
  bio,
  profile,
  role,
}) => {
  const SQLQuery = `INSERT INTO db_siap_wisuda.users (fullName, email, phoneNumber, password, bio, profile, createdAt, role)
  VALUES ("${fullName}", "${email}", "${phoneNumber}", "${password}", "${bio}","${profile}", NOW(), "${role}")`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  loginUserQuery,
  createUserQuery,
};
