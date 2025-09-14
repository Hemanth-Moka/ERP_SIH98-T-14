import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Fine() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    fineReason: "",
    fineAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate PDF Receipt
  const generateReceipt = (data) => {
    const doc = new jsPDF();
    const receiptId = "FINE-" + Date.now();

    doc.setFontSize(16);
    doc.text("Fine Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Receipt ID: ${receiptId}`, 20, 35);
    doc.text(`Student Name: ${data.studentName}`, 20, 45);
    doc.text(`Student ID: ${data.studentId}`, 20, 55);
    doc.text(`Fine Reason: ${data.fineReason}`, 20, 65);
    doc.text(`Fine Amount: ₹${data.fineAmount}`, 20, 75);
    doc.text(`Payment Date: ${data.paymentDate}`, 20, 85);
    doc.text(`Payment Method: ${data.paymentMethod}`, 20, 95);

    doc.text("✔ Payment Successful", 20, 115);

    doc.save(`${data.studentId}_fine_receipt.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("Fine Payment Submitted ✅", formData);

    // Simulate payment success
    setTimeout(() => {
      generateReceipt(formData); // generate PDF receipt
      alert("Fine payment successful! Receipt downloaded.");

      // Reset form
      setFormData({
        studentName: "",
        studentId: "",
        fineReason: "",
        fineAmount: "",
        paymentDate: "",
        paymentMethod: "",
      });

      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl p-8 w-full max-w-4xl rounded-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Fine Payment
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

          {/* Fine Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Fine Reason
            </label>
            <input
              type="text"
              name="fineReason"
              value={formData.fineReason}
              onChange={handleChange}
              placeholder="Reason for Fine"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Fine Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Fine Amount
            </label>
            <input
              type="number"
              name="fineAmount"
              value={formData.fineAmount}
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
              disabled={isSubmitting}
              className={`w-full md:w-1/2 p-3 rounded-xl font-medium transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? "Processing..." : "Pay Fine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
