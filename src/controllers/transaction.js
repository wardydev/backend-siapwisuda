const { TOKENSPERSKS } = require("../helper/constants.js");
const { getIdUser, countTokens, countSks } = require("../helper/index.js");
const {
  updateBalanceQuery,
  getBalancesQuery,
} = require("../models/balance.js");
const {
  createTokensQuery,
  getTokensByIduserQuery,
  updateTokensQuery,
} = require("../models/tokens.js");
const { createTransactionsQuery } = require("../models/transactions.js");

const createTransactions = async (req, res) => {
  try {
    // ambil user id
    const { authorization } = req.headers;
    const idUser = getIdUser(authorization);

    // ambil {harga sks, jumlah sks, tokens}
    const { price, sksAmount, tokens } = req.body;
    // cek apakah semua body berhasil terambil
    if (!price | !sksAmount | !tokens) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Harga dan jumlah sks tidak ditemukan, Pastikan semua nilai form terisi.",
        },
      });
      return;
    }
    // ambil saldo berdasarkan id user
    const [userBalance] = await getBalancesQuery(idUser);
    const userBalanceItem = userBalance[0];

    // cek apakah saldo lebih besar dari harga sks
    if (userBalanceItem.amount < price) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Saldo tidak cukup, Silahkan lakukan pengisian saldo terlebih dahulu.",
        },
      });
      return;
    }

    // update saldo
    await updateBalanceQuery({
      idUser,
      newAmount: userBalanceItem.amount - price,
    });

    // tambahkan tokens
    const [userToken] = await getTokensByIduserQuery(idUser);
    const totalNewTokens = countTokens(userToken);
    const totalNewSks = countSks(userToken);
    if (userToken.length !== 0) {
      await updateTokensQuery({
        idUser,
        amount: totalNewTokens + tokens,
        sks: totalNewSks + sksAmount,
      });
    } else {
      await createTokensQuery({
        idUser,
        amount: tokens,
        sks: sksAmount,
      });
    }
    // buat transaksi
    await createTransactionsQuery({
      idUser,
      price,
      sks: sksAmount,
      tokens,
      remainsBalance: userBalanceItem.amount - price,
    });
    // kembalikan response
    res.status(200).json({
      success: true,
      message: "Pembelian SKS berhasil!.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: {
        code: 500,
        message:
          "Terjadi kesalahan disisi server, Pastikan internet Anda terkoneksi.",
      },
    });
  }
};

module.exports = { createTransactions };
