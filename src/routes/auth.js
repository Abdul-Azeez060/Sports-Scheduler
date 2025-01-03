const express = require("express");
const {
  login,
  register,
  logout,
  loginPage,
  registerPage,
} = require("../controllers/AuthController");
const { alreadyLoggedIn } = require("../middleware/auth");

const router = express.Router();

router.get("/login", alreadyLoggedIn, loginPage);
router.get("/register", alreadyLoggedIn, registerPage);
router.post("/register", alreadyLoggedIn, register);
router.post("/login", alreadyLoggedIn, login);
router.get("/logout", logout);

module.exports = router;
