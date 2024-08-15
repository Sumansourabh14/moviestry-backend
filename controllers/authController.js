const catchAsync = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Incorrect email or password");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: `User is logged in!`,
      user: user._id,
      email: user.email,
      token: accessToken,
    });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};

module.exports = { login };
