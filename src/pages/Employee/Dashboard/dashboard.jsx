import React, { useEffect, useState } from "react";
import DashCards from "./dashCards";
import DashGraph from "./dashGraph";
import ProgressBar from "./progressBar";
import { leaveAPI } from "./../../../services/api";

const Dashboard = () => {
  const [latestLeave, setLatestLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestLeave = async () => {
      try {
        const response = await leaveAPI.getMyLeaves();

        if (response.success && response.leaves && response.leaves.length > 0) {
          // Get the most recent pending leave
          const pendingLeaves = response.leaves.filter(
            (leave) => leave.status === "Pending" || leave.status === "Approved"
          );

          if (pendingLeaves.length > 0) {
            setLatestLeave(pendingLeaves[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestLeave();
  }, []);

  const stages = ["HOD", "HR", "GED"];
  const currentStage = latestLeave?.stage || 0;

  return (
    <div className="p-4 ">
      {/* leave stats */}
      <DashCards />

      {/* conditional rendering for leave progress */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-pulse text-gray-400">
            Loading leave status...
          </div>
        </div>
      ) : !latestLeave || currentStage === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <p className="text-base font-medium">No leaves applied yet</p>
          <p className="text-sm text-gray-400">
            Your progress will appear here once you apply for leave.
          </p>
        </div>
      ) : (
        <ProgressBar stages={stages} currentStage={currentStage} />
      )}

      {/* graph */}
      <DashGraph />
    </div>
  );
};

export default Dashboard;
