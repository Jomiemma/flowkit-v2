import React from "react";
import { Users, Briefcase, Home } from "lucide-react";
import StatCard from "../../../components/Reusables/statCard";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminDashboard from "./dashboard";

function AdminCards() {
  const totalEmployees = 100;
  const employeesOnLeave = 25;
  const employeesOnSite = totalEmployees - employeesOnLeave;

  const pieData = [
    { name: "On Leave", value: employeesOnLeave },
    { name: "On Site", value: employeesOnSite },
  ];

  const COLORS = ["#f87171", "#34d399"];

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-row gap-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users size={18} />}
          color="bg-red-500"
        />
        <StatCard
          title="On Leave"
          value={employeesOnLeave}
          icon={<Briefcase size={18} />}
          color="bg-red-500"
        />
        <StatCard
          title="On Site"
          value={employeesOnSite}
          icon={<Home size={18} />}
          color="bg-green-500"
        />
        <ResponsiveContainer width="100%" height={105}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              overRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: "14px",
                padding: "4px 8px",
                borderRadius: "6px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminCards;
