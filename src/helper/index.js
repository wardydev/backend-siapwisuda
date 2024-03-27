const { encode } = require("gpt-3-encoder");
const jwt = require("jsonwebtoken");

const calculateTokens = (text) => encode(text).length;

const getIdUser = (authorization) => {
  const token = authorization.split(" ")[1];
  const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
  return tokenVerify.id;
};

const getUserInfo = (authorization) => {
  const token = authorization.split(" ")[1];
  const tokenVerify = jwt.verify(token, process.env.SECRET_KEY);
  return tokenVerify;
};

module.exports = {
  calculateTokens,
  getIdUser,
  getUserInfo,
};
