var express = require("express");
var router = express.Router();
var User = require("../model/user");
var bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const jWT_SECRET = "doefnpj492r2109rufhnp239th23oplrr2fj3jhrih2r029031ru";

router.post("/login", async (req, res, next) => {
  var { employeeID, password } = req.body.data;
  const user = await User.findOne({ employeeID }).lean();

  if (!user) {
     res
      .json({
        status: "Failed",
        message: "Invalid Username or Password",
      })
      .status(500)
      .send({ error: "Invalid username or password " })
      .end();
  }

  if (await bcrypt.compare(password, user.password)) {
    ///authentication

    const token = jwt.sign(
      { employeeID: user.employeeID, fullName: user.fullName },
      jWT_SECRET
    );
    return res.json({
      status: "Success",
      message: "Login Successful",
      token: token,
      user: {fullName: user.fullName, id : user._id, employeeID : user.employeeID  },
    });
  }

  res.json({ status: 400, message: "something wrong" }).status(400).end();
});

router.post("/register", async (req, res) => {
  var { fullName, employeeID, password } = req.body.data;
  password = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({ fullName, employeeID, password });
    console.log("user created" + response);
    return res
      .json({ status: "Success", message: "Succesfully Created User" })
      .status(200)
      .end();
  } catch (error) {
    if (error.code === 11000) {
      console.log("user exist");
      return res
        .json({
          status: "Failed",
          message: "User with this employeeID already Exist",
        })
        .status(500)
        .send({ error: "User with this employeeID already Exist " })
        .end();
    }

    res
      .json({ status: "Failed", errorMessage: "Something Went Wrong" })
      .status("400");
  }
});

module.exports = router;
