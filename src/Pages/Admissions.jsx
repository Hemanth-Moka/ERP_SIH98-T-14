import React, { useState, useEffect } from "react";

export default function Admissions() {
  const [students, setStudents] = useState([]);
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbyJg1qHsU8Ac6S3Y5qz6sULuxnfoTENXx2924P1BNG2UnuG0y6TjkuLigPvuYdUOtF3/exec";

  // Fetch data on component mount and every 10 seconds for "live updates"
  useEffect(() => {
    const fetchData = () => {
      fetch(SHEET_URL)
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
        })
        .catch((err) => console.error("Error fetching data:", err));
    };

    fetchData(); // initial load
    const interval = setInterval(fetchData, 10000); // repeat every 10s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admissions (Live Form Data)</h1>
      {students.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {Object.keys(students[0]).map((key) => (
                  <th key={key} className="px-4 py-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="px-4 py-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No responses yet.</p>
      )}
    </div>
  );
}
