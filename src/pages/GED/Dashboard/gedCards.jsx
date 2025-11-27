import React, { useEffect, useState } from "react";
import { Users, Briefcase, Home } from "lucide-react";
import StatCard from "../../../components/Reusables/statCard";
import { gedAPI } from "../../../services/api";
import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GEDCards() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    onLeave: 0,
    onSite: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await gedAPI.getDashboardStats();
        if (response.success) {
          setStats({
            totalEmployees: response.data.totalEmployees || 0,
            onLeave: response.data.onLeave || 0,
            onSite: response.data.onSite || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch GED dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const pieData = [
    { name: "On Leave", value: stats.onLeave },
    { name: "On Site", value: stats.onSite },
  ];

  const COLORS = ["#f87171", "#34d399"];

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-200 rounded-lg h-24 flex-1"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-24 flex-1"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-24 flex-1"></div>
          <div className="animate-pulse bg-gray-200 rounded-lg h-24 flex-1"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={<Users size={18} />}
          color="bg-red-500"
        />
        <StatCard
          title="On Leave"
          value={stats.onLeave}
          icon={<Briefcase size={18} />}
          color="bg-red-500"
        />
        <StatCard
          title="On Site"
          value={stats.onSite}
          icon={<Home size={18} />}
          color="bg-green-500"
        />
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={40} // smaller radius
              label={false} // labels will overflow in small charts
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GEDCards;
