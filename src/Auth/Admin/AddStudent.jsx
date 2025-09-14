import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import axios from "axios";

export default function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    course: "",
    year: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/students/add", formData);
      console.log(response.data);
      setSuccess("Student added successfully!");

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Student</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <input type="text" name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full border px-3 py-2 rounded-lg" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
