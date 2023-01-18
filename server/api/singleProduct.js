const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(await Product.findByPk(id));
  } catch (error) {
    next(error);
  }
});

router.post("/addProduct", async (req, res, next) => {
  try {
    console.log("req.body.........................", req.body);
    res.status(201).send(await Product.create(req.body));
    // console.log(
    //   "im guessing everything went smoothly with the creation process"
    // );
  } catch (error) {
    console.log("error..............................", error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
