// src/Pages/Dashboard.jsx
import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronDown,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiUsers,
  FiFileText,
  FiClipboard,
  FiKey,
  FiBook,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex bg-indigo-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [feeOpen, setFeeOpen] = useState(false); // Fee dropdown

  const menuItems = [
    { title: "Dashboard", icon: FiHome, path: "/" },
    { title: "Admissions", icon: FiBook, path: "/admissions" },
    {
      title: "Fee",
      icon: FiDollarSign,
      path: "/fee",
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
    { title: "Feedback", icon: FiClipboard, path: "/feedback" },
    { title: "Login", icon: FiFileText, path: "/login" },
  ];

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 relative"
      style={{ width: open ? "225px" : "fit-content" }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {menuItems.map((item) =>
          item.dropdown ? (
            <div key={item.title}>
              <motion.button
                layout
                onClick={() => setFeeOpen((prev) => !prev)}
                className="relative flex h-10 w-full items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100"
              >
                <motion.div className="grid h-full w-10 place-content-center text-lg">
                  <item.icon />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-xs font-medium flex-1 text-left"
                  >
                    {item.title}
                  </motion.span>
                )}
                {open && (
                  <motion.div className="mr-2 transition-transform">
                    {feeOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </motion.div>
                )}
              </motion.button>

              {/* Dropdown Items with animation */}
              <AnimatePresence>
                {feeOpen && open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-10 flex flex-col space-y-1 mt-1 overflow-hidden"
                  >
                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.title}
                        to={sub.path}
                        className={({ isActive }) =>
                          `relative flex h-8 items-center rounded-md pl-2 text-xs transition-colors ${
                            isActive
                              ? "bg-indigo-100 text-indigo-800"
                              : "text-slate-500 hover:bg-slate-100"
                          }`
                        }
                      >
                        {sub.title}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Option
              key={item.title}
              Icon={item.icon}
              title={item.title}
              path={item.path}
              open={open}
            />
          )
        )}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, path, open }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `relative flex h-10 w-full items-center rounded-md transition-colors ${
          isActive
            ? "bg-indigo-100 text-indigo-800"
            : "text-slate-500 hover:bg-slate-100"
        }`
      }
    >
      <motion.div layout className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}
    </NavLink>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold">ERP System (BETA)</span>
              <span className="block text-xs text-slate-500">Welcome</span>
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-2" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <img
        src="https://t4.ftcdn.net/jpg/05/23/57/61/360_F_523576164_gn6YfEv3zm2tZdR8sSzt89NmTnxdrY8d.jpg"
        alt="Logo"
        className="w-12 h-auto"
      />
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div layout className="grid size-10 place-content-center text-lg">
          <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
