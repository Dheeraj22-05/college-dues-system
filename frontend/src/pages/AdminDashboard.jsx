import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [dues, setDues] = useState([]);

  const loadDues = () => {
    API.get("/dues/admin")
      .then((res) => setDues(res.data))
      .catch(() => console.log("Failed to load dues"));
  };

  useEffect(() => {
    loadDues();
  }, []);

  const clearDue = async (id) => {
    await API.post("/dues/clear", { dueId: id });
    loadDues();
  };

  return (
    <div className="page-container">
      <h2>Department Dues</h2>

      {dues.length === 0 ? (
        <p>No dues found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {dues.map((d) => (
              <tr key={d.id}>
                <td>{d.reg_no}</td>
                <td>{d.name}</td>
                <td>{d.semester}</td>
                <td
                  style={{
                    color: d.status === "cleared" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {d.status.toUpperCase()}
                </td>
                <td>
                  {d.status === "pending" && (
                    <button onClick={() => clearDue(d.id)}>
                      Clear
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
