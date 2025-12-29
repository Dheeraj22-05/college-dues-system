const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

router.post("/student/login", authController.studentLogin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/admin/login", authController.adminLogin);
router.post("/change-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const table = decoded.role === "student" ? "students" : "admins";
    const idField = decoded.role === "student" ? "id" : "id";

    db.get(
      `SELECT * FROM ${table} WHERE ${idField} = ?`,
      [decoded.id],
      async (err, user) => {
        if (err || !user)
          return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match)
          return res.status(400).json({ message: "Old password incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);

        db.run(
          `UPDATE ${table} SET password = ? WHERE ${idField} = ?`,
          [hashed, decoded.id],
          () => {
            res.json({ message: "Password updated successfully" });
          }
        );
      }
    );
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
