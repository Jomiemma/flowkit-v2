import React from "react";

const StatCard = ({ title, value, icon, color = "bg-blue-500" }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md w-full sm:w-[200px]">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-[20px] font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>
    </div>
  );
};

export default StatCard;
