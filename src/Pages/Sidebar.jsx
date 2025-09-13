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
} from "react-icons/fi";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { title: "Dashboard", icon: FiHome, path: "/" },
    { title: "Profile", icon: FiUsers, path: "/profile" },
    { title: "Admissions", icon: FiBook, path: "/admissions" },
    { title: "Fee", icon: FiDollarSign, path: "/fee" },
    { title: "Results", icon: FiClipboard, path: "/results" },
    { title: "Hall Ticket", icon: FiKey, path: "/hallticket" },
    { title: "Hostel Room Allocation", icon: FiFileText, path: "/roomallocation" },
    { title: "Hostel Room Status", icon: FiBarChart, path: "/roomstatus" },
    { title: "Feedback", icon: FiClipboard, path: "/feedback" },
    { title: "View All", icon: FiUsers, path: "/viewall" },
  ];

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Option
            key={item.title}
            Icon={item.icon}
            title={item.title}
            path={item.path}
            open={open}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

export default Sidebar;

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
      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg"
      >
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
              <span className="block text-xs font-semibold">ERP System</span>
              <span className="block text-xs text-slate-500">Admin Panel</span>
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
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"></path>
        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"></path>
      </svg>
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
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
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
