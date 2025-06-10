'use client';

import { format } from 'date-fns';

interface TimeLogCardProps {
  selectedDates: string[];
  timeLogs: Record<string, { timeIn: string; timeOut: string }>;
  updateTimeLog: (date: string, field: 'timeIn' | 'timeOut', value: string) => void;
  activeDate: string | null;
  setActiveDate: (date: string) => void;
}

export default function TimeLogCard({
  selectedDates,
  timeLogs,
  updateTimeLog,
  activeDate,
  setActiveDate,
}: TimeLogCardProps) {
  return (
    <div className="w-1/2 col-span-1 bg-white rounded-3xl shadow-xl  p-6 text-sm font-medium space-y-6 transition-all duration-300">
    {/* <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-6 text-sm font-medium transition-all duration-300"> */}
  <p className="text-center text-blue-700 font-bold text-base tracking-wide">
    <i className="fa-regular fa-clock mr-2"></i>Time In / Time Out
  </p>

  {/* Date Selection */}
  <div className="flex flex-wrap gap-2 justify-center">
    {selectedDates.map((dateStr) => {
      const day = new Date(dateStr).getDate();
      const isActive = activeDate === dateStr;

      return (
        <button
          key={dateStr}
          onClick={() => setActiveDate(dateStr)}
          className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all duration-200 border ${
            isActive
              ? 'bg-blue-600 text-white shadow border-blue-600'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-100 border-gray-200'
          }`}
        >
          {day}
        </button>
      );
    })}
  </div>

  {/* Active Date Display */}
  {activeDate && (
    <div className="space-y-4 border-t pt-5">
      <div className="text-center text-sm text-gray-600 font-semibold bg-gray-50 py-2 rounded-full shadow-sm tracking-wide">
        {format(new Date(activeDate), 'MMMM d, yyyy')}
      </div>

      {/* Time In */}
      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 text-gray-600">
          <i className="fa-solid fa-sign-in-alt text-blue-500"></i> Time In
        </label>
        <input
          type="time"
          className="w-auto rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={timeLogs[activeDate]?.timeIn || '07:00'}
          onChange={(e) => updateTimeLog(activeDate, 'timeIn', e.target.value)}
        />
      </div>

      {/* Time Out */}
      <div className="flex items-center justify-between px-1">
        <label className="flex items-center gap-2 text-gray-600">
          <i className="fa-solid fa-sign-out-alt text-red-500"></i> Time Out
        </label>
        <input
          type="time"
          className="w-auto rounded-xl border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={timeLogs[activeDate]?.timeOut || '04:00'}
          onChange={(e) => updateTimeLog(activeDate, 'timeOut', e.target.value)}
        />
      </div>
    </div>
  )}
</div>
  );
}
