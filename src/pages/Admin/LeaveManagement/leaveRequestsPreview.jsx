import React from "react";
import { Link } from "react-router-dom";

function LeaveRequestsPreview() {
  const mockLeaveRequests = [
    {
      id: 1,
      employeeName: "John Doe",
      leaveType: "Annual Leave",
      from: "2025-10-05",
      to: "2025-10-10",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Sarah Lee",
      leaveType: "Sick Leave",
      from: "2025-10-12",
      to: "2025-10-14",
      status: "Approved",
    },
    {
      id: 3,
      employeeName: "Michael Smith",
      leaveType: "Casual Leave",
      from: "2025-10-25",
      to: "2025-10-28",
      status: "Pending",
    },
    {
      id: 4,
      employeeName: "Emily Johnson",
      leaveType: "Annual Leave",
      from: "2025-10-25",
      to: "2025-10-28",
      status: "Pending",
    },
  ];

  const recentRequests = mockLeaveRequests.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">
          Recent Leave Requests
        </h2>
        <Link
          to="/admin/leave-requests"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="border-b text-gray-600">
            <tr>
              <th className="py-2 px-3">Employee</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">From</th>
              <th className="py-2 px-3">To</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentRequests.map((leave) => (
              <tr
                key={leave.id}
                className="hover:bg-gray-50 border-b last:border-b-0"
              >
                <td className="py-2 px-3">{leave.employeeName}</td>
                <td className="py-2 px-3">{leave.leaveType}</td>
                <td className="py-2 px-3">{leave.from}</td>
                <td className="py-2 px-3">{leave.to}</td>
                <td
                  className={`py-2 px-3 font-medium ${
                    leave.status === "Approved"
                      ? "text-green-600"
                      : leave.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveRequestsPreview;
