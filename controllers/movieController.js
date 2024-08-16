const catchAsync = require("express-async-handler");
const UserModel = require("../models/User");

// @desc    Add to watchlist
// @route   POST /api/v1/media/watchlist/:id
// @access  Private
const addToWatchlist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if movie is already in watchlist
  if (user.watchlist.includes(id)) {
    res.status(400);
    throw new Error("This media is already in watchlist");
  }

  user.watchlist.push(id);
  await user.save();

  res
    .status(201)
    .json({ success: true, message: "Media added to watchlist", id });
});

module.exports = { addToWatchlist };
