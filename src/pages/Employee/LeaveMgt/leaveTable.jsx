import React, { useRef, useEffect, useState } from "react";
import ModalTrigger from "./modalTrigger";
import Modal from "./modal";
import { leaveAPI } from "./../../../services/api";
import { toast } from "react-toastify";

const LeaveTable = ({ showReliever = true }) => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await leaveAPI.getMyLeaves();

      if (response.success) {
        setLeaveHistory(response.leaves || []);
      }
    } catch (error) {
      console.error("Failed to fetch leaves:", error);
      toast.error("Failed to load leave history");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCreated = () => {
    fetchLeaves();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sortedLeaves = [...leaveHistory].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600";
      case "Pending":
        return "text-yellow-600";
      case "Rejected":
        return "text-red-600";
      case "Active":
        return "text-blue-600";
      case "Over":
        return "text-gray-500";
      case "Cancelled":
        return "text-gray-400";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-400">
            Loading leave history...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-2 mt-6">
        <h2 className="text-lg font-bold text-gray-700">Leave History</h2>
        <ModalTrigger onOpen={() => modalRef.current.open()} />
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse mt-4">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 mb-8">
              <th className="py-3 px-4">Leave Type</th>
              <th className="py-3 px-4">From</th>
              <th className="py-3 px-4">To</th>
              <th className="py-3 px-4">No. of Days</th>
              {showReliever && <th className="py-3 px-4">Reliever</th>}
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedLeaves.length === 0 ? (
              <tr>
                <td
                  colSpan={showReliever ? "7" : "6"}
                  className="text-center py-8 text-gray-400 text-sm italic"
                >
                  No leaves have been taken yet. Once you apply, your leave
                  history will appear here.
                </td>
              </tr>
            ) : (
              sortedLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {leave.leaveType}
                    {leave.otherLeaveType && (
                      <span className="text-xs text-gray-500">
                        {" "}
                        ({leave.otherLeaveType})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">{formatDate(leave.fromDate)}</td>
                  <td className="py-3 px-4">{formatDate(leave.toDate)}</td>
                  <td className="py-3 px-4">{leave.totalDays}</td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {leave.reliever?.firstName} {leave.reliever?.lastName}
                  </td>

                  <td
                    className={`py-3 px-4 font-semibold ${getStatusColor(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                    {leave.status === "Pending" && (
                      <span className="text-xs text-gray-500">
                        {" "}
                        (Stage {leave.stage})
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {leave.isEditable ? (
                      <button
                        onClick={() => modalRef.current.open(leave)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-gray-200 text-gray-500 px-3 py-1 rounded-md text-xs cursor-not-allowed"
                      >
                        Locked
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal
          ref={modalRef}
          onLeaveCreated={handleLeaveCreated}
          showReliever={showReliever}
        />
      </div>
    </>
  );
};

export default LeaveTable;
