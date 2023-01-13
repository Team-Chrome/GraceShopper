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
    const { cardId, firstName, lastName, address, city, state, zip } = req.body;
    res.status(201).send(
      await BillingAddress.create({
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        cardId,
      })
    );
  } catch (err) {
    next(err);
  }
});
