const router = require("express").Router();
const {
  models: { User, Cart, CartItem, Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "email"],
      include: [{ model: Cart, include: { model: Product } }],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});
