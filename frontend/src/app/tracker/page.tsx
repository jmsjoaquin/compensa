// src/app/tracker/page.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

const DAILY_TAX_PERCENTAGE = 0.05;

export default function SalaryTrackerPage() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentMonthDates = Array.from({ length: daysInMonth }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));

  const [period, setPeriod] = useState("bimonthly");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [timeLogs, setTimeLogs] = useState<{ [date: string]: { timeIn: string; timeOut: string } }>({});
  const [showTimeEditor, setShowTimeEditor] = useState(false);

  const getWeekdaysInCurrentCutoff = () => {
    return currentMonthDates
      .filter(date => {
        const dateNum = date.getDate();
        const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
        const isInCutoff = today.getDate() <= 15 ? dateNum <= 15 : dateNum > 15;
        return isWeekday && isInCutoff;
      })
      .map(date => format(date, "yyyy-MM-dd"));
  };

  useEffect(() => {
    const weekdays = getWeekdaysInCurrentCutoff();
    setSelectedDates(weekdays);
    const defaultLogs: { [date: string]: { timeIn: string; timeOut: string } } = {};
    weekdays.forEach(date => {
      defaultLogs[date] = { timeIn: "07:00", timeOut: "16:00" };
    });
    setTimeLogs(defaultLogs);
  }, []);

  const toggleDate = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    if (selectedDates.includes(formatted)) {
      setSelectedDates(selectedDates.filter(d => d !== formatted));
      const updatedLogs = { ...timeLogs };
      delete updatedLogs[formatted];
      setTimeLogs(updatedLogs);
    } else {
      setSelectedDates([...selectedDates, formatted]);
      setTimeLogs({
        ...timeLogs,
        [formatted]: { timeIn: "07:00", timeOut: "16:00" },
      });
    }
  };

  const updateTime = (date: string, field: "timeIn" | "timeOut", value: string) => {
    setTimeLogs({
      ...timeLogs,
      [date]: {
        ...timeLogs[date],
        [field]: value
      }
    });
  };

  const computeWorkedMinutes = (timeIn: string, timeOut: string) => {
  if (!timeIn || !timeOut) return 0;

  try {
    const inDate = new Date(`1970-01-01T${timeIn}:00`);
    const outDate = new Date(`1970-01-01T${timeOut}:00`);

    if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) return 0;

    const diffMs = outDate.getTime() - inDate.getTime();
    const totalHours = diffMs / (1000 * 60 * 60);
    const adjusted = Math.max(0, Math.min(totalHours - 1, 8));
    return adjusted * 60;
  } catch {
    return 0;
  }
};

  const totalMinutes = selectedDates.reduce((sum, date) => {
    const log = timeLogs[date];
    if (!log) return sum;
    return sum + computeWorkedMinutes(log.timeIn, log.timeOut);
  }, 0);

  const hourlyRate = dailyRate / 8;
  const grossPay = selectedDates.reduce((sum, date) => {
    const log = timeLogs[date];
    if (!log) return sum;
    const minutes = computeWorkedMinutes(log.timeIn, log.timeOut);
    return sum + (minutes / 60) * hourlyRate;
  }, 0);

  const tax = grossPay * DAILY_TAX_PERCENTAGE;
  const netPay = grossPay - tax;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗓 Salary Tracker</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            const weekdays = getWeekdaysInCurrentCutoff();
            setSelectedDates(weekdays);
            const defaultLogs: { [date: string]: { timeIn: string; timeOut: string } } = {};
            weekdays.forEach(date => {
              defaultLogs[date] = { timeIn: "07:00", timeOut: "16:00" };
            });
            setTimeLogs(defaultLogs);
          }}
          className="text-blue-500 underline"
        >
          Reset to Weekday Cutoff
        </button>

        <button
          onClick={() => setShowTimeEditor(!showTimeEditor)}
          className="text-blue-600 underline text-sm"
        >
          {showTimeEditor ? "Hide Time Editors" : "Show Time Editors"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {currentMonthDates.map((date) => {
          const formatted = format(date, "yyyy-MM-dd");
          const isSelected = selectedDates.includes(formatted);
          const day = date.getDate();
          const label = day <= 15 ? "1st" : "2nd";

          return (
            <button
              key={formatted}
              onClick={() => toggleDate(date)}
              className={`relative p-2 rounded-lg text-sm border transition-all duration-150
                ${isSelected ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {day}
              <span className="absolute top-0 right-1 text-[10px] text-gray-400">{label}</span>
            </button>
          );
        })}
      </div>

      {showTimeEditor && (
        <div className="space-y-3">
          {selectedDates.map(date => (
            <div key={date} className="border rounded bg-gray-50 p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">📅 {date}</span>
              </div>
              <div className="mt-2 flex gap-4">
                <label className="flex flex-col">
                  Time In
                  <input
                    type="time"
                    value={timeLogs[date]?.timeIn || ""}
                    onChange={(e) => updateTime(date, "timeIn", e.target.value)}
                    className="border p-2 rounded"
                  />
                </label>
                <label className="flex flex-col">
                  Time Out
                  <input
                    type="time"
                    value={timeLogs[date]?.timeOut || ""}
                    onChange={(e) => updateTime(date, "timeOut", e.target.value)}
                    className="border p-2 rounded"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="block mb-2 font-medium mt-6">💰 Daily Rate (₱):</label>
      <input
        type="number"
        value={dailyRate || ""}
        onChange={(e) => setDailyRate(parseFloat(e.target.value) || 0)}
        className="border p-2 rounded w-full mb-6"
        placeholder="e.g. 800"
      />

      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <p>✅ Days Worked: <strong>{selectedDates.length}</strong></p>
        <p>⏱ Total Minutes: <strong>{totalMinutes}</strong></p>
        <p>💸 Gross Pay: ₱{grossPay.toFixed(2)}</p>
        <p>🧾 Tax (5%): ₱{tax.toFixed(2)}</p>
        <p>🟢 Net Pay: ₱{netPay.toFixed(2)}</p>
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => console.log({ selectedDates, timeLogs, dailyRate, grossPay, tax, netPay })}
      >
        Submit Salary Record
      </button>
    </div>
  );
}