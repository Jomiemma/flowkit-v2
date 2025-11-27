import React, { useState } from "react";
import HRCards from "../Dashboard/hrCards";
import LeaveRequestsPreview from "../Dashboard/leaveRequestsPreview";
import ProgressBar from "../../Employee/Dashboard/progressBar";

function HRDashboard() {
  const [latestLeave, setLatestLeave] = useState(null);

  const stages = ["ED", "GED"];
  const currentStage = latestLeave?.stage || 0;

  return (
    <div>
      <HRCards />

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

export default HRDashboard;
