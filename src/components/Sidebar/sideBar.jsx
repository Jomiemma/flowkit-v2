import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiLogOut } from "react-icons/fi";
import { User, Calendar } from "lucide-react";

const Sidebar = ({ role = "employee" }) => {
  const navigate = useNavigate();

  const employeeNav = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/dashboard" },
    { name: "Leave Management", icon: <Calendar size={20} />, path: "/leave" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
  ];

  const adminNav = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/admin" },
    {
      name: "Leave Applications",
      icon: <Calendar size={20} />,
      path: "/admin/leave-requests",
    },
    // { name: "Profile", icon: <User size={20} />, path: "/admin/profile" },
  ];

  const navItems = role === "admin" ? adminNav : employeeNav;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin", { replace: true });
  };

  return (
    <div className="w-[220px] h-screen bg-blue-600 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">BBC Leave</h2>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-500 transition ${
                isActive ? "bg-white/20" : ""
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition text-left"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
