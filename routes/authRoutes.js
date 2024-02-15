const express = require("express");
const { signUp } = require("../controllers/signUpController");
const router = express.Router();

router.post("/register", signUp);

module.exports = router;
