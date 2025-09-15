import React, { useState } from "react";
import jsPDF from "jspdf";

export default function Condonation() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    course: "",
    semester: "",
    condonationReason: "",
    feeAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate structured PDF
  const generateReceipt = (data) => {
    const doc = new jsPDF();
    const receiptId = "RCPT-" + Date.now();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Condonation Fee Payment Receipt", 105, 20, { align: "center" });

    // Outer border
    doc.setLineWidth(0.5);
    doc.rect(15, 30, 180, 140);

    // Receipt ID
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Receipt ID: ${receiptId}`, 20, 40);

    // Horizontal line
    doc.line(20, 45, 190, 45);

    // Student Information
    doc.setFont("helvetica", "bold");
    doc.text("Student Information", 20, 55);
    doc.setFont("helvetica", "normal");

    doc.text(`Name: ${data.studentName}`, 20, 65);
    doc.text(`Student ID: ${data.studentId}`, 20, 75);
    doc.text(`Course: ${data.course}`, 20, 85);
    doc.text(`Semester: ${data.semester}`, 20, 95);

    // Line separator
    doc.line(20, 105, 190, 105);

    // Payment Information
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, 115);
    doc.setFont("helvetica", "normal");

    doc.text(`Reason: ${data.condonationReason}`, 20, 125);
    doc.text(`Fee Amount: ₹${data.feeAmount}`, 20, 135);
    doc.text(`Payment Date: ${data.paymentDate}`, 20, 145);
    doc.text(`Payment Method: ${data.paymentMethod}`, 20, 155);

    // Success message
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text("✔ Payment Successful", 105, 170, { align: "center" });

    // Footer
    doc.setTextColor(100);
    doc.setFontSize(10);
    doc.text(
      "This is a system generated receipt. No signature required.",
      105,
      185,
      { align: "center" }
    );

    // Save PDF
    doc.save(`${data.studentId}_condonation_receipt.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log("Condonation Fee Submitted ✅", formData);

    // Simulate payment success
    setTimeout(() => {
      generateReceipt(formData); // Generate receipt
      alert("Payment Successful! Receipt downloaded.");
      setFormData({
        studentName: "",
        studentId: "",
        course: "",
        semester: "",
        condonationReason: "",
        feeAmount: "",
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
          Condonation Fee Payment
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

          {/* Condonation Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Condonation Reason
            </label>
            <input
              type="text"
              name="condonationReason"
              value={formData.condonationReason}
              onChange={handleChange}
              placeholder="Reason for Condonation"
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
              disabled={isSubmitting}
              className={`w-full md:w-1/2 p-3 rounded-xl font-medium transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? "Processing..." : "Pay Condonation Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
