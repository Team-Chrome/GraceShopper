const router = require("express").Router();
const {
  models: { BillingAddress },
} = require("../db");
module.exports = router;

router.get("/", async(req,res,next)=>{
    try {
        const address = await BillingAddress.findByPk({
            where: {
                
            }
        })
        res.send(products)
    }
    catch (err) {
        next (err)
    }
}))