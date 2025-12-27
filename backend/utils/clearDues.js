const db = require("../config/db");

db.get(
  "SELECT id FROM students WHERE reg_no = ?",
  ["CET2021001"],
  (err, student) => {
    if (!student) {
      console.log("Student not found");
      return;
    }

    db.run(
      "DELETE FROM dues WHERE student_id = ?",
      [student.id],
      () => {
        console.log("Old dues cleared");
      }
    );
  }
);
