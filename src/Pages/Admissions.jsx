import React, { useState, useEffect } from "react";

export default function Admissions() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbyJg1qHsU8Ac6S3Y5qz6sULuxnfoTENXx2924P1BNG2UnuG0y6TjkuLigPvuYdUOtF3/exec";

  const fetchData = () => {
    setLoading(true);
    fetch(SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000000);
    return () => clearInterval(interval);
  }, []);

  // Export Excel (simple CSV download for now)
  const exportExcel = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [Object.keys(students[0]).join(","), ...students.map((s) => Object.values(s).join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "admissions_data.csv";
    link.click();
  };

  // Export PDF (simple print for now)
  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b pb-4 gap-3">
          <h1 className="text-2xl font-bold text-indigo-700">
           Admissions – Live Data FORM FLOTED FORM
          </h1>
          <div className="flex gap-2">
            <button
              onClick={exportPDF}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Backup PDF
            </button>
            <button
              onClick={exportExcel}
              className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Export Excel
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Loading Animation */}
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md"
              ></div>
            ))}
            <p className="text-gray-400 text-center mt-6">Loading data...</p>
          </div>
        ) : students.length > 0 ? (
          /* Table */
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  {Object.keys(students[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-3 font-medium border-r last:border-none"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50 even:bg-gray-50 transition"
                  >
                    {Object.values(row).map((value, i) => (
                      <td
                        key={i}
                        className="px-4 py-3 border-r last:border-none text-gray-700"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No admissions data yet.
          </p>
        )}
      </div>
    </div>
  );
}
