// src/Pages/ViewAll.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAll() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching students:", err.response?.data || err.message);
      setError("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading students...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Students</h1>
        <button
          onClick={fetchStudents}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg text-center">
          <thead className="bg-indigo-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{s.id}</td>
                  <td className="border px-4 py-2">{s.name}</td>
                  <td className="border px-4 py-2">{s.roll_no}</td>
                  <td className="border px-4 py-2">{s.email}</td>
                  <td className="border px-4 py-2">{s.course}</td>
                  <td className="border px-4 py-2">{s.year}</td>
                  <td className="border px-4 py-2">{s.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
