const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// HOME PAGE
router.get("/", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render("home", { message });
});

// LOGIN PAGE
router.get("/login", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render("login", { message });
});

// REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register");
});

// REGISTER POST
router.post("/register", authController.register);

// LOGIN POST
router.post("/login", authController.login);

// FORGOT PASSWORD PAGE (GET)
router.get("/forgot-password", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render("forgot", { message });
});

// 🔥 FORGOT PASSWORD POST (THIS WAS MISSING)
router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
