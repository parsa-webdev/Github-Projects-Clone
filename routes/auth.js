const express = require("express");
const router = express();

const {
  register,
  login,
  logout,
  refreshToken,
  verifyUser,
} = require("../controllers/auth");
const { verifyAccessToken } = require("../helpers/jwt_helpers");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/refreshtoken", refreshToken);
router.post("/verifyuser", verifyAccessToken, verifyUser);

module.exports = router;
