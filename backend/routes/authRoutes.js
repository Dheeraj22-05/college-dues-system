const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/student/login", authController.studentLogin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/admin/login", authController.adminLogin);

module.exports = router;
