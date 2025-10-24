import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/Reusables/inputFields";
import { toast } from "react-toastify";

function ForgotPword() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("email sent to reset your password");
  };
  return (
    <>
      <div className="logpage min-h-screen pb-20 flex items-center justify-center bg-gray-50">
        <form className="bg-white shadow-lg rounded-2xl p-8 w-77 space-y-6 text-sm">
          <img />
          <h2 className="text-2xl font-bold text-center font-sans">
            Reset Account Password
          </h2>
          <p className="text-base text-center text-base font-semibold">
            Input your email address to continue
          </p>
          <div className="space-y-4">
            <InputField placeholder="Email Address" />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full text-white bg-blue-500 font-medium py-2.5 rounded-2xl hover:bg-blue-800 transition-all duration-200 cursor-pointer"
          >
            Send Link
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPword;
