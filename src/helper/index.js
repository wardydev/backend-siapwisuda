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
function countTokens(data) {
  let totalTokens = 0;

  data.forEach((item) => {
    totalTokens += item.amount;
  });

  return totalTokens;
}
function countSks(data) {
  let totalSks = 0;

  data.forEach((item) => {
    totalSks += item.sks;
  });

  return totalSks;
}

module.exports = {
  calculateTokens,
  getIdUser,
  getUserInfo,
  countTokens,
  countSks,
};
