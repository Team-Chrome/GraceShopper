const router = require("express").Router();
const {
  models: { ShippingAddress },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const address = await ShippingAddress.findAll({
      where: { userId: req.body.userId },
    });
    res.send(address);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await ShippingAddress.create(req.body));
  } catch (err) {
    next(err);
  }
});
