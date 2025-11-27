import React from "react";
import LeaveTable from "../../Employee/LeaveMgt/leaveTable";

function HrLeaveApp() {
  return (
    <div>
      <LeaveTable showReliever={false} />
    </div>
  );
}

export default HrLeaveApp;
