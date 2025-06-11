'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar'; // ✅ Make sure this path is correct

export default function ProfilePage() {
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [withholdingTax, setWithholdingTax] = useState<number>(5);

  const [govDeductions, setGovDeductions] = useState([
    { name: 'PhilHealth', rate: 3 },
    { name: 'SSS', rate: 4.5 },
    { name: 'Pag-IBIG', rate: 2 },
  ]);

  const handleGovDeductionChange = (
    index: number,
    key: 'name' | 'rate',
    value: string | number
  ) => {
    const updated = [...govDeductions];
    updated[index][key] = key === 'rate' ? Number(value) : value;
    setGovDeductions(updated);
  };

  const addGovDeduction = () => {
    setGovDeductions([...govDeductions, { name: '', rate: 0 }]);
  };

  const removeGovDeduction = (index: number) => {
    const updated = [...govDeductions];
    updated.splice(index, 1);
    setGovDeductions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      dailyRate,
      withholdingTax,
      governmentDeductions: govDeductions,
    };
    console.log(payload);
    // TODO: send to backend
  };

  return (
   <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-100 overflow-hidden">
      <div className="flex-1 flex justify-center px-4 py-6 overflow-auto">
        <div className="w-full max-w-screen-xl flex flex-col space-y-6 min-h-0">
      <Navbar /> {/* ✅ Add the navbar at the top */}
      
      <div className="flex-1 flex justify-center p-6 overflow-auto">
        <div className="bg-white shadow-xl rounded-3xl w-full max-w-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-600">User Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Daily Rate */}
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-gray-700 w-32">Daily Rate (₱)</label>
              <input
                type="number"
                className="w-40 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1 px-2"
                value={dailyRate}
                onChange={(e) => setDailyRate(Number(e.target.value))}
                required
              />
            </div>

            {/* Withholding Tax */}
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium text-gray-700 w-32">Withholding Tax (%)</label>
              <input
                type="number"
                className="w-40 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1 px-2"
                value={withholdingTax}
                onChange={(e) => setWithholdingTax(Number(e.target.value))}
                required
              />
            </div>

            {/* Government Deductions */}
            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold text-gray-700">Government Deductions</p>
              {govDeductions.map((deduction, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Name"
                    className="flex-1 rounded-lg border-gray-300 py-1 px-2"
                    value={deduction.name}
                    onChange={(e) =>
                      handleGovDeductionChange(index, 'name', e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="%"
                    className="w-24 rounded-lg border-gray-300 py-1 px-2 text-right"
                    value={deduction.rate}
                    onChange={(e) =>
                      handleGovDeductionChange(index, 'rate', e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeGovDeduction(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addGovDeduction}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                + Add Government Deduction
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
