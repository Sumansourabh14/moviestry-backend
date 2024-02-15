const catchAsync = require("express-async-handler");
const UserModel = require("../models/User");

// @desc    Get all user
// @route   GET /api/v1/users
// @access  Public
const getUsers = catchAsync(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({
    success: true,
    total: users.length,
    users,
  });
});

module.exports = { getUsers };
