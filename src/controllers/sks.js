const { TOKENSPERSKS, PRICEPERTOKEN } = require("../helper/constants.js");
const { getIdUser } = require("../helper/index.js");
const { createSksQuery } = require("../models/sks.js");

const createSks = async (req, res) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const idUser = getIdUser(authorization);

    const { amount, title, discount, isSpecial } = req.body;
    if (!amount | !title) {
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

    let sksPrice = amount * PRICEPERTOKEN;
    let discountPrice = 100 - discount;

    await createSksQuery({
      idUser,
      amount,
      tokens: amount * TOKENSPERSKS,
      price: (sksPrice * discountPrice) / 100,
      discount,
      title,
      isSpecial,
    });

    res.status(200).json({
      success: true,
      message: "Sks berhasil dibuat!",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createSks };
