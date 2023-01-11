const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await Product.findByPk(id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
