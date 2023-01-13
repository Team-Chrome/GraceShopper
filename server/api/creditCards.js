const router = require("express").Router();
const {
  models: { Card },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const address = await Card.findAll({
      where: { userId: req.body.userId },
    });
    res.send(address);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, cardNumber, expiration, cvv, userId } = req.body;
    res.status(201).send(
      await Card.create({
        name,
        cardNumber,
        expiration,
        cvv,
        userId,
      })
    );
  } catch (err) {
    next(err);
  }
});
