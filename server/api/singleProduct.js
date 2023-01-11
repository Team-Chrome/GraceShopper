const router = require("express").Router();
const Product = require("../db/models/Product");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await Product.findByPk(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
