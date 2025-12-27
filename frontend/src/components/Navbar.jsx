import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // 🔹 state to store notification
  const [notification, setNotification] = useState("Loading notification...");

  // 🔹 fetch notification when navbar loads
  useEffect(() => {
    API.get("/notifications")
      .then((res) => {
        if (res.data.length > 0) {
          setNotification(res.data[0].message);
        } else {
          setNotification("No new notifications");
        }
      })
      .catch(() => {
        setNotification("Unable to load notifications");
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header>
      {/* 🔵 College Identity Bar */}
      <div className="top-bar">
        <div className="college-info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"
            alt="College Logo"
            className="college-logo"
          />
          <span className="college-name">
            College of Engineering Trikkaripur
          </span>
        </div>
      </div>

      {/* 🔹 Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
  {!role && (
    <>
      <Link to="/">Home</Link>
      <Link to="/student-login">Student Login</Link>
      <Link to="/admin-login">Admin Login</Link>
      <Link to="/principal-login">Principal Login</Link>
    </>
  )}

  {role === "student" && (
    <Link to="/student-dashboard">Dashboard</Link>
  )}

  {role === "admin" && (
    <Link to="/admin-dashboard">Dashboard</Link>
  )}

  {role === "principal" && (
    <Link to="/principal-dashboard">Dashboard</Link>
  )}
</div>


        {role && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </nav>

      {/* 🟡 Notification Bar (DYNAMIC) */}
      <div className="notification-bar">
        📢 {notification}
      </div>
    </header>
  );
}

export default Navbar;
