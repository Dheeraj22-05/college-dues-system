import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [userType, setUserType] = useState("student");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/auth/forgot-password", {
        user_type: userType,
        user_id: userId,
        email: email,
      });
      setMessage("Password reset link sent to your email");
    } catch (err) {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Forgot Password</h2>

      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
        <option value="principal">Principal</option>
      </select>
      <br /><br />

      <input
        placeholder={userType === "student" ? "Register Number" : "Faculty ID"}
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Registered Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Send Reset Link</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
