import React from "react";
import AdminCards from "../Dashboard/adminCards";
import LeaveRequestsPreview from "../LeaveManagement/leaveRequestsPreview";

function AdminDashboard() {
  return (
    <div>
      <AdminCards />

      <br />
      <div className="p-6">
        <LeaveRequestsPreview />
      </div>
    </div>
  );
}

export default AdminDashboard;
