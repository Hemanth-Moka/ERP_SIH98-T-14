import React, { useState } from "react";

export default function SemFee() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    semester: "",
    course: "",
    feeAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Semester Fee Submitted", formData);

    // Save submitted data for receipt
    setSubmittedData(formData);

    // Reset form
    setFormData({
      studentName: "",
      studentId: "",
      semester: "",
      course: "",
      feeAmount: "",
      paymentDate: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 space-y-8">
      <div className="bg-white shadow-2xl p-8 w-full max-w-4xl rounded-xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Semester Fee Payment
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Student ID
            </label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="ID Number"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Semester
            </label>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              placeholder="e.g. 5th Semester"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course Name"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Fee Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Fee Amount
            </label>
            <input
              type="number"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleChange}
              placeholder="₹0.00"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Payment Date
            </label>
            <input
              type="date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="online">Online / Razorpay</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Pay Fee
            </button>
          </div>
        </form>
      </div>

      {/* Receipt */}
      {submittedData && (
        <div className="bg-white shadow-2xl p-8 w-full max-w-3xl rounded-xl">
          <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
            ✅ Payment Receipt
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Student Name:</span>{" "}
              {submittedData.studentName}
            </p>
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {submittedData.studentId}
            </p>
            <p>
              <span className="font-semibold">Semester:</span>{" "}
              {submittedData.semester}
            </p>
            <p>
              <span className="font-semibold">Course:</span>{" "}
              {submittedData.course}
            </p>
            <p>
              <span className="font-semibold">Fee Amount:</span> ₹
              {submittedData.feeAmount}
            </p>
            <p>
              <span className="font-semibold">Payment Date:</span>{" "}
              {submittedData.paymentDate}
            </p>
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              {submittedData.paymentMethod}
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            This is a system-generated receipt.
          </p>
        </div>
      )}
    </div>
  );
}
