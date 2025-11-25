import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../services/api";

const Topbar = ({ role = "employee" }) => {
  const user = getUser();

  const getInitials = () => {
    if (!user) return "U";
    const firstInitial = user.firstName?.charAt(0) || "";
    const lastInitial = user.lastName?.charAt(0) || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  // Get profile link based on role
  const getProfileLink = () => {
    switch (role) {
      case "admin":
        return "/admin/profile";
      case "hod":
        return "/hod/profile";
      case "hr":
        return "/hr/profile";
      case "ged":
        return "/ged/profile";
      default:
        return "/profile";
    }
  };

  const profileLink = getProfileLink();
  const title = role === "admin" ? "Admin Panel" : "FlowKit";

  return (
    <header className="w-full bg-white shadow px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-semibold">BBC Leave Management</div>

      <div className="flex items-center gap-4">
        <Link
          to={profileLink}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user ? `${user.firstName} ${user.lastName}` : "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role || role}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white cursor-pointer">
            {getInitials()}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;
