const catchAsync = require("express-async-handler");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Token has expired");
    }

    next();
  } else {
    res.status(401);
    throw new Error("User unauthorised");
  }
});

module.exports = authMiddleware;
