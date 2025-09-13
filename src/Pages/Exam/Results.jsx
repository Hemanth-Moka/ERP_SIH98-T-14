import React from "react";
import { FiClock } from "react-icons/fi";

export default function Results() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center border-t-4 border-blue-600">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FiClock className="text-blue-600 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-blue-700 mb-3">
          Results
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-2">
          Results will be updated soon.
        </p>
        <p className="text-gray-400 text-sm">
          Please check back later for the latest updates.
        </p>

        {/* Optional placeholder button */}
        <button
          disabled
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium cursor-not-allowed opacity-70"
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
}
