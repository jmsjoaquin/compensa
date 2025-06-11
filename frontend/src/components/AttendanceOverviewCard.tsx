'use client';

import { ChartPie, CalendarDays, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AttendanceOverview({
  expectedDays = 22,
  expectedHours = 176,
  workedDays = 18,
  workedHours = 142,
}: {
  expectedDays?: number;
  expectedHours?: number;
  workedDays?: number;
  workedHours?: number;
}) {
  const percent = workedHours / expectedHours;
  const percentText = Math.round(percent * 100);

  return (
      <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-lg inline-flex">
          <ChartPie className="w-6 h-6" />
        </span>
        <h3 className="text-lg font-semibold text-gray-800">Attendance Overview</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Expected */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
          <span className="bg-blue-200 text-blue-600 p-2 rounded-full inline-flex">
            <CalendarDays className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Expected</p>
            <p className="text-base font-bold text-blue-600">
              {expectedDays} d · {expectedHours} h
            </p>
          </div>
        </div>
        {/* Worked */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
          <span className="bg-green-200 text-green-600 p-2 rounded-full inline-flex">
            <CheckCircle className="w-5 h-5" />
          </span>
          <div>
            <p className="text-xs text-gray-500">Worked</p>
            <p className="text-base font-bold text-green-600">
              {workedDays} d · {workedHours} h
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${percent * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="text-xs text-right text-gray-500">
          {percentText}% completed
        </p>
      </div>
    </div>
  );
}
