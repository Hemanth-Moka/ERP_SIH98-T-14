import React, { useState } from "react";
import { jsPDF } from "jspdf"; // For PDF receipt

export default function Hostelfee() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    roomNumber: "",
    hostelName: "",
    feeAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate Receipt PDF
  const generateReceipt = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Hostel Fee Payment Receipt", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Student Name: ${formData.studentName}`, 20, 40);
    doc.text(`Student ID: ${formData.studentId}`, 20, 50);
    doc.text(`Hostel Name: ${formData.hostelName}`, 20, 60);
    doc.text(`Room Number: ${formData.roomNumber}`, 20, 70);
    doc.text(`Fee Amount: ₹${formData.feeAmount}`, 20, 80);
    doc.text(`Payment Date: ${formData.paymentDate}`, 20, 90);
    doc.text(`Payment Method: ${formData.paymentMethod}`, 20, 100);

    doc.text("✅ Payment Successful", 20, 120);

    doc.save("HostelFeeReceipt.pdf");
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);

    if (formData.paymentMethod === "online") {
      const options = {
        key: "rzp_test_1234567890", // Replace with your Razorpay Key ID
        amount: formData.feeAmount * 100, // Amount in paise
        currency: "INR",
        name: "KL University",
        description: "Hostel Fee Payment",
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          generateReceipt();
        },
        prefill: {
          name: formData.studentName,
          email: "student@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#1D4ED8",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Payment Successful via " + formData.paymentMethod);
      generateReceipt();
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Hostel Fee Payment
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

          {/* Hostel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Hostel Name
            </label>
            <input
              type="text"
              name="hostelName"
              value={formData.hostelName}
              onChange={handleChange}
              placeholder="Hostel Name"
              required
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="Room Number"
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

          {/* Submit */}
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
    </div>
  );
}
