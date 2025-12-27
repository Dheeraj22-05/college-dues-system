const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Get dues for logged-in student
router.get("/student", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "student") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    db.all(
      `SELECT d.department, d.status, d.semester
       FROM dues d
       WHERE d.student_id = ?`,
      [decoded.id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ message: "Database error" });
        }
        res.json(rows);
      }
    );
  });
});
// Get dues for admin's department
router.get("/admin", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    db.all(
      `SELECT d.id, s.reg_no, s.name, d.semester, d.status
       FROM dues d
       JOIN students s ON s.id = d.student_id
       WHERE d.department = ?`,
      [decoded.department],
      (err, rows) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json(rows);
      }
    );
  });
});

// Clear a due
router.post("/clear", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  const { dueId } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    db.run(
      `UPDATE dues
       SET status = 'cleared',
           updated_by = ?,
           updated_at = datetime('now')
       WHERE id = ?`,
      [decoded.department, dueId],
      () => res.json({ message: "Due cleared" })
    );
  });
});

module.exports = router;
