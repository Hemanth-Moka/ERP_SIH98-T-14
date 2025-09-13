// src/Pages/Dashboard.jsx
import React, { useState } from "react";
import {
  FiBarChart,
  FiHome,
  FiUsers,
  FiFileText,
  FiClipboard,
  FiKey,
  FiBook,
  FiChevronRight,
  FiChevronDown,
} from "react-icons/fi";
import { NavLink, Outlet } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

/* -------------------- Dashboard -------------------- */
const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-indigo-50 min-h-screen">
      {/* Sidebar - always visible */}
      <div className="w-full md:w-64 md:shrink-0 border-b md:border-r border-slate-300 bg-white overflow-y-auto">
        <Sidebar />
      </div>

      {/* Page Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

/* -------------------- Sidebar -------------------- */
const Sidebar = () => {
  const [feeOpen, setFeeOpen] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: FiHome, path: "/" },
    { title: "Admissions", icon: FiBook, path: "/admissions" },
    {
      title: "Fees",
      icon: FaIndianRupeeSign,
      dropdown: [
        { title: "Hostel Fee", path: "/fee/hostel" },
        { title: "Sem Fee", path: "/fee/semester" },
        { title: "Exam Fee", path: "/fee/exam" },
        { title: "Fine", path: "/fee/fine" },
        { title: "Condonation", path: "/fee/condonation" },
      ],
    },
    { title: "Results", icon: FiClipboard, path: "/results" },
    { title: "Hall Ticket", icon: FiKey, path: "/hallticket" },
    { title: "Room Allocation", icon: FiFileText, path: "/roomallocation" },
    { title: "Room Status", icon: FiBarChart, path: "/roomstatus" },
    { title: "View All", icon: FiUsers, path: "/viewall" },
    { title: "Add Student", icon: FiUsers, path: "/addstudent" },
    { title: "Feedback", icon: FiClipboard, path: "/feedback" },
    { title: "Login", icon: FiFileText, path: "/login" },
  ];

  return (
    <nav className="p-3 space-y-1">
      {/* Logo / Title */}
      <div className="mb-3 border-b border-slate-300 pb-3 flex items-center gap-2">
        <Logo />
        <div>
          <span className="block text-xs font-semibold">ERP System</span>
          <span className="block text-xs text-slate-500">Welcome</span>
        </div>
      </div>

      {/* Menu Items */}
      {menuItems.map((item) =>
        item.dropdown ? (
          <div key={item.title}>
            <button
              onClick={() => setFeeOpen((prev) => !prev)}
              className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <div className="flex items-center gap-2">
                <item.icon className="text-lg" />
                {item.title}
              </div>
              {feeOpen ? <FiChevronDown /> : <FiChevronRight />}
            </button>
            {feeOpen && (
              <div className="ml-8 flex flex-col space-y-1 mt-1">
                {item.dropdown.map((sub) => (
                  <NavLink
                    key={sub.title}
                    to={sub.path}
                    className={({ isActive }) =>
                      `block px-2 py-1 rounded-md text-xs ${
                        isActive
                          ? "bg-indigo-100 text-indigo-800"
                          : "text-slate-600 hover:bg-slate-100"
                      }`
                    }
                  >
                    {sub.title}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ) : (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <item.icon className="text-lg" />
            {item.title}
          </NavLink>
        )
      )}
    </nav>
  );
};

/* -------------------- Logo -------------------- */
const Logo = () => (
  <div className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600">
    <img
      src="https://t4.ftcdn.net/jpg/05/23/57/61/360_F_523576164_gn6YfEv3zm2tZdR8sSzt89NmTnxdrY8d.jpg"
      alt="Logo"
      className="w-12 h-auto"
    />
  </div>
);
