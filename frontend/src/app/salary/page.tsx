'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
const initialData = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'TOTAL'
  ],
  firstCutoffGross: [25520.94, 28356.60, 28356.60, 25520.94, 19495.16, 22685.28, 31192.26, 28356.60, 28356.60, 28356.60, 28356.60, 28356.60, 322910.78],
  firstCutoffNet: [24244.89, 26938.77, 26938.77, 24244.89, 18520.40, 21551.02, 29632.65, 26938.77, 26938.77, 26938.77, 26938.77, 26938.77, 306765.24],
  secondCutoffGross: [28356.60, 28356.60, 23485.65, 23748.65, 25520.94, 31192.26, 31192.26, 28356.60, 28356.60, 28356.60, 28356.60, 28356.60, 388099.29],
  secondCutoffNet: [24379.59, 24013.11, 20303.00, 20097.74, 21994.09, 26938.77, 26413.42, 24013.11, 24013.11, 24013.11, 24013.11, 24013.11, 288278.51],
  taxFirst: [1276.05, 1417.83, 1417.83, 1276.05, 974.76, 1134.26, 1559.61, 1417.83, 1417.83, 1417.83, 1417.83, 1417.83, 16145.54],
  taxSecond: [1283.14, 1417.83, 1187.43, 1187.43, 1276.05, 1559.61, 1559.61, 1417.83, 1417.83, 1417.83, 1417.83, 1417.83, 16770.27],
  philhealth: [2693.88, 2835.66, 2165.28, 2463.48, 2250.81, 2693.88, 3119.23, 2835.66, 2835.66, 2835.66, 2835.66, 2835.66, 33050.50],
};

export default function EditableSalaryTable() {
  const [editableData, setEditableData] = useState(initialData);

  const handleValueChange = (
    key: 'firstCutoffGross' | 'firstCutoffNet' | 'secondCutoffGross' | 'secondCutoffNet',
    index: number,
    value: string
  ) => {
    const updated = { ...editableData };
    updated[key][index] = parseFloat(value) || 0;
    setEditableData(updated);
  };

  const renderEditableRow = (label: string, key: keyof typeof editableData, className = '') => (
    <tr className={className}>
      <td className="p-2 font-medium sticky left-0 bg-white z-10">{label}</td>
      {editableData[key].map((val, i) => (
        <td key={i} className="p-2 text-center">
          <input
            type="text"
            step="0.01"
            value={val}
            onChange={(e) => handleValueChange(key, i, e.target.value)}
            className="w-28 px-2 py-1 text-sm text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </td>
      ))}
    </tr>
  );

  const renderStaticRow = (label: string, key: keyof typeof editableData, className = '', prefix = '') => (
    <tr className={className}>
      <td className="p-2 font-medium sticky left-0 bg-white z-10">{label}</td>
      {editableData[key].map((val, i) => (
        <td key={i} className="p-2 text-center">{prefix}{val.toLocaleString()}</td>
      ))}
    </tr>
  );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-100 overflow-hidden">
          <div className="flex-1 flex justify-center px-4 py-6 overflow-auto">
            <div className="w-full max-w-screen-xl flex flex-col space-y-6 min-h-0">
          <Navbar /> {/* ✅ Add the navbar at the top */}
          <div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full flex-shrink-0">
                        <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
                        </div>
                        <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
                        </div>
                        <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
                        </div>
                        <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
                        </div>
                      </div>
          </div>
      {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Salary Summary</h1> */}

      <div className="overflow-auto border border-gray-300 rounded-2xl shadow-sm bg-white">
        <table className="min-w-[1200px] table-fixed text-sm">
          <thead className="bg-blue-700 text-white sticky top-0 z-20">
            <tr>
              <th className="p-3 sticky left-0 bg-blue-700 text-left">Month</th>
              {editableData.months.map((m, i) => (
                <th key={i} className="p-3 text-center">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={editableData.months.length + 1} className="bg-gray-200 text-center text-sm font-semibold text-gray-700 py-2">1ST CUTOFF</td></tr>
            {renderEditableRow("1ST CUTOFF GROSS PAY", "firstCutoffGross", "bg-blue-50 text-blue-700 font-semibold")}
            {renderStaticRow("TAX (5%)", "taxFirst", "text-red-600", '-')}
            {renderEditableRow("1ST CUTOFF NET PAY", "firstCutoffNet", "bg-green-50 text-green-700 font-semibold")}
            <tr><td colSpan={editableData.months.length + 1} className="bg-gray-200 text-center text-sm font-semibold text-gray-700 py-2">2ND CUTOFF</td></tr>
            {renderEditableRow("2ND CUTOFF GROSS PAY", "secondCutoffGross", "bg-blue-50 text-blue-700 font-semibold")}
            {renderStaticRow("TAX (5%)", "taxSecond", "text-red-600", '-')}
            {renderStaticRow("PHILHEALTH CONTRIBUTION", "philhealth", "text-yellow-600", '-')}
            {renderEditableRow("2ND CUTOFF NET PAY", "secondCutoffNet", "bg-green-50 text-green-700 font-semibold")}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
}
