const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const mailer = require("../utils/mailer");

// STUDENT LOGIN
exports.studentLogin = (req, res) => {
  const { reg_no, password } = req.body;

  if (!reg_no || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.get(
    "SELECT * FROM students WHERE reg_no = ?",
    [reg_no],
    async (err, student) => {
      if (!student) {
        return res.status(401).json({ message: "Invalid Register Number" });
      }

      const match = await bcrypt.compare(password, student.password);
      if (!match) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { id: student.id, role: "student" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, role: "student" });
    }
  );
};

// ADMIN / PRINCIPAL LOGIN
exports.adminLogin = (req, res) => {
  const { faculty_id, password } = req.body;

  if (!faculty_id || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  db.get(
    "SELECT * FROM admins WHERE faculty_id = ?",
    [faculty_id],
    async (err, admin) => {
      if (err || !admin) {
        return res.status(400).json({
          message: "Invalid Faculty ID or Password",
        });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid Faculty ID or Password",
        });
      }

      const token = jwt.sign(
        {
          id: admin.id,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        token,
        role: admin.role,
        name: admin.name,
      });
    }
  );
};


// FORGOT PASSWORD
exports.forgotPassword = (req, res) => {
  const { user_type, user_id, email } = req.body;

  if (!user_type || !user_id || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  // 👉 Treat principal as admin
  const effectiveUserType = user_type === "principal" ? "admin" : user_type;

  const token = uuidv4();
  const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  db.run(
    `INSERT INTO password_reset_tokens
     (user_type, user_id, token, expires_at, used)
     VALUES (?, ?, ?, ?, 0)`,
    [effectiveUserType, user_id, token, expires]
  );

 const resetLink = `http://localhost:5173/#/reset-password/${token}`;


  // ✅ VERY IMPORTANT FOR YOU
  console.log("===== PASSWORD RESET REQUEST =====");
  console.log("User Type:", effectiveUserType);
  console.log("User ID:", user_id);
  console.log("Email:", email);
  console.log("RESET LINK:", resetLink);
  console.log("=================================");

  // Email sending (optional for demo)
  mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset - College Dues System",
    text: `Click this link to reset your password:\n${resetLink}`
  });

  res.json({ message: "Password reset link generated (check backend console)" });
};

//RESET PASSWORD
exports.resetPassword = (req, res) => {
  const { token, new_password } = req.body;

  db.get(
    "SELECT * FROM password_reset_tokens WHERE token = ? AND used = 0",
    [token],
    async (err, record) => {
      if (!record) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      if (new Date(record.expires_at) < new Date()) {
        return res.status(400).json({ message: "Token expired" });
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);

      const table =
        record.user_type === "student" ? "students" : "admins";
      const idField =
        record.user_type === "student" ? "reg_no" : "faculty_id";

      db.run(
        `UPDATE ${table} SET password = ? WHERE ${idField} = ?`,
        [hashedPassword, record.user_id]
      );

      db.run(
        "UPDATE password_reset_tokens SET used = 1 WHERE token = ?",
        [token]
      );

      res.json({ message: "Password reset successful" });
    }
  );
};
