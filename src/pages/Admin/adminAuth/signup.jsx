import React from "react";
import InputField from "../../../components/Reusables/inputFields";
import { Link } from "react-router-dom";

function AdminSignup() {
  return (
    <>
      <div className="logpage min-h-screen flex items-center justify-center bg-gray-50">
        <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 text-base">
          <h2 className="text-2xl font-semibold text-center font-sans">
            Sign Up
          </h2>
          <div className="space-y-4">
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Full Name"
              // value={}
              // onChange={}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email Address"
              // value={}
              // onChange={}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              // value={}
              // onChange={}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              // value={}
              // onChange={}
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-500">Department</label>
              <select
                name="department"
                // value={formData.department}
                // onChange={handleChange}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  -- Select your department --
                </option>
                {[
                  { id: 1, name: "VAS" },
                  { id: 2, name: "VOICE" },
                  { id: 3, name: "ACCOUNTS" },
                  { id: 4, name: "NOC" },
                  { id: 5, name: "OSP" },
                  { id: 6, name: "ADMIN" },
                  { id: 7, name: "CUSTOMER SERVICE" },
                  { id: 8, name: "FIELD" },
                  { id: 9, name: "MARKETING" },
                ].map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            //   disabled={loading}
            className="w-full text-white bg-blue-500 font-medium py-2.5 rounded-2xl hover:bg-blue-800
        hover:scale-[1.05] transition-all duration-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {/* add code for condition of loading */}
            Sign Up
          </button>
          <span>
            Already have an account?
            <Link className="font-semibold" to={"/admin/login"}>
              login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
export default AdminSignup;
