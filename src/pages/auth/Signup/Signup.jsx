import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/Reusables/inputFields";
import { toast } from "react-toastify";
import { authAPI } from "../../../services/api";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.department
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await authAPI.register(registrationData);

      if (response.success) {
        toast.success("Registration successful! Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="logpage min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 text-base"
        >
          <h2 className="text-2xl font-semibold text-center font-sans">
            Sign Up
          </h2>
          <div className="space-y-4">
            <InputField
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-500">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
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
                  { id: 10, name: "HUMAN RESOURCES" },
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
            disabled={loading}
            className="w-full text-white bg-blue-500 font-medium py-2.5 rounded-2xl hover:bg-blue-800 hover:scale-[1.05] transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
          <span>
            Already have an account?{" "}
            <Link className="font-semibold" to={"/login"}>
              login now
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;
