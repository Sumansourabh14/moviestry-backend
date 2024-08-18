const catchAsync = require("express-async-handler");
const UserModel = require("../models/User");

function convertMinutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return {
    hours: hours,
    minutes: remainingMinutes,
  };
}

// @desc    Get user's total watch time
// @route   GET /api/v1/user-stats/total-watch-time
// @access  Private
const getTotalWatchTime = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watchlist with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const runtimeArray = user.watched.map((item) => item.runtime);

  let sum = 0;
  for (let i = 0; i < runtimeArray.length; i++) {
    sum = sum + runtimeArray[i];
  }

  res.status(200).json({
    success: true,
    totalMoviesWatched: user.watched.length,
    watchTime: {
      inHours: convertMinutesToHours(sum),
      inMinutes: sum,
    },
  });
});

// @desc    Get user's total watch time
// @route   GET /api/v1/user-stats/longest-watch-time
// @access  Private
const getLongestMovieWatched = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watchlist with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const runtimeArray = user.watched.sort((a, b) => b.runtime - a.runtime);
  const longestMovieWatched = runtimeArray[0];

  res.status(200).json({
    success: true,
    totalMoviesWatched: user.watched.length,
    longestMovieWatched: longestMovieWatched,
    watchTime: {
      inHours: convertMinutesToHours(longestMovieWatched.runtime),
      inMinutes: longestMovieWatched.runtime,
    },
  });
});

// @desc    Get user's total watch time
// @route   GET /api/v1/user-stats/shortest-watch-time
// @access  Private
const getShortestMovieWatched = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watchlist with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const runtimeArray = user.watched.sort((a, b) => a.runtime - b.runtime);
  const shortestMovieWatched = runtimeArray[0];

  res.status(200).json({
    success: true,
    totalMoviesWatched: user.watched.length,
    shortestMovieWatched: shortestMovieWatched,
    watchTime: {
      inHours: convertMinutesToHours(shortestMovieWatched.runtime),
      inMinutes: shortestMovieWatched.runtime,
    },
  });
});

module.exports = {
  getTotalWatchTime,
  getLongestMovieWatched,
  getShortestMovieWatched,
};
