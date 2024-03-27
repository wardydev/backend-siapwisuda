const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserQuery, createUserQuery } = require("../models/users.js");

const createUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    if (!fullName | !email | !phoneNumber | !password) {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUserQuery({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      bio: "",
      profile: "",
      role: "user",
    });
    res.status(201).json({
      success: true,
      message: "Registrasi berhasil, Silahkan login untuk proses berikutnya.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: {
        code: 500,
        message:
          "Terjadi kesalahan disisi server, Pastikan internet Anda terkoneksi.",
      },
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email | !password) {
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

    const user = await loginUserQuery(email);
    const isUserAvailable = [user][0][0].length !== 0;

    if (isUserAvailable) {
      const userSelected = await user[0];
      const passwordMatched = await bcrypt.compare(
        password,
        userSelected[0].password
      );

      if (!passwordMatched) {
        return res.status(401).json({
          success: false,
          error: {
            code: 401,
            message: "Password salah, Pastikan masukan password yang benar.",
          },
        });
      }
      const token = jwt.sign(userSelected[0], process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          role: userSelected[0].role,
          token,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: {
          code: 400,
          message:
            "Email tidak ditemukan, Pastikan email yang dimasukan benar.",
        },
      });
    }
  } catch (err) {
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

module.exports = { createUser, loginUser };
