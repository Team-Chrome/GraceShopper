const router = require("express").Router();
const {
  models: { BillingAddress },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const address = await BillingAddress.findAll({
      where: { cardId: req.body.cardId },
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
    res.status(201).send(
      await BillingAddress.create({
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
