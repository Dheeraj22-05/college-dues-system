import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import PrincipalLogin from "./pages/PrincipalLogin";
import Navbar from "./components/Navbar";
import StudentDashboard from "./pages/StudentDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import ManageNotifications from "./pages/ManageNotifications";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/principal-login" element={<PrincipalLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/student-dashboard" element={<ProtectedRoute role="student"> <StudentDashboard /> </ProtectedRoute> }/>
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"> <AdminDashboard /> </ProtectedRoute>}/>
        <Route path="/principal-dashboard" element={<ProtectedRoute role="principal"> <PrincipalDashboard /> </ProtectedRoute> }/>
        <Route path="/manage-notifications" element={<ProtectedRoute role="principal"> <ManageNotifications /> </ProtectedRoute> } />
      </Routes>
    </>
  );
}

export default App;
