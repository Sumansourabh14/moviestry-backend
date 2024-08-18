const express = require("express");
const {
  getTotalWatchTime,
  getLongestMovieWatched,
  getShortestMovieWatched,
} = require("../controllers/statsController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/total-watch-time", authMiddleware, getTotalWatchTime);
router.get("/longest-watch-time", authMiddleware, getLongestMovieWatched);
router.get("/shortest-watch-time", authMiddleware, getShortestMovieWatched);

module.exports = router;
