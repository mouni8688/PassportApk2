const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");

// STUDENT ROUTES
router.get("/apply", authMiddleware(["student"]), studentController.applyForm);
router.post("/apply", authMiddleware(["student"]), studentController.applyPassport);
router.get("/status", authMiddleware(["student"]), studentController.checkStatus);

module.exports = router;
