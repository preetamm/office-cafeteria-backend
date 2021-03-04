var express = require("express");
var router = express.Router();
var Menu = require("../model/menu");

router.post("/placeorder", async (req, res, next) => {
  console.log("heyy");
  const { cart, orderMode, paymentMode } = req.body.data;
  // const user = req.locals.user;
  var menuIds = [];

  for (var key in cart) {
    menuIds.push(key);
  }

  try {
    const records = await Menu.find()
      .where("_id")
      .in(menuIds)
      .exec();

    console.log(records[1]);
    return res
      .json({
        ordetails: {
          orderMode: orderMode,
          order: records,
          timing : 2,
        },
      })
      .status(200)
      .end();
  } catch (error) {
    console.log(error.message);
    res
      .json({ status: "Failed", message: "Something went wrong" })
      .status(400)
      .end();
  }
});

module.exports = router;
