import React from "react";
import GEDCards from "../Dashboard/gedCards";
import LeaveRequestsPreview from "../Dashboard/leaveRequestsPreview";

function GEDDashboard() {
  return (
    <div>
      <GEDCards />

      <br />
      <div className="p-6">
        <LeaveRequestsPreview />
      </div>
    </div>
  );
}

export default GEDDashboard;
