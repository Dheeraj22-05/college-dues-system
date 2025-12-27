const db = require("../config/db");

// departments that have dues
const departments = [
  "cs_lab",
  "ec_lab",
  "eee_lab",
  "me_lab",
  "library",
  "hostel",
  "canteen",
  "college_bus",
  "pta",
  "tutor",
  "hod",
  "sports",
  "placement",
  "office"
];

// Insert dues for a student
db.get(
  "SELECT id, semester FROM students WHERE reg_no = ?",
  ["CET2021001"],
  (err, student) => {
    if (!student) {
      console.log("Student not found");
      return;
    }

    departments.forEach((dept) => {
      db.run(
        `INSERT INTO dues 
         (student_id, department, semester, status, updated_by, updated_at)
         VALUES (?, ?, ?, ?, ?, datetime('now'))`,
        [student.id, dept, student.semester, "pending", "system"]
      );
    });

    console.log("Default dues created for student");
  }
);
