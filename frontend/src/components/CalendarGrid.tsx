'use client';

import { format } from 'date-fns';

type Props = {
  currentMonthDates: Date[];
  selectedDates: string[];
  toggleDate: (date: Date) => void;
  onSelectCutoffRange: (cutoff: '1st' | '2nd' | 'all') => void;
  viewMonth: number;
  viewYear: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function CalendarGrid({
  currentMonthDates,
  selectedDates,
  toggleDate,
  onSelectCutoffRange,
  viewMonth,
  viewYear,
  onPrevMonth,
  onNextMonth,
}: Props) {
  if (currentMonthDates.length === 0) return null;

  const firstDay = currentMonthDates[0];
  const weekdayIndex = firstDay.getDay();

  return (
    <div className="w-full bg-white/60 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl p-6 text-sm font-medium space-y-6 transition-all duration-300 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={onPrevMonth}
          className="text-sm text-blue-600 underline"
        >
          ← Prev
        </button>

        <span className="font-semibold text-gray-800 text-base">
          {new Date(viewYear, viewMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>

        <button
          onClick={onNextMonth}
          className="text-sm text-blue-600 underline"
        >
          Next →
        </button>
      </div>

      {/* Cutoff Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => onSelectCutoffRange('1st')}
          className="px-3 py-1 text-xs rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          1st Cutoff (1–15)
        </button>
        <button
          onClick={() => onSelectCutoffRange('2nd')}
          className="px-3 py-1 text-xs rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          2nd Cutoff (16–end)
        </button>
        <button
          onClick={() => onSelectCutoffRange('all')}
          className="px-3 py-1 text-xs rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          Whole Month
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 text-xs text-center text-gray-400 font-medium mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 min-w-[420px]">
          {[...Array(weekdayIndex)].map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {currentMonthDates.map((date) => {
            const formatted = format(date, 'yyyy-MM-dd');
            const isSelected = selectedDates.includes(formatted);
            const day = date.getDate();
            const label = day <= 15 ? '1st' : '2nd';

            return (
              <button
                key={formatted}
                onClick={() => toggleDate(date)}
                className={`relative p-2 rounded-lg text-sm border transition-all duration-150
                  ${isSelected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {day}
                <span className="absolute top-0 right-1 text-[10px] text-gray-400">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
