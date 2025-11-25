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
    { name: "Profile", icon: <User size={20} />, path: "/admin/profile" },
  ];

  const hodNav = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/hod" },
    {
      name: "Leave Approvals",
      icon: <Calendar size={20} />,
      path: "/hod/approvals",
    },
    { name: "Profile", icon: <User size={20} />, path: "/hod/profile" },
  ];

  const hrNav = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/hr" },
    {
      name: "Leave Approvals",
      icon: <Calendar size={20} />,
      path: "/hr/approvals",
    },
    { name: "Profile", icon: <User size={20} />, path: "/hr/profile" },
  ];

  const gedNav = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/ged" },
    {
      name: "Leave Approvals",
      icon: <Calendar size={20} />,
      path: "/ged/approvals",
    },
    { name: "Profile", icon: <User size={20} />, path: "/ged/profile" },
  ];

  let navItems = employeeNav;
  if (role === "admin") navItems = adminNav;
  else if (role === "hod") navItems = hodNav;
  else if (role === "hr") navItems = hrNav;
  else if (role === "ged") navItems = gedNav;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
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
