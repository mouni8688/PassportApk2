const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard", authMiddleware(["admin"]), adminController.dashboard);
router.post("/update/:id", authMiddleware(["admin"]), adminController.updateStatus);

module.exports = router;
