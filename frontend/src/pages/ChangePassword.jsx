import { useState } from "react";
import API from "../services/api";

function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      await API.post("/auth/change-password", {
        oldPassword: oldPass,
        newPassword: newPass,
      });
      setMsg("Password changed successfully");
    } catch {
      setMsg("Error changing password");
    }
  };

  return (
    <div className="container">
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) => setOldPass(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPass(e.target.value)}
      />
      <br />

      <button onClick={submit}>Update Password</button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

export default ChangePassword;
