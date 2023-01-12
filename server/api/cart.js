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
    const price = req.body.price;
    let cartId = cart[0].id;

    let newCartItem = { cartId, productId, quantity, price };

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

    const updatedItem = await CartItem.findAll({
      where: { cartId: req.body.cartId, productId: req.body.productId },
    });

    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:cartId/status", async (req, res, next) => {
  try {
    await Cart.update(
      { status: req.body.status },
      {
        where: { id: req.params.cartId },
      }
    );
    res.send(req.body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cartId/:productId", async (req, res, next) => {
  try {
    console.log(req.params);
    const item = await CartItem.findAll({
      where: { cartId: req.params.cartId, productId: req.params.productId },
    });
    await item.destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});
