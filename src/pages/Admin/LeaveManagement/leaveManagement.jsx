import React, { useState } from "react";

function LeaveManagement() {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      leaveType: "Annual Leave",
      from: "2025-10-05",
      to: "2025-10-10",
      totalDays: 5,
      reason: "Family Vacation",
      status: "Pending",
    },
    {
      id: 2,
      employeeName: "Sarah Lee",
      leaveType: "Sick Leave",
      from: "2025-10-12",
      to: "2025-10-14",
      totalDays: 3,
      reason: "Medical recovery",
      status: "Approved",
    },
    {
      id: 3,
      employeeName: "Michael Smith",
      leaveType: "Causal Leave",
      from: "2025-10-20",
      to: "2025-10-22",
      totalDays: 3,
      reason: "Attending a wedding",
      status: "Pending",
    },
    {
      id: 4,
      employeeName: "Hakeem Grillo",
      leaveType: "Annual Leave",
      from: "2025-10-27",
      to: "2025-10-30",
      totalDays: 3,
      reason: "Relaxation",
      status: "Pending",
    },
    {
      id: 5,
      employeeName: "Aisha Bello",
      leaveType: "Sick Leave",
      from: "2025-11-02",
      to: "2025-11-04",
      totalDays: 3,
      reason: "Flu and rest",
      status: "Pending",
    },
    {
      id: 6,
      employeeName: "David Okafor",
      leaveType: "Annual Leave",
      from: "2025-11-10",
      to: "2025-11-20",
      totalDays: 10,
      reason: "Traveling abroad",
      status: "Approved",
    },
    {
      id: 7,
      employeeName: "Grace Johnson",
      leaveType: "Maternity Leave",
      from: "2025-12-01",
      to: "2026-02-28",
      totalDays: 90,
      reason: "Childbirth and recovery",
      status: "Pending",
    },
    {
      id: 8,
      employeeName: "Samuel Adeyemi",
      leaveType: "Casual Leave",
      from: "2025-11-15",
      to: "2025-11-17",
      totalDays: 3,
      reason: "Attending a conference",
      status: "Rejected",
    },
    {
      id: 9,
      employeeName: "Chidinma Nwosu",
      leaveType: "Sick Leave",
      from: "2025-10-25",
      to: "2025-10-27",
      totalDays: 3,
      reason: "Migraine treatment",
      status: "Approved",
    },
    {
      id: 10,
      employeeName: "Emmanuel Udo",
      leaveType: "Annual Leave",
      from: "2025-12-15",
      to: "2025-12-30",
      totalDays: 16,
      reason: "Holiday break",
      status: "Pending",
    },
    {
      id: 11,
      employeeName: "Fatima Sule",
      leaveType: "Study Leave",
      from: "2025-11-05",
      to: "2025-11-25",
      totalDays: 21,
      reason: "Professional certification exam",
      status: "Approved",
    },
    {
      id: 12,
      employeeName: "Tunde Afolayan",
      leaveType: "Casual Leave",
      from: "2025-11-28",
      to: "2025-11-30",
      totalDays: 3,
      reason: "Wedding of a close friend",
      status: "Pending",
    },
    {
      id: 13,
      employeeName: "Ngozi Eze",
      leaveType: "Sick Leave",
      from: "2025-10-29",
      to: "2025-11-01",
      totalDays: 4,
      reason: "Post-surgery recovery",
      status: "Rejected",
    },
    {
      id: 14,
      employeeName: "Ibrahim Musa",
      leaveType: "Annual Leave",
      from: "2025-12-05",
      to: "2025-12-12",
      totalDays: 8,
      reason: "Family trip",
      status: "Pending",
    },
    {
      id: 15,
      employeeName: "Blessing Opara",
      leaveType: "Casual Leave",
      from: "2025-10-31",
      to: "2025-11-02",
      totalDays: 3,
      reason: "Personal errands",
      status: "Approved",
    },
  ]);

  const [activeTab, setActiveTab] = useState("requests");

  // Derived Data
  const pendingRequests = leaveRequests
    .filter((req) => req.status === "Pending")
    .sort((a, b) => new Date(b.from) - new Date(a.from)); // newest first

  const approvedRequests = leaveRequests.filter(
    (req) => req.status === "Approved"
  );
  const rejectedRequests = leaveRequests.filter(
    (req) => req.status === "Rejected"
  );

  // Handle Approve / Reject
  const handleAction = (id, newStatus) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Leave Management
      </h1>

      <div className="flex gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "requests"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Leave Requests
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Leave History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "requests" ? (
        <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Pending Leave Requests
          </h2>

          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 px-3">Employee</th>
                <th className="py-2 px-3">Leave Type</th>
                <th className="py-2 px-3">From</th>
                <th className="py-2 px-3">To</th>
                <th className="py-2 px-3">Days</th>
                <th className="py-2 px-3">Reason</th>
                <th className="py-2 px-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pendingRequests.length > 0 ? (
                pendingRequests.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{leave.employeeName}</td>
                    <td className="py-2 px-3">{leave.leaveType}</td>
                    <td className="py-2 px-3">{leave.from}</td>
                    <td className="py-2 px-3">{leave.to}</td>
                    <td className="py-2 px-3">{leave.totalDays}</td>
                    <td className="py-2 px-3">{leave.reason}</td>
                    <td className="py-2 px-3 text-center space-x-2">
                      <button
                        onClick={() => handleAction(leave.id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No pending requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // ---------------- Leave History Tables ----------------
        <div className="space-y-10">
          {/* Approved Leaves */}
          <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
              Approved Leaves
            </h2>
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="border-b text-gray-600">
                <tr>
                  <th className="py-2 px-3">Employee</th>
                  <th className="py-2 px-3">Leave Type</th>
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">To</th>
                  <th className="py-2 px-3">Days</th>
                  <th className="py-2 px-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {approvedRequests.length > 0 ? (
                  approvedRequests.map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{leave.employeeName}</td>
                      <td className="py-2 px-3">{leave.leaveType}</td>
                      <td className="py-2 px-3">{leave.from}</td>
                      <td className="py-2 px-3">{leave.to}</td>
                      <td className="py-2 px-3">{leave.totalDays}</td>
                      <td className="py-2 px-3">{leave.reason}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No approved leaves yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Rejected Leaves */}
          <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Rejected Leaves
            </h2>
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="border-b text-gray-600">
                <tr>
                  <th className="py-2 px-3">Employee</th>
                  <th className="py-2 px-3">Leave Type</th>
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">To</th>
                  <th className="py-2 px-3">Days</th>
                  <th className="py-2 px-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                {rejectedRequests.length > 0 ? (
                  rejectedRequests.map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">{leave.employeeName}</td>
                      <td className="py-2 px-3">{leave.leaveType}</td>
                      <td className="py-2 px-3">{leave.from}</td>
                      <td className="py-2 px-3">{leave.to}</td>
                      <td className="py-2 px-3">{leave.totalDays}</td>
                      <td className="py-2 px-3">{leave.reason}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No rejected leaves yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveManagement;
