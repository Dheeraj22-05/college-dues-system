import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/admin/login", {
        faculty_id: facultyId,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("department", res.data.department);

      navigate("/admin-dashboard");
    } catch {
      setError("Invalid Faculty ID or Password");
    }
  };

  return (
    <div className="page-container">
      <h2>Admin Login</h2>

      <input
        placeholder="Faculty ID"
        value={facultyId}
        onChange={(e) => setFacultyId(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default AdminLogin;
