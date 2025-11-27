import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { X } from "lucide-react";
import InputField from "./../../../components/Reusables/inputFields";
import { leaveAPI, userAPI, getUser } from "./../../../services/api";
import { toast } from "react-toastify";

const Modal = forwardRef(({ onLeaveCreated, showReliever = true }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [leaveId, setLeaveId] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [otherLeaveType, setOtherLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [reason, setReason] = useState("");
  const [reliever, setReliever] = useState("");
  const [relievers, setRelievers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = getUser();

  useImperativeHandle(ref, () => ({
    open: (leaveData = null) => {
      setIsOpen(true);
      if (leaveData) {
        setEditMode(true);
        setLeaveId(leaveData.id);
        setLeaveType(leaveData.leaveType || "");
        setOtherLeaveType(leaveData.otherLeaveType || "");
        setFromDate(leaveData.fromDate?.split("T")[0] || "");
        setToDate(leaveData.toDate?.split("T")[0] || "");
        setReason(leaveData.reason || "");
        setReliever(leaveData.reliever?.id || leaveData.reliever || "");
      } else {
        setEditMode(false);
        setLeaveId(null);
        resetForm();
      }
      if (showReliever) fetchRelievers();
    },
    close: () => {
      setIsOpen(false);
      resetForm();
    },
  }));

  const fetchRelievers = async () => {
    try {
      const response = await userAPI.getRelievers();
      if (response.success) {
        setRelievers(response.relievers || []);
      }
    } catch (error) {
      console.error("Failed to fetch relievers:", error);
      toast.error("Failed to load relievers");
    }
  };

  const calculateWorkdays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return 0;

    let workdays = 0;
    let current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workdays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return workdays;
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const workdays = calculateWorkdays(fromDate, toDate);
      setTotalDays(workdays);
    } else {
      setTotalDays("");
    }
  }, [fromDate, toDate]);

  const resetForm = () => {
    setLeaveType("");
    setOtherLeaveType("");
    setFromDate("");
    setToDate("");
    setReason("");
    setReliever("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType) {
      toast.error("Please select a leave type");
      return;
    }

    if (leaveType === "Other" && !otherLeaveType) {
      toast.error("Please specify the leave type");
      return;
    }

    if (!fromDate || !toDate) {
      toast.error("Please select both from and to dates");
      return;
    }

    if (!reason) {
      toast.error("Please provide a reason for leave");
      return;
    }

    if (showReliever && !reliever) {
      toast.error("Please select a reliever");
      return;
    }

    setLoading(true);

    try {
      const leaveData = {
        leaveType,
        otherLeaveType: leaveType === "Other" ? otherLeaveType : "",
        fromDate,
        toDate,
        reason,
        ...(showReliever && { reliever }), // only include reliever if shown
      };

      let response;
      if (editMode && leaveId) {
        response = await leaveAPI.update(leaveId, leaveData);
        toast.success("Leave request updated successfully!");
      } else {
        response = await leaveAPI.create(leaveData);
        toast.success("Leave request submitted successfully!");
      }

      if (response.success) {
        setIsOpen(false);
        resetForm();

        if (onLeaveCreated) {
          onLeaveCreated();
        }
      }
    } catch (error) {
      toast.error(
        error.message ||
          `Failed to ${editMode ? "update" : "submit"} leave request`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative bg-[#F8FAFC] rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 z-50">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">
            {editMode ? "Edit Leave Request" : "Leave Request Form"}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <InputField
            label="Name"
            placeholder="Name"
            value={`${user?.firstName || ""} ${user?.lastName || ""}`}
            readOnly
          />
          <InputField
            label="Staff ID"
            placeholder="ID"
            value={user?.staffId || ""}
            readOnly
          />

          <div className="flex flex-col gap-3">
            <label className="font-medium -mb-2">Type of Leave</label>
            <div className="flex flex-wrap gap-4">
              {["Annual Leave", "Sick Leave", "Casual Leave", "Other"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="leaveType"
                      value={option}
                      checked={leaveType === option}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="accent-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>
            {leaveType === "Other" && (
              <InputField
                type="text"
                placeholder="Please specify..."
                value={otherLeaveType}
                onChange={(e) => setOtherLeaveType(e.target.value)}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <InputField
              label="From"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="flex-1"
            />
            <InputField
              label="To"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="flex-1"
            />
            <InputField
              label="Total No. of Days"
              placeholder="Total..."
              value={totalDays}
              readOnly
              className="flex-1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Reason for leave</label>
            <textarea
              placeholder="Type your reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Conditionally render reliever field */}
          {showReliever && (
            <div className="flex flex-col gap-2">
              <label className="font-medium">Select Reliever</label>
              <select
                value={reliever}
                onChange={(e) => setReliever(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a reliever --</option>
                {relievers.map((rel) => (
                  <option key={rel.id} value={rel.id}>
                    {rel.firstName} {rel.lastName} ({rel.department})
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-500 font-medium py-2.5 rounded-2xl hover:bg-blue-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? editMode
                ? "Updating..."
                : "Submitting..."
              : editMode
              ? "Update"
              : "Apply"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default Modal;
