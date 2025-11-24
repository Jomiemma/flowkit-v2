import React from "react";
import HODCards from "../Dashboard/hodCards";
import LeaveRequestsPreview from "../Dashboard/leaveRequestsPreview";

function HODDashboard() {
  return (
    <div>
      <HODCards />

      <br />
      <div className="p-6">
        <LeaveRequestsPreview />
      </div>
    </div>
  );
}

export default HODDashboard;
