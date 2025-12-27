const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUsers = async () => {
  const principalPassword = await bcrypt.hash("principal123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  // PRINCIPAL
  db.run(
    `INSERT OR IGNORE INTO admins 
     (faculty_id, name, email, password, role, department)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "PRINCIPAL01",
      "Principal",
      "principal@cet.edu",
      principalPassword,
      "principal",
      "ALL"
    ]
  );

  // ADMIN (Library)
  db.run(
    `INSERT OR IGNORE INTO admins 
     (faculty_id, name, email, password, role, department)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "LIB001",
      "Library Admin",
      "library@cet.edu",
      adminPassword,
      "admin",
      "library"
    ]
  );

  // STUDENT
  db.run(
    `INSERT OR IGNORE INTO students
     (reg_no, name, department, semester, email, password, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      "CET2021001",
      "Test Student",
      "cs",
      2,
      "student@cet.edu",
      studentPassword,
      "active"
    ]
  );

  console.log("Default users created successfully");
};

createUsers();
