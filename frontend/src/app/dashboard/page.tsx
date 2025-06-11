'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import CalendarGrid from '@/components/CalendarGrid';
import NetPayCard from '@/components/NetPayCard';
import QuarterlyTaxSummaryCard from '@/components/QuarterlySummaryCard';
import AttendanceOverview from '@/components/AttendanceOverviewCard';
import TimeLogCard from '@/components/TimeLogCard';
import EstimatedAnnualIncomeCard from '@/components/EstimatedAnnualIncomeCard';
import Navbar from '@/components/Navbar';

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

  const settings = {
    dailyRate: 1000,
    withholdingTax: 5,
    philHealth: 2.75,
    sss: 4.5,
    pagIbig: 1,
  };

  return (
    // Option 1: Use viewport height with flex layout
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-100 overflow-hidden">
      <div className="flex-1 flex justify-center px-4 py-6 overflow-auto">
        <div className="w-full max-w-screen-xl flex flex-col space-y-6 min-h-0">
          
          {/* Navbar - Fixed height */}
          <Navbar />

          {/* Summary Cards - Fixed height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full flex-shrink-0">
            <NetPayCard />
            <QuarterlyTaxSummaryCard quarterData={dummyQuarterData} />
            <AttendanceOverview />
            <EstimatedAnnualIncomeCard
              dailyRate={1000}
              withholdingTax={5}
              philHealth={3}
              sss={3}
              pagIbig={2}
              receivedSoFar={90000}
            />
          </div>

          {/* Main Content - Flexible height */}
          <div className="flex flex-col xl:flex-row gap-4 w-full flex-1 min-h-0">
            {/* Time Log Column */}
            <div className="w-full xl:w-1/2 min-w-0 flex-1">
              <TimeLogCard
                selectedDates={selectedDates}
                timeLogs={timeLogs}
                updateTimeLog={updateTimeLog}
                activeDate={activeDate}
                setActiveDate={setActiveDate}
              />
            </div>

            {/* Calendar Column */}
              <div className="w-full xl:w-1/2 min-w-0 flex-1">
              <CalendarGrid
                currentMonthDates={currentMonthDates}
                selectedDates={selectedDates}
                toggleDate={toggleDate}
                onSelectCutoffRange={handleSelectCutoffRange}
                viewMonth={viewMonth}
                viewYear={viewYear}
                onPrevMonth={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear(viewYear - 1);
                  } else {
                    setViewMonth(viewMonth - 1);
                  }
                }}
                onNextMonth={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear(viewYear + 1);
                  } else {
                    setViewMonth(viewMonth + 1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}