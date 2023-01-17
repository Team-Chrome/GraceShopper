const router = require("express").Router();
module.exports = router;

const apiProtection = function(req,res,next) {
  console.log('zzzzzzzzzzzzzz api protection here')
  //console.log(req.protocol,req.url,req.body,req.headers)

  console.log('zzzzzzzzzzzzzz', req.originalUrl, req.method)

  if (req.originalUrl.includes('/api/cart')
      ||req.originalUrl.includes('/api/products')) {
    const urlUserId = req.url.replace('/api/cart/','')
    if ( !req.headers.hasOwnProperty('userid') ) { // && req.method == "GET") {
      console.log('zzzzzzzzzzzz can not access cart info that way')
      next ( new Error('no api access from browser, sorry'))
    }
  }
  next()
}

router.use(apiProtection)

router.use("/users", require("./users"));
router.use("/cart", require("./cart"));
router.use("/products", require("./singleProduct"));
router.use("/cart", require("./cart"));
router.use("/products", require("./allProducts"))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
