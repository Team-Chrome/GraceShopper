const router = require("express").Router();
const {
  models: { Cart, CartItem, Product },
} = require("../db");
module.exports = router;

router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.id, status: "OPEN" },
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

router.post("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.params.id, status: "OPEN" },
      include: [
        {
          model: CartItem,
          include: [{ model: Product }],
        },
      ],
    });

    const productId = req.body.productId;
    const quantity = req.body.quantity;
    let cartId = cart[0].id;

    let newCartItem = { cartId, productId, quantity };

    if (cart.length > 0) {
      res.status(201).send(await CartItem.create(newCartItem));
    } else {
      cartId = await Cart.create({ userId: req.params.id });
      res.status(201).send(await CartItem.create(newCartItem));
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    await CartItem.update(
      { quantity: req.body.quantity },
      {
        where: { cartId: req.body.cartId, productId: req.body.productId },
      }
    );
    res.send(req.body);
  } catch (error) {
    next(error);
  }
});
