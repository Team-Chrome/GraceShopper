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
    let cartId = null;

    if (cart.length > 0) {
      cartId = cart[0].id;
    }

    let newCartItem = { cartId, productId, quantity, price };

    if (cartId) {
      const createdItem = await CartItem.create(newCartItem);

      res.status(201).send(
        await CartItem.findOne({
          where: {
            cartId: createdItem.cartId,
            productId: createdItem.productId,
          },
          include: [{ model: Product }],
        })
      );

      res.status(201).send(await CartItem.create(newCartItem));
    } else {
      const newCart = await Cart.create({ userId: req.params.id });
      newCartItem.cartId = newCart.id;
      const createdItem = await CartItem.create(newCartItem);

      res.status(201).send(
        await CartItem.findOne({
          where: {
            cartId: createdItem.cartId,
            productId: createdItem.productId,
          },
          include: [{ model: Product }],
        })
      );
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
    const item = await CartItem.findAll({
      where: { cartId: req.params.cartId, productId: req.params.productId },
    });
    await item[0].destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});
