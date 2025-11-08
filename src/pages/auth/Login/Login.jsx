import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/Reusables/inputFields";
import { toast } from "react-toastify";
import { authAPI, isAuthenticated } from "../../../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.login(formData);

      if (response.success) {
        toast.success("Login successful! Welcome back!");
        // Use replace to clear login page from history
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error(
        error.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="logpage min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-77 space-y-6 text-base"
        >
          <img />
          <h2 className="text-2xl font-semibold text-center font-sans">
            Sign In
          </h2>
          <p className="text-center text-base">
            Login to your account to continue
          </p>
          <div className="space-y-4">
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {/* <span className="flex justify-end font-semibold">
            <Link to={"/forgot_password"}>Forgot Your Password?</Link>
          </span> */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-500 font-medium py-2.5 rounded-2xl hover:bg-blue-800 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <span>
            Don't have an account?{" "}
            <Link className="font-semibold" to={"/"}>
              signup now
            </Link>
          </span>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold mb-2">
              Test Credentials:
            </p>
            <p className="text-xs text-gray-500">
              Email: john.employee@flowkit.com
            </p>
            <p className="text-xs text-gray-500">Password: password123</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
