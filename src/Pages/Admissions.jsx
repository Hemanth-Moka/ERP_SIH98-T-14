// Pages/Admissions.jsx
import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function Admissions() {
  const [students, setStudents] = useState([]);

  // Handle Excel Upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setStudents(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admissions (Beta Version)</h1>

      {/* Upload Section */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Upload Student Excel File
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded p-2 w-full cursor-pointer"
        />
      </div>

      {/* Students Table */}
      {students.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {Object.keys(students[0]).map((key) => (
                  <th key={key} className="px-4 py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((row, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="px-4 py-2">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No data uploaded yet.</p>
      )}
    </div>
  );
}
