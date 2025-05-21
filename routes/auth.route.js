const express = require("express");
const {
  register,
  login,
  refreshToken,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
