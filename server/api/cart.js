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
    res.status(201).send(await CartItem.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    // const item = await CartItem.findAll({
    //   where: { cartId: req.body.cartId, productId: req.body.productId },
    // });
    // res.send(await item.update(req.body));

    const updatedItemId = await CartItem.update(
      { quantity: req.body.quantity },
      {
        where: { cartId: req.body.cartId, productId: req.body.productId },
      }
    );

    const cart = await Cart.findByPk(req.body.cartId, {
      include: [
        {
          model: CartItem,
          include: [{ model: Product }],
        },
      ],
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});
