import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/student/login", {
        reg_no: regNo,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/student-dashboard");
    } catch {
      setError("Invalid Register Number or Password");
    }
  };

  return (
    <div className="container">
      <h2>Student Login</h2>

      <input
        placeholder="Register Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
      />
<br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
<br />
      <button onClick={handleLogin}>Login</button> 

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
}

export default StudentLogin;
