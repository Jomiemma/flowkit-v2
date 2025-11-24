import React, { useState, useEffect } from "react";
import { hodAPI } from "../../../services/api";
import { toast } from "react-toastify";

function HODApprovals() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("requests");

  // Fetch leaves from backend
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      
      // Debug: Log token
      const token = localStorage.getItem('token');
      console.log('🔑 Auth Token:', token);
      console.log('🔑 Token substring:', token?.substring(0, 50) + '...');
      
      const response = await hodAPI.getLeaves();
      
      console.log('=== FULL API RESPONSE ===');
      console.log('🔍 Response object:', response);
      console.log('🔍 Response JSON:', JSON.stringify(response, null, 2));
      console.log('✅ Response.success:', response?.success);
      console.log('📋 Response.leaves:', response?.leaves);
      console.log('📋 Leaves is array?:', Array.isArray(response?.leaves));
      console.log('📊 Leaves count:', response?.leaves?.length || 0);
      console.log('========================');
      
      if (response.success) {
        // Transform backend data to match our display format
        const transformedLeaves = (response.leaves || []).map((leave) => ({
          id: leave.id,
          employeeName: `${leave.employee.firstName} ${leave.employee.lastName}`,
          leaveType: leave.leaveType,
          from: new Date(leave.fromDate).toLocaleDateString(),
          to: new Date(leave.toDate).toLocaleDateString(),
          totalDays: leave.totalDays,
          reason: leave.reason,
          status: leave.hodApprovalStatus === "pending" ? "Pending" : 
                  leave.hodApprovalStatus === "approved" ? "Approved" : "Rejected",
        }));
        console.log('✨ Transformed leaves:', transformedLeaves);
        setLeaveRequests(transformedLeaves);
      }
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
      toast.error(`Failed to load leave requests: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Derived Data
  const pendingRequests = leaveRequests
    .filter((req) => req.status === "Pending")
    .sort((a, b) => new Date(b.from) - new Date(a.from));

  const approvedRequests = leaveRequests.filter(
    (req) => req.status === "Approved"
  );
  const rejectedRequests = leaveRequests.filter(
    (req) => req.status === "Rejected"
  );

  // Handle Approve / Reject with API calls
  const handleAction = async (id, newStatus) => {
    if (processing) return;

    try {
      setProcessing(true);
      const action = newStatus === "Approved" ? "approve" : "reject";
      
      if (action === "approve") {
        await hodAPI.approve(id, "Approved by HOD");
        toast.success("Leave request approved successfully!");
      } else {
        await hodAPI.reject(id, "Rejected by HOD");
        toast.error("Leave request rejected");
      }

      // Refresh the list
      await fetchLeaves();
    } catch (error) {
      console.error(`Failed to ${newStatus} leave:`, error);
      toast.error(error.message || `Failed to ${newStatus.toLowerCase()} leave request`);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leave requests...</p>
        </div>
      </div>
    );
  }

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
                        disabled={processing}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-xs hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(leave.id, "Rejected")}
                        disabled={processing}
                        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default HODApprovals;
