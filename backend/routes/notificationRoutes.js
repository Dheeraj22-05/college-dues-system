const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET active notifications (public)
router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM notifications WHERE active = 1 ORDER BY created_at DESC",
    [],
    (err, rows) => {
      res.json(rows);
    }
  );
});

// CREATE notification (principal only)
router.post("/", (req, res) => {
  const { message } = req.body;

  db.run(
    `INSERT INTO notifications (message, created_by, created_at, active)
     VALUES (?, 'principal', datetime('now'), 1)`,
    [message]
  );

  res.json({ message: "Notification created" });
});

module.exports = router;
