const express = require("express");
const {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/watchlist/:id", authMiddleware, addToWatchlist);
router.get("/watchlist", authMiddleware, getWatchlist);
router.delete("/watchlist/:id", authMiddleware, removeFromWatchlist);

module.exports = router;
