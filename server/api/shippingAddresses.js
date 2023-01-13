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
    const { userId, firstName, lastName, address, city, state, zip, phone } =
      req.body;
    res.send(
      await ShippingAddress.create({
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        userId,
      })
    );
  } catch (err) {
    next(err);
  }
});
