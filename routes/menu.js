var express = require("express");
var router = express.Router();
var Menu = require("../model/menu");

router.post("/getmenulist", async (req, res, next) => {
  const { category } = req.body.data;
  console.log(category);
  try {
    const menuList = await Menu.find({ category }).select({name:1, description: 1,  price: 1, _id : 1}).lean();
    console.log(menuList);
    return res.json(menuList).status(200).end();
  } catch (error) {
      console.log(error)
    res
      .json({ status: "Failed", message: "Something went wrong" })
      .status(400)
      .end();
  }
});

module.exports = router;
