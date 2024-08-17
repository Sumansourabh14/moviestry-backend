const express = require("express");
const {
  addToWatchlist,
  getWatchlist,
} = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/watchlist/:id", authMiddleware, addToWatchlist);
router.get("/watchlist", authMiddleware, getWatchlist);

module.exports = router;
