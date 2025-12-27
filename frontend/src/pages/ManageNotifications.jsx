import { useState } from "react";
import API from "../services/api";

function ManageNotifications() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const publishNotification = async () => {
  if (!message.trim()) {
    setStatus("Message cannot be empty");
    return;
  }

  try {
    await API.post("/notifications", { message });
    setStatus("Notification published successfully");

    // 🔴 FORCE NAVBAR REFRESH
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (err) {
    setStatus("Failed to publish notification");
  }
};


  return (
    <div className="page-container">
      <h2>Manage Notifications</h2>

      <textarea
        rows="4"
        placeholder="Enter notification message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button onClick={publishNotification}>
        Publish Notification
      </button>

      {status && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {status}
        </p>
      )}
    </div>
  );
}

export default ManageNotifications;
