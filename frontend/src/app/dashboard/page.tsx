'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CalendarGrid from '@/components/CalendarGrid';
import NetPayCard from '@/components/NetPayCard';
import QuarterlyTaxSummaryCard from '@/components/QuarterlySummaryCard';
import AttendanceOverview from '@/components/AttendanceOverviewCard';
import TimeLogCard from '@/components/TimeLogCard';

export default function DashboardPage() {
  const today = new Date();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedQuarter, setSelectedQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>(getCurrentQuarter());
  const [currentCutoff, setCurrentCutoff] = useState<'first' | 'second'>(
    new Date().getDate() <= 15 ? 'first' : 'second'
  );
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [timeLogs, setTimeLogs] = useState<Record<string, { timeIn: string; timeOut: string }>>({});
  const [activeCutoffButton, setActiveCutoffButton] = useState<'1st' | '2nd' | 'all'>('1st');

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const currentMonthDates = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(viewYear, viewMonth, i + 1)
  );

  useEffect(() => {
    handleSelectCutoffRange('1st');
  }, [viewMonth, viewYear]);

  const toggleDate = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    if (selectedDates.includes(formatted)) {
      setSelectedDates(selectedDates.filter((d) => d !== formatted));
    } else {
      const updated = [...selectedDates, formatted].sort((a, b) =>
        new Date(a).getTime() - new Date(b).getTime()
      );
      setSelectedDates(updated);
    }
  };

  function getCurrentQuarter(): 'Q1' | 'Q2' | 'Q3' | 'Q4' {
    const month = today.getMonth();
    if (month < 3) return 'Q1';
    if (month < 6) return 'Q2';
    if (month < 9) return 'Q3';
    return 'Q4';
  }

  const handleSelectCutoffRange = (cutoff: '1st' | '2nd' | 'all') => {
    setActiveCutoffButton(cutoff);
    const filteredDates = currentMonthDates.filter(date => {
      const day = date.getDate();
      const isWeekday = date.getDay() !== 0 && date.getDay() !== 6;
      if (!isWeekday) return false;
      if (cutoff === '1st') return day <= 15;
      if (cutoff === '2nd') return day > 15;
      return true;
    });
    const formatted = filteredDates.map(date => format(date, 'yyyy-MM-dd'));
    setSelectedDates(formatted);

    const todayStr = format(today, 'yyyy-MM-dd');
    setActiveDate(formatted.includes(todayStr) ? todayStr : null);
  };

  const updateTimeLog = (date: string, type: 'timeIn' | 'timeOut', value: string) => {
    setTimeLogs((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        [type]: value,
      },
    }));
  };
  const dummyQuarterData = {
  Q1: { label: 'January – March', gross: 120000, tax5: 6000, net: 114000 },
  Q2: { label: 'April – June', gross: 150000, tax5: 7500, net: 142500 },
  Q3: { label: 'July – September', gross: 130000, tax5: 6500, net: 123500 },
  Q4: { label: 'October – December', gross: 140000, tax5: 7000, net: 133000 }
};


  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-100">
      <div className="mx-auto flex flex-col flex-1 h-full px-6 space-y-3 ">



        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-3 flex-none">
          <div className="text-xl font-bold text-blue-600">Compensa</div>
          <div className="flex-1 flex justify-center">
            <div className="flex bg-white rounded-full p-1 space-x-1">
              <button className="px-4 py-1 rounded-full bg-blue-600 text-white font-medium">Dashboard</button>
              <button className="px-4 py-1 rounded-full text-gray-700 hover:bg-gray-200">Salary</button>
              <button className="px-4 py-1 rounded-full text-gray-700 hover:bg-gray-200">Profile</button>
            </div>
          </div>
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full mr-2" />
            <div className="text-sm text-gray-800">Matt Smith</div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="shrink-0 grid grid-cols-4 gap-6">
          <div>
          {/* Net Pay Card */}
            <NetPayCard/>
          </div>

          {/* Quarterly Tax Summary */}
          <div >
     <QuarterlyTaxSummaryCard
  quarterData={dummyQuarterData}
      />
    </div>

          {/* Placeholder Card */}
  <div >
    <AttendanceOverview/>
</div>
<div className="col-span-1 bg-white rounded-2xl shadow-md p-5 text-sm font-medium space-y-4">

</div>

        </div>
        
<div className="flex gap-4">
   {/* <div className="w-1/2 col-span-1 bg-white rounded-2xl shadow-lg p-5 text-sm font-medium space-y-4"> */}
 <TimeLogCard
        selectedDates={selectedDates}
        timeLogs={timeLogs}
        updateTimeLog={updateTimeLog}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />
{/* </div> */}
        {/* Calendar */}
     <div className="w-1/2 min-w-0 bg-white rounded-2xl shadow p-4">
  {/* Navigation Bar */}
  <div className="flex justify-between items-center mb-3">
    <button
      onClick={() => {
        if (viewMonth === 0) {
          setViewMonth(11);
          setViewYear(viewYear - 1);
        } else {
          setViewMonth(viewMonth - 1);
        }
      }}
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
      onClick={() => {
        if (viewMonth === 11) {
          setViewMonth(0);
          setViewYear(viewYear + 1);
        } else {
          setViewMonth(viewMonth + 1);
        }
      }}
      className="text-sm text-blue-600 underline"
    >
      Next →
    </button>
  </div>

  {/* Calendar Grid + Cutoff Switch */}
  <CalendarGrid
    currentMonthDates={currentMonthDates}
    selectedDates={selectedDates}
    toggleDate={toggleDate}
    onSelectCutoffRange={handleSelectCutoffRange}
  />
</div>
</div>
    </div>
       </div>
  );
}
