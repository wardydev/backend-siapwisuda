const getStringTest = (req, res) => {
  return res.json({
    test: "tanggal 2 mei kita raih 100juta pertama. Bismillah",
  });
};

module.exports = {
  getStringTest,
};
