// src/Pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeftCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 px-6">
      <div className="text-center">
        {/* Big 404 */}
        <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-slate-600 text-lg max-w-md mx-auto">
          Sorry, the page you’re looking for doesn’t exist, has been moved, or
          is under maintenance.  
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            <FiHome size={20} />
            Go to Dashboard
          </Link>
          <Link
            to={-1}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium shadow hover:bg-slate-100 transition"
          >
            <FiArrowLeftCircle size={20} />
            Go Back
          </Link>
        </div>
      </div>

{/* 
      <div className="mt-12">
        <img
          src="https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-error-404-page-not-found-png-image_3832696.jpg"
          alt="Not Found Illustration"
          className="w-72 sm:w-96"
        />
      </div> */}
    </div>
  );
}
