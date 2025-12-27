import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      await API.post("/auth/reset-password", {
        token,
        new_password: password,
      });
      setMessage("Password reset successful");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setMessage("Invalid or expired link");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
