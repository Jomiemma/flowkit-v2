import React from "react";
import HRCards from "../Dashboard/hrCards";
import LeaveRequestsPreview from "../Dashboard/leaveRequestsPreview";

function HRDashboard() {
  return (
    <div>
      <HRCards />

      <br />
      <div className="p-6">
        <LeaveRequestsPreview />
      </div>
    </div>
  );
}

export default HRDashboard;
