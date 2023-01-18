const router = require("express").Router();
const {
  models: { ShippingAddress },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const address = await ShippingAddress.findOne({
      where: { userId: userId },
    });
    res.send(address);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, address, city, state, zip, phone, userId } =
      req.body;
    console.log(firstName);
    res.send(
      await ShippingAddress.create({
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        userId: userId,
      })
    );
  } catch (err) {
    next(err);
  }
});
