const catchAsync = require("express-async-handler");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

// @desc    Register new user
// @route   POST /api/v1/register
// @access  Public
const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check if user exists in the db
  const isUserExists = await UserModel.findOne({ email });

  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User has been created!",
      data: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { signUp };
