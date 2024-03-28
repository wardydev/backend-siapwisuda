const { TOKENSPERSKS } = require("../helper/constants.js");
const { getIdUser, countTokens, countSks } = require("../helper/index.js");
const {
  createTokensQuery,
  getTokensByIduserQuery,
  updateTokensQuery,
} = require("../models/tokens.js");

const createTokens = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const idUser = getIdUser(authorization);
    const { amount } = req.body;
    const [userToken] = await getTokensByIduserQuery(idUser);
    const totalNewTokens = countTokens(userToken);
    const totalNewSks = countSks(userToken);
    if (userToken.length !== 0) {
      await updateTokensQuery({
        idUser,
        amount: totalNewTokens,
        sks: totalNewSks,
      });
      res.status(200).json({
        success: true,
        message: "Tokens Berhasil diupdate.",
      });
    } else {
      await createTokensQuery({
        idUser,
        amount: amount * TOKENSPERSKS,
        sks: amount,
      });
      res.status(200).json({
        success: true,
        message: "Tokens Berhasil dibuat.",
      });
    }

    // kembalikan responsenya
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createTokens,
};
