// Pages/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar (always visible) */}


      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Landing / Default ERP Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ERP Dashboard</h1>
          <p className="text-gray-600">
            Manage admissions, fees, hostel allocations, exams, and more — all in
            one place.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <h4 className="text-lg font-semibold ml-1 mb-4">Quick Stats (Consideration by the Students Who Filled The Form) </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="p-6 bg-white shadow rounded-1xl">
            <h2 className="text-lg font-semibold">Admissions  (open)</h2>
            <p className="text-3xl font-bold text-indigo-600">320</p>
            <p className="text-sm text-gray-500">New this semester</p>
          </div>

          <div className="p-6 bg-white shadow rounded-1xl">
            <h2 className="text-lg font-semibold">Hostel Rooms (Accommodation Based)</h2>
            <p className="text-3xl font-bold text-green-600">120 / 150</p>
            <p className="text-sm text-gray-500">Occupied</p>
          </div>

          <div className="p-6 bg-white shadow rounded-1xl">
            <h2 className="text-lg font-semibold">Fee Collection  (This Month OFFLINE)</h2>
            <p className="text-3xl font-bold text-rose-600">₹ 2.4L</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
        </div>

        {/* Nested Routes show here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
// 