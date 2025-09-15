import React, { useState } from "react";
import { jsPDF } from "jspdf";

export default function ExamFee() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    examName: "",
    semester: "",
    feeAmount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [receiptId, setReceiptId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Generate a random receipt ID
  const generateReceiptId = () => {
    return "REC-" + Math.floor(100000 + Math.random() * 900000);
  };

  // Generate PDF Receipt
  const generatePDF = (data, id) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Exam Fee Payment Receipt", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Receipt ID: ${id}`, 20, 40);
    doc.text(`Student Name: ${data.studentName}`, 20, 50);
    doc.text(`Student ID: ${data.studentId}`, 20, 60);
    doc.text(`Exam Name: ${data.examName}`, 20, 70);
    doc.text(`Semester: ${data.semester}`, 20, 80);
    doc.text(`Fee Amount: ₹${data.feeAmount}`, 20, 90);
    doc.text(`Payment Date: ${data.paymentDate}`, 20, 100);
    doc.text(`Payment Method: ${data.paymentMethod}`, 20, 110);

    doc.text("✅ Payment Successful", 20, 130);
    doc.text("This is a system-generated receipt.", 20, 140);

    doc.save(`${id}_ExamFeeReceipt.pdf`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Fee Submitted", formData);

    // Generate receipt ID
    const newReceiptId = generateReceiptId();

    // Store submitted data
    setSubmittedData(formData);
    setReceiptId(newReceiptId);

    // Auto-generate PDF
    generatePDF(formData, newReceiptId);

    // Reset form
    setFormData({
      studentName: "",
      studentId: "",
      examName: "",
      semester: "",
      feeAmount: "",
      paymentDate: "",
      paymentMethod: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4 space-y-8">
      <div className="bg-white shadow-2xl p-8 w-full max-w-4xl rounded-xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Exam Fee Payment
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

          {/* Exam Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Exam Name
            </label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              placeholder="Exam Name"
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

      {/* Receipt Preview */}
      {submittedData && (
        <div className="bg-white shadow-2xl p-8 w-full max-w-3xl rounded-xl">
          <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
            ✅ Payment Receipt
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Receipt ID:</span> {receiptId}
            </p>
            <p>
              <span className="font-semibold">Student Name:</span>{" "}
              {submittedData.studentName}
            </p>
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {submittedData.studentId}
            </p>
            <p>
              <span className="font-semibold">Exam Name:</span>{" "}
              {submittedData.examName}
            </p>
            <p>
              <span className="font-semibold">Semester:</span>{" "}
              {submittedData.semester}
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
