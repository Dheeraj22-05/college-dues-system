const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Student semester registration
router.post("/register", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "student") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check pending dues
    db.all(
      `SELECT * FROM dues
       WHERE student_id = ? AND status = 'pending'`,
      [decoded.id],
      (err, dues) => {
        if (dues.length > 0) {
          return res.status(400).json({
            message: "Clear all dues before registration",
          });
        }

        // Get current semester
        db.get(
          "SELECT semester FROM students WHERE id = ?",
          [decoded.id],
          (err, student) => {
            const nextSemester = student.semester + 1;

            if (nextSemester > 8) {
              return res.json({
                message: "Course completed. Ready for archive",
              });
            }

            // Update semester
            db.run(
              "UPDATE students SET semester = ? WHERE id = ?",
              [nextSemester, decoded.id],
              () => {
                res.json({
                  message: `Registered successfully for semester ${nextSemester}`,
                });
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;
