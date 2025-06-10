'use client';

import React from 'react';

const salaryData = {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December', 'TOTAL'
  ],
  firstCutoffGross: [25520.94, 28356.60, 28356.60, 25520.94, 19495.16, 22685.28, 31192.26, 28356.60, 28356.60, 28356.60, 28356.60, 28356.60, 322910.78],
  firstCutoffTax: [1276.05, 1417.83, 1417.83, 1276.05, 974.76, 1134.26, 1559.61, 1417.83, 1417.83, 1417.83, 1417.83, 1417.83, 16145.54],
  firstCutoffNet: [24244.89, 26938.77, 26938.77, 24244.89, 18520.40, 21551.02, 29632.65, 26938.77, 26938.77, 26938.77, 26938.77, 26938.77, 306765.24],
  secondCutoffGross: [28356.60, 28356.60, 23485.65, 23748.65, 25520.94, 31192.26, 31192.26, 28356.60, 28356.60, 28356.60, 28356.60, 28356.60, 388099.29],
  secondCutoffTax: [1283.14, 1417.83, 1187.43, 1187.43, 1276.05, 1559.61, 1559.61, 1417.83, 1417.83, 1417.83, 1417.83, 1417.83, 16770.27],
  philhealth: [2693.88, 2835.66, 2165.28, 2463.48, 2250.81, 2693.88, 3119.23, 2835.66, 2835.66, 2835.66, 2835.66, 2835.66, 33050.50],
  secondCutoffNet: [24379.59, 24013.11, 20303.00, 20097.74, 21994.09, 26938.77, 26413.42, 24013.11, 24013.11, 24013.11, 24013.11, 24013.11, 288278.51],
  totalNetPay: [48624.48, 51041.88, 47505.02, 44242.63, 40514.49, 48489.79, 56146.07, 50951.88, 50951.88, 50951.88, 50951.88, 50951.88, 595043.76],
  totalGross: [53877.54, 56713.20, 50505.57, 49269.59, 45016.10, 53877.54, 62384.52, 56713.20, 56713.20, 56713.20, 56713.20, 56713.20, 661010.07]
};

export default function ModernSalaryTable() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Salary Summary - 2025</h1>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="min-w-[1200px] table-fixed bg-white text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-2 text-left font-semibold">Month</th>
              {salaryData.months.map((month, i) => (
                <th key={i} className="p-2 text-center font-semibold whitespace-nowrap">{month}</th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700">
            <tr className="bg-gray-100 font-semibold text-blue-600">
              <td className="p-2">1ST CUTOFF GROSS PAY</td>
              {salaryData.firstCutoffGross.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="text-red-500">
              <td className="p-2">TAX (5%)</td>
              {salaryData.firstCutoffTax.map((val, i) => (
                <td key={i} className="p-2 text-center">-{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="text-green-600 font-semibold bg-green-50">
              <td className="p-2">1ST CUTOFF NET PAY</td>
              {salaryData.firstCutoffNet.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>

            <tr className="bg-gray-100 font-semibold text-blue-600 mt-2">
              <td className="p-2">2ND CUTOFF GROSS PAY</td>
              {salaryData.secondCutoffGross.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="text-red-500">
              <td className="p-2">TAX (5%)</td>
              {salaryData.secondCutoffTax.map((val, i) => (
                <td key={i} className="p-2 text-center">-{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="text-yellow-600">
              <td className="p-2">PHILHEALTH CONTRIBUTION</td>
              {salaryData.philhealth.map((val, i) => (
                <td key={i} className="p-2 text-center">-{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="text-green-600 font-semibold bg-green-50">
              <td className="p-2">2ND CUTOFF NET PAY</td>
              {salaryData.secondCutoffNet.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>

            <tr className="font-bold text-green-700 border-t border-gray-300 bg-white">
              <td className="p-2">TOTAL NET PAY</td>
              {salaryData.totalNetPay.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>
            <tr className="font-bold text-gray-800 bg-gray-200">
              <td className="p-2">TOTAL GROSS PAY</td>
              {salaryData.totalGross.map((val, i) => (
                <td key={i} className="p-2 text-center">{val.toLocaleString()}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
