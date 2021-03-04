const jwt = require("jsonwebtoken");

module.exports = function authorizeUser(req, res, next) {
  const { token } = req.body.data;
  const user = jwt.verify(token, jWT_SECRET);
  console.log(user);
  req.locals.user = user;
  next();

};
