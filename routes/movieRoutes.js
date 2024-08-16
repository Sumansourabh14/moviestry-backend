const express = require("express");
const { addToWatchlist } = require("../controllers/movieController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/watchlist/:id", authMiddleware, addToWatchlist);

module.exports = router;
