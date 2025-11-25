import React from "react";
import { getUser } from "../services/api";
import HODDashboard from "../pages/HOD/Dashboard/dashboard";
import HRDashboard from "../pages/HR/Dashboard/dashboard";
import GEDDashboard from "../pages/GED/Dashboard/dashboard";
import AdminDashboard from "../pages/Admin/Dashboard/dashboard";

const RoleBasedDashboard = () => {
  const user = getUser();
  const role = user?.role;

  // Route to the appropriate dashboard based on user role
  switch (role) {
    case "hod":
      return <HODDashboard />;
    case "hr":
      return <HRDashboard />;
    case "ged":
      return <GEDDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <AdminDashboard />; // Fallback to admin dashboard
  }
};

export default RoleBasedDashboard;
