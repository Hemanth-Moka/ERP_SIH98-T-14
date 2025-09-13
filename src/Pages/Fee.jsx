import React, { useState, useEffect } from 'react';

// Fee.jsx
// Light-blue theme with Razorpay integration

export default function Fee() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch('/api/students/fees'); // replace with your API
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  async function loadRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePay(student) {
    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: student.balance * 100, studentId: student.id }),
    });
    const data = await res.json();

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: data.amount,
      currency: data.currency,
      name: 'College ERP',
      description: `Fee payment for ${student.name}`,
      order_id: data.id,
      handler: async function (response) {
        await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...response, studentId: student.id }),
        });
        alert('Payment Successful');
      },
      prefill: {
        name: student.name,
        contact: student.contact,
        email: student.email || '',
      },
      theme: { color: '#0284c7' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  if (loading) return <div className="p-6 text-sky-900">Loading students...</div>;

  return (
    <div className="min-h-screen p-6 bg-sky-50 text-sky-900">
      <h1 className="text-2xl font-bold mb-4">Student Fee Management</h1>
      <table className="w-full border-collapse border border-sky-200 bg-white rounded shadow">
        <thead className="bg-sky-200 text-sky-900">
          <tr>
            <th className="p-2 border border-sky-300">ID</th>
            <th className="p-2 border border-sky-300">Name</th>
            <th className="p-2 border border-sky-300">Class</th>
            <th className="p-2 border border-sky-300">Roll</th>
            <th className="p-2 border border-sky-300">Total Fee</th>
            <th className="p-2 border border-sky-300">Balance</th>
            <th className="p-2 border border-sky-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-sky-100">
              <td className="p-2 border border-sky-300">{s.id}</td>
              <td className="p-2 border border-sky-300">{s.name}</td>
              <td className="p-2 border border-sky-300">{s.class}</td>
              <td className="p-2 border border-sky-300">{s.roll}</td>
              <td className="p-2 border border-sky-300">₹{s.totalFee}</td>
              <td className="p-2 border border-sky-300">₹{s.balance}</td>
              <td className="p-2 border border-sky-300">
                <button onClick={() => handlePay(s)} className="px-3 py-1 rounded bg-sky-600 text-white">Pay Now</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
