import React, { useState } from "react";

export default function Roomallocation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    // ✅ Use your new Apps Script deployment URL here
    const trackingUrl = `https://script.google.com/macros/s/AKfycbyt03zmn8AWZ1yT75xw0IZQlZfsSmv8o9_IaYVgvfcEbyXrxz4_jSDMJpE-46yuQYdE/exec?email=${encodeURIComponent(
      email
    )}&name=${encodeURIComponent(name)}`;

    // Send ping to Apps Script (avoids CORS issues)
    const img = new Image();
    img.src = trackingUrl;

    alert("✅ Form link has been sent to your email!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Room Allocation</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-72 mb-4"
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-72 mb-4"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
      >
        Get Form
      </button>
    </div>
  );
}
