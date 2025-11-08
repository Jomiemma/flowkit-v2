import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Employee/Dashboard/dashboard";
import Profile from "./pages/Employee/Profile/profile";
import LeaveMgt from "./pages/Employee/LeaveMgt/leaveMgt";
import MainLayout from "./layouts/mainLayout";
import Login from "./pages/auth/Login/Login";
import Signup from "./pages/auth/Signup/Signup";
// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard/dashboard";
import LeaveManagement from "./pages/Admin/LeaveManagement/leaveManagement";
import AdminProfile from "./pages/Admin/Profile/adminProfile";
import AdminLayout from "./layouts/adminLayout";
// import ForgotPword from "./pages/auth/ForgotPassword/forgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          {/* <Route path="/forgot_password" element={<ForgotPword />} /> */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/leave-requests"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <LeaveManagement />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AdminProfile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <LeaveMgt />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
