import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      setSuccess("Login Successful! Welcome " + response.data.user.email);

      // Optionally, store token in localStorage if you implement JWT
      // localStorage.setItem("token", response.data.token);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Server error. Please try again later."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side illustration / info */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10 overflow-hidden">
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-lg text-blue-100">
            Enter your credentials to access your dashboard and manage fees,
            results, and more efficiently.
          </p>
          <img
            src="https://img.freepik.com/free-vector/business-people-working-office_74855-5244.jpg?w=740&t=st=1694619081~exp=1694619681~hmac=0bb85b1b2f7e1e2a1e9f1a1f8e9db02c1c4f44b3e8b7e2c0d8d08f49be6d6c9d"
            alt="Business illustration"
            className="rounded-xl shadow-lg max-h-[60vh] object-contain"
          />
        </div>
      </div>

      {/* Right side login form */}
      <div className="flex w-full lg:w-1/2 bg-white items-center justify-center p-8 overflow-hidden">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Sign In
          </h2>

          {/* Display error / success */}
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-400">
                <FiMail className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full outline-none p-2 rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-400">
                <FiLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="w-full outline-none p-2 rounded-xl"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-gray-500 text-center text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
