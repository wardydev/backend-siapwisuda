const { getIdUser } = require("../helper");
const {
  createBalanceQuery,
  updateBalanceQuery,
  getBalancesQuery,
  getUserBalanceQuery,
} = require("../models/balance.js");
const { getDepositByIdQuery } = require("../models/deposit");

const createBalance = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const idUser = getIdUser(authorization);

    const [depositSucces] = await getDepositByIdQuery(idUser);
    const filteredDeposit = depositSucces.filter((item) => {
      return item.status === "success";
    });
    const totalAmount = filteredDeposit.reduce((total, currentItem) => {
      return total + currentItem.amount;
    }, 0);

    const [balances] = await getBalancesQuery(idUser);
    if (balances.length !== 0) {
      await updateBalanceQuery({ idUser, newAmount: totalAmount });
      res.status(200).json({
        success: true,
        message: "Saldo berhasil diperbarui.",
      });
    } else {
      await createBalanceQuery({ idUser, amount: totalAmount });
      res.status(200).json({
        success: true,
        message: "Saldo berhasil dibuat.",
      });
    }
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

const getUserBalance = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const idUser = getIdUser(authorization);

    console.log("idUser", idUser);

    const [data] = await getUserBalanceQuery(idUser);

    res.status(200).json({
      success: true,
      message: "Saldo user berhasil di muat.",
      data: data[0],
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

module.exports = { createBalance, getUserBalance };
