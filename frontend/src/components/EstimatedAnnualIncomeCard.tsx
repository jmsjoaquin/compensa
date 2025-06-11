'use client';

import CountUp from 'react-countup';

interface Props {
  dailyRate: number;
  withholdingTax: number;
  philHealth: number;
  sss: number;
  pagIbig: number;
  receivedSoFar: number; // 👈 NEW: actual received salary
}

export default function EstimatedAnnualIncomeCard({
  dailyRate,
  withholdingTax,
  philHealth,
  sss,
  pagIbig,
  receivedSoFar,
}: Props) {
  const workingDaysPerMonth = 22;
  const grossMonthly = dailyRate * workingDaysPerMonth;
  const grossAnnual = grossMonthly * 12;

  const totalTaxRate = (withholdingTax + philHealth + sss + pagIbig) / 100;
  const totalDeductions = grossAnnual * totalTaxRate;
  const netAnnual = grossAnnual - totalDeductions;

  const receivedPercentage = ((receivedSoFar / grossAnnual) * 100).toFixed(2);

  return (
    <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
        <h3 className="text-lg font-bold text-blue-800 tracking-wide">📊 Estimated Annual Income</h3>
      </div>

      {/* Income Summary */}
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Gross Annual Pay</span>
          <span className="text-base font-semibold text-gray-900">
            ₱<CountUp end={grossAnnual} duration={1.5} separator="," />
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Estimated Tax & Deductions</span>
          <span className="text-base font-semibold text-red-600">
            ₱<CountUp end={totalDeductions} duration={1.5} separator="," />
          </span>
        </div>

        <div className="border-t border-dashed pt-3 flex justify-between items-center">
          <span className="text-gray-700 font-semibold">Net Annual Pay</span>
          <span className="text-xl font-bold text-blue-700">
            ₱<CountUp end={netAnnual} duration={1.5} separator="," />
          </span>
        </div>
      </div>

      {/* Progress Bar: Received Salary vs Estimated Income */}
     <div className="pt-2">
  <div className="mb-1 text-xs font-medium text-gray-600 flex justify-between items-center">
    <span>Received So Far</span>
    <span>
      ₱{receivedSoFar.toLocaleString()} / ₱{netAnnual.toLocaleString()}
    </span>
  </div>

  <span
    title={`₱${receivedSoFar.toLocaleString()} / ₱${netAnnual.toLocaleString()}`}
    className="block w-full"
  >
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full transition-all duration-1000 ease-in-out"
        style={{ width: `${(receivedSoFar / netAnnual) * 100}%` }}
      />
    </div>
  </span>
</div>
    </div>
  );
}
