'use client';

import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="w-full bg-white/60 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-6 text-sm font-medium space-y-6 transition-all duration-300 overflow-hidden">
      {/* Header */}
      <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-lg tracking-wide">
        <i className="fa-regular fa-clock mr-2"></i>Time In / Time Out
      </p>

      {/* Date Picker */}
      <div className="w-full flex justify-center">
        <div className="flex overflow-x-auto gap-3 pb-1">
          {selectedDates.map((dateStr) => {
            const day = new Date(dateStr).getDate();
            const weekday = new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
            const isActive = activeDate === dateStr;
            return (
              <button
                key={dateStr}
                onClick={() => setActiveDate(dateStr)}
                className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                }`}
              >
                <span className="text-xs">{weekday}</span>
                <span className="font-bold">{day}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Inputs for Active Date */}
      <AnimatePresence mode="wait">
        {activeDate && (
          <motion.div
            key={activeDate}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 border-t pt-5"
          >
            <div className="text-center text-sm text-gray-600 font-semibold bg-gray-50 py-2 rounded-full shadow-sm tracking-wide">
              {format(new Date(activeDate), 'MMMM d, yyyy')}
            </div>

            {/* Time In & Time Out Fields (side by side on sm+) */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Time In */}
              <div className="flex-1 flex items-center justify-between gap-4 p-3 bg-white/60 rounded-xl shadow border border-gray-200">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <i className="fa-solid fa-sign-in-alt text-blue-500"></i> Time In
                </label>
                <input
                  type="time"
                  className="w-full sm:w-32 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  value={timeLogs[activeDate]?.timeIn || '07:00'}
                  onChange={(e) => updateTimeLog(activeDate, 'timeIn', e.target.value)}
                />
              </div>

              {/* Time Out */}
              <div className="flex-1 flex items-center justify-between gap-4 p-3 bg-white/60 rounded-xl shadow border border-gray-200">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <i className="fa-solid fa-sign-out-alt text-red-500"></i> Time Out
                </label>
                <input
                  type="time"
                  className="w-full sm:w-32 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  value={timeLogs[activeDate]?.timeOut || '04:00'}
                  onChange={(e) => updateTimeLog(activeDate, 'timeOut', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
