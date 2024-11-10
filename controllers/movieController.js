const catchAsync = require("express-async-handler");
const UserModel = require("../models/User");
const MediaModel = require("../models/Media");

// @desc    Add to watchlist
// @route   POST /api/v1/media/watchlist/:id
// @access  Private
const addToWatchlist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    adult,
    backdrop_path,
    genre_ids,
    mediaId,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
  } = req.body;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let media = await MediaModel.findOne({ mediaId });

  if (!media) {
    media = await MediaModel.create({
      adult,
      backdrop_path,
      genre_ids,
      mediaId,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      title,
    });
  }

  const mediaIdInDb = media._id;
  // Check if movie is already in watchlist
  if (user.watchlist.includes(mediaIdInDb)) {
    res.status(400);
    throw new Error("This media is already in watchlist");
  }

  user.watchlist.push(mediaIdInDb);
  await user.save();

  res
    .status(201)
    .json({ success: true, message: "Media added to watchlist", id });
});

// @desc    Get user's watchlist
// @route   GET /api/v1/media/watchlist
// @access  Private
const getWatchlist = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watchlist with movie details
  const user = await UserModel.findById(userId).populate("watchlist");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    watchlist: user.watchlist,
  });
});

// @desc    Remove from watchlist
// @route   DELETE /api/v1/media/watchlist/:id
// @access  Private
const removeFromWatchlist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let media = await MediaModel.findOne({ mediaId: id });

  if (!media) {
    res.status(404);
    throw new Error("Media not found");
  }

  // Check if movie is in watchlist
  if (user.watchlist.includes(media._id)) {
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { watchlist: media._id } }
    );
  }

  res
    .status(201)
    .json({ success: true, message: "Media removed from watchlist", id });
});

// @desc    Add to watched
// @route   POST /api/v1/media/watched/:id
// @access  Private
const addToWatched = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    adult,
    backdrop_path,
    genre_ids,
    mediaId,
    original_language,
    original_title,
    overview,
    poster_path,
    release_date,
    title,
    runtime,
  } = req.body;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let media = await MediaModel.findOne({ mediaId });

  if (!media) {
    media = await MediaModel.create({
      adult,
      backdrop_path,
      genre_ids,
      mediaId,
      original_language,
      original_title,
      overview,
      poster_path,
      release_date,
      title,
      runtime,
    });
  }

  const mediaIdInDb = media._id;
  // Check if movie is already in watchlist
  if (user.watched.includes(mediaIdInDb)) {
    res.status(400);
    throw new Error("This media is already in watched");
  }

  await UserModel.updateOne({ _id: userId }, { $push: { watched: media._id } });

  res
    .status(201)
    .json({ success: true, message: "Media added to watched", id });
});

// @desc    Remove from watched
// @route   DELETE /api/v1/media/watched/:id
// @access  Private
const removeFromWatched = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let media = await MediaModel.findOne({ mediaId: id });

  if (!media) {
    res.status(404);
    throw new Error("Media not found");
  }

  // Check if movie is in watched
  if (user.watched.includes(media._id)) {
    await UserModel.updateOne(
      { _id: userId },
      { $pull: { watched: media._id } }
    );
  }

  res
    .status(201)
    .json({ success: true, message: "Media removed from watched", id });
});

// @desc    Get user's watched list
// @route   GET /api/v1/media/watched
// @access  Private
const getWatched = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watched with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    watched: user.watched,
    total: user.watched.length,
  });
});

// @desc    Get user's watched list
// @route   GET /api/v1/media/watched
// @access  Private
const getWatchedHours = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watched with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let sum = 0;
  for (let i = 0; i < user.watched.length; i++) {
    sum = sum + user.watched[i].runtime;
  }

  res.status(200).json({
    success: true,
    totalHours: sum,
    totalMovies: user.watched.length,
  });
});

const getMaxWatchedHours = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watched with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let max = user.watched[0].runtime;
  let maxMovie = user.watched[0];
  for (let i = 0; i < user.watched.length; i++) {
    if (max < user.watched[i].runtime) {
      max = user.watched[i].runtime;
      maxMovie = user.watched[i];
    }
  }

  res.status(200).json({
    success: true,
    maxHours: max,
    movie: maxMovie,
    totalMovies: user.watched.length,
  });
});

const getMinimumWatchedHours = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Populate the user's watched with movie details
  const user = await UserModel.findById(userId).populate("watched");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let min = user.watched[0].runtime;
  let minMovie = user.watched[0];
  for (let i = 0; i < user.watched.length; i++) {
    if (min > user.watched[i].runtime) {
      min = user.watched[i].runtime;
      minMovie = user.watched[i];
    }
  }

  res.status(200).json({
    success: true,
    minHours: min,
    movie: minMovie,
    totalMovies: user.watched.length,
  });
});

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  addToWatched,
  removeFromWatched,
  getWatched,
  getWatchedHours,
  getMaxWatchedHours,
  getMinimumWatchedHours,
};
