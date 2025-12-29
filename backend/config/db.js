const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./college.db", (err) => {
  if (err) {
    console.error("Database error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reg_no TEXT UNIQUE,
    name TEXT,
    department TEXT,
    semester INTEGER,
    email TEXT UNIQUE,
    password TEXT,
    status TEXT DEFAULT 'active'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    faculty_id TEXT UNIQUE,
    name TEXT,
    email TEXT,
    password TEXT,
    role TEXT,
    department TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    created_by TEXT,
    created_at TEXT,
    active INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_type TEXT,
    user_id TEXT,
    token TEXT,
    expires_at TEXT,
    used INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS dues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    department TEXT,
    semester INTEGER,
    status TEXT,
    updated_by TEXT,
    updated_at TEXT
  )`);
});


module.exports = db;
