import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gedAPI } from "../../../services/api";

function LeaveRequestsPreview() {
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await gedAPI.getLeaves();
        if (response.success) {
          // Get the 3 most recent leaves
          const leaves = response.leaves || [];
          setRecentRequests(leaves.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch recent leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusDisplay = (leave) => {
    if (leave.gedApprovalStatus === "rejected") return "Rejected";
    if (leave.gedApprovalStatus === "approved") return "Approved";
    return "Pending";
  };

  const getStatusColor = (leave) => {
    if (leave.gedApprovalStatus === "rejected") return "text-red-600";
    if (leave.gedApprovalStatus === "approved") return "text-green-600";
    return "text-yellow-600";
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">
            Recent Leave Requests
          </h2>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-700">
          Recent Leave Requests
        </h2>
        <Link
          to="/ged/approvals"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      {recentRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recent leave requests</p>
        </div>
      ) : (
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
                  <td className="py-2 px-3">
                    {leave.employee?.firstName} {leave.employee?.lastName}
                  </td>
                  <td className="py-2 px-3">{leave.leaveType}</td>
                  <td className="py-2 px-3">{formatDate(leave.fromDate)}</td>
                  <td className="py-2 px-3">{formatDate(leave.toDate)}</td>
                  <td className={`py-2 px-3 font-medium ${getStatusColor(leave)}`}>
                    {getStatusDisplay(leave)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LeaveRequestsPreview;
