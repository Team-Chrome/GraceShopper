const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: [
        {
          model: CartItem,
          include: [{ model: Product }],
        },
      ],
    });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(201).send(await CartItem.create(req.body));
  } catch (error) {
    next(error);
  }
});
