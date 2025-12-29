import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function PrincipalLogin() {
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

      if (res.data.role !== "principal") {
        setError("Access denied: Not a principal account");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      navigate("/principal-dashboard");
    } catch {
      setError("Invalid Faculty ID or Password");
    }
  };

  return (
    <div className="page-container">
      <h2>Principal Login</h2>

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
     <Link to="/forgot-password">Forgot Password?</Link>

    </div>
  );
}

export default PrincipalLogin;
