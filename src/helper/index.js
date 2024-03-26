const { encode } = require("gpt-3-encoder");

const calculateTokens = (text) => encode(text).length;

module.exports = {
  calculateTokens,
};
