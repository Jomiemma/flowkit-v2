import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dashboardAPI } from "./../../../services/api";
import { toast } from "react-toastify";

function DashGraph() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await dashboardAPI.getGraphData();

        if (response.success && response.data) {
          // Filter out future months with no data and convert null to 0 for display
          const processedData = response.data.map((month) => ({
            ...month,
            pending: month.pending ?? 0,
            approved: month.approved ?? 0,
            rejected: month.rejected ?? 0,
            available: month.available ?? 0,
          }));
          setMonthlyData(processedData);
        }
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
        toast.error("Failed to load chart data");
        setMonthlyData([
          { month: "Jan", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Feb", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Mar", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Apr", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "May", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Jun", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Jul", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Aug", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Sep", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Oct", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Nov", pending: 0, approved: 0, rejected: 0, available: 0 },
          { month: "Dec", pending: 0, approved: 0, rejected: 0, available: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 shadow-md rounded-xl w-full min-w-[200px] h-[320px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-xl w-full min-w-[200px] h-[320px]">
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        Leave Overview (Monthly)
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar
            dataKey="pending"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            animationDuration={300}
          />
          <Bar
            dataKey="approved"
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
            animationDuration={500}
          />
          <Bar
            dataKey="rejected"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            animationDuration={700}
          />
          <Bar
            dataKey="available"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashGraph;
