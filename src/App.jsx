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
import AdminLayout from "./layouts/adminLayout";

// HOD pages
import HODDashboard from "./pages/HOD/Dashboard/dashboard";
import HODApprovals from "./pages/HOD/Approvals/approvals";
import HODLayout from "./layouts/hodLayout";

// HR pages
import HRDashboard from "./pages/HR/Dashboard/dashboard";
import HRApprovals from "./pages/HR/Approvals/approvals";
import HRLayout from "./layouts/hrLayout";

// GED pages
import GEDDashboard from "./pages/GED/Dashboard/dashboard";
import GEDApprovals from "./pages/GED/Approvals/approvals";
import GEDLayout from "./layouts/gedLayout";

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

          {/* EMPLOYEE ROUTES */}
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
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
                <AdminLayout>
                  <Profile />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* HOD ROUTES */}
          <Route
            path="/hod"
            element={
              <ProtectedRoute>
                <HODLayout>
                  <HODDashboard />
                </HODLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hod/approvals"
            element={
              <ProtectedRoute>
                <HODLayout>
                  <HODApprovals />
                </HODLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hod/profile"
            element={
              <ProtectedRoute>
                <HODLayout>
                  <Profile />
                </HODLayout>
              </ProtectedRoute>
            }
          />

          {/* HR ROUTES */}
          <Route
            path="/hr"
            element={
              <ProtectedRoute>
                <HRLayout>
                  <HRDashboard />
                </HRLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/approvals"
            element={
              <ProtectedRoute>
                <HRLayout>
                  <HRApprovals />
                </HRLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/profile"
            element={
              <ProtectedRoute>
                <HRLayout>
                  <Profile />
                </HRLayout>
              </ProtectedRoute>
            }
          />

          {/* GED ROUTES */}
          <Route
            path="/ged"
            element={
              <ProtectedRoute>
                <GEDLayout>
                  <GEDDashboard />
                </GEDLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ged/approvals"
            element={
              <ProtectedRoute>
                <GEDLayout>
                  <GEDApprovals />
                </GEDLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ged/profile"
            element={
              <ProtectedRoute>
                <GEDLayout>
                  <Profile />
                </GEDLayout>
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
