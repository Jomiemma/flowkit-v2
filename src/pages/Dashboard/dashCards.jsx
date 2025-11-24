import React, { useEffect, useState } from "react";
import { dashboardAPI, getUser } from "../../services/api";
import { toast } from "react-toastify";

const DashCards = () => {
  const [stats, setStats] = useState({
    totalLeaves: 0,
    availableLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = getUser();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardAPI.getStats();
        
        if (response.success) {
          setStats({
            totalLeaves: response.data.totalLeaves || 0,
            availableLeaves: response.data.availableLeaves || 0,
            approvedLeaves: response.data.approvedLeaves || 0,
            rejectedLeaves: response.data.rejectedLeaves || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leaves", value: stats.totalLeaves },
    { label: "Available Leaves", value: stats.availableLeaves },
    { label: "Approved Leaves", value: stats.approvedLeaves },
    { label: "Rejected Leaves", value: stats.rejectedLeaves },
  ];

  if (loading) {
    return (
      <div className="flex flex-row gap-6 -mt-6 p-6 w-full overflow-x-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-2xl shadow-md px-5 py-3 min-w-[250px] animate-pulse"
          >
            <div className="bg-gray-200 rounded-lg w-16 h-16"></div>
            <div className="ml-4 space-y-2">
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-6 -mt-6 p-6 w-full overflow-x-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white rounded-2xl shadow-md px-5 py-3 min-w-[250px]"
        >
          {/* Left side (value + DAYS) */}
          <div className="flex flex-col items-center justify-center bg-[#1677FF] rounded-lg px-2 py-1">
            <p className="text-[15px] font-bold text-white">{card.value}</p>
            <span className="text-[10px] font-semibold text-white">DAYS</span>
          </div>

          {/* Right side (label) */}
          <div className="ml-4 flex flex-col justify-center text-right">
            <p className="text-[14px] font-semibold text-gray-700">
              {card.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashCards;
