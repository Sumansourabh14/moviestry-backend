const express = require("express");
const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  addToWatched,
  removeFromWatched,
  getWatched,
} = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// watchlist
router.post("/watchlist/:id", authMiddleware, addToWatchlist);
router.get("/watchlist", authMiddleware, getWatchlist);
router.delete("/watchlist/:id", authMiddleware, removeFromWatchlist);

// watched
router.post("/watched/:id", authMiddleware, addToWatched);
router.get("/watched", authMiddleware, getWatched);
router.delete("/watched/:id", authMiddleware, removeFromWatched);

module.exports = router;
