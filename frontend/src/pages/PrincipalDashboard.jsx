import { useNavigate } from "react-router-dom";

function PrincipalDashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Principal Dashboard</h2>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/manage-notifications")}>
          Manage Notifications
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button disabled>View All Students (Coming Soon)</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button disabled>Archive Passed-out Students (Coming Soon)</button>
      </div>
    </div>
  );
}

export default PrincipalDashboard;
