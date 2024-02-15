const express = require("express");
const { getUsers, getSelf } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/users", getUsers);
router.get("/self", authMiddleware, getSelf);

module.exports = router;
