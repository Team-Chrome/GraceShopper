const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/cart", require("./cart"));
router.use("/products", require("./singleProduct"));
router.use("/cart", require("./cart"));
router.use("/products", require("./allProducts"))
router.use("/shipping", require("./shippingAddresses"));
router.use("/billing", require("./billingAddresses"));
router.use("/creditCard", require("./creditCards"));)

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
