const {
  createDepositQuery,
  confirmDepositQuery,
  getDepositByIdQuery,
} = require("../models/deposit.js");
const { getUserInfo, getIdUser } = require("../helper/index.js");

const createDeposit = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const userSelected = getUserInfo(authorization);

    const { amount, paymentMethod } = req.body;

    if (!amount | !paymentMethod) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Input tidak boleh kosong, Pastikan semua nilai form terisi.",
        },
      });
      return;
    }

    if (amount < 15000) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Minimal deposit 15000, Pastikan jumlah yang dimasukan sudah benar.",
        },
      });
      return;
    }

    await createDepositQuery({
      idUser: userSelected.id,
      fullName: userSelected.fullname,
      email: userSelected.email,
      phoneNumber: userSelected.phoneNumber,
      amount,
      paymentMethod,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      message: "Deposit berhasil dibuat!",
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

const confirmDeposit = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const idUser = getIdUser(authorization);
    const idDeposit = req.query.id;

    const [data] = await getDepositByIdQuery(idUser);
    if (data.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Item deposit tidak ditemukan, Pastikan sudah membuat deposit sebelumnya.",
        },
      });
      return;
    }

    await confirmDepositQuery({ id: idDeposit, idUser });
    next();
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

module.exports = {
  createDeposit,
  confirmDeposit,
};
