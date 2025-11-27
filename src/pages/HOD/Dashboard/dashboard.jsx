import React, { useState } from "react";
import HODCards from "../Dashboard/hodCards";
import LeaveRequestsPreview from "../Dashboard/leaveRequestsPreview";
import ProgressBar from "../../Employee/Dashboard/progressBar";

function HODDashboard() {
  const [latestLeave, setLatestLeave] = useState(null);

  const stages = ["ED", "HR", "GED"];
  const currentStage = latestLeave?.stage || 0;

  return (
    <div>
      <HODCards />

      <br />
      <div className="p-6">
        <LeaveRequestsPreview />
        <div className="mt-4">
          <ProgressBar stages={stages} currentStage={currentStage} />
        </div>
      </div>
    </div>
  );
}

export default HODDashboard;
