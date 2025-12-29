import { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {
  const [dues, setDues] = useState([]);

  useEffect(() => {
    API.get("/dues/student")
      .then((res) => setDues(res.data))
      .catch(() => console.log("Failed to load dues"));
  }, []);
const [regStatus, setRegStatus] = useState("");

const registerSemester = async () => {
  try {
    const res = await API.post("/register/register");
    setRegStatus(res.data.message);
  } catch (err) {
    setRegStatus(err.response.data.message);
  }
};

  return (
    <div className="page-container">
      <h2>My Dues</h2>

      {dues.length === 0 ? (
        <p>No dues data available</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Department</th>
              <th>Semester</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dues.map((d, index) => (
              <tr key={index}>
                <td>{d.department}</td>
                <td>{d.semester}</td>
                <td
                  style={{
                    color: d.status === "cleared" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {d.status.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br /><br />
<button onClick={registerSemester}>
  Register for Next Semester
</button>


{regStatus && <p style={{ fontWeight: "bold" }}>{regStatus}</p>}

    </div>
  );
}

export default StudentDashboard;
