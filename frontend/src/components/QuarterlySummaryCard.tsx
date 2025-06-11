'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface QuarterData {
  label: string;
  gross: number;
  tax5: number;
  net: number;
}

interface Props {
  quarterData: Record<Quarter, QuarterData>;
}

export default function QuarterlyTaxSummaryCard({ quarterData }: Props) {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>('Q1');

  return (
      <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
      <h3 className="text-center text-gray-900 font-semibold text-sm mb-4">
        Quarterly Tax – {new Date().getFullYear()}
      </h3>

      {/* Quarter Toggle Buttons */}
      <div className="flex justify-center gap-2 mb-4">
        {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map(q => (
          <button
            key={q}
            onClick={() => setSelectedQuarter(q)}
            className={`px-4 py-1.5 text-xs rounded-full font-medium transition 
              border shadow-sm
              ${selectedQuarter === q
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Animated Quarter Data */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedQuarter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 bg-gray-50 p-4 rounded-xl border"
        >
          <p className="text-center text-xs text-gray-500 font-medium">{quarterData[selectedQuarter].label}</p>
          <PayRow label="Gross" value={quarterData[selectedQuarter].gross} />
          <PayRow label="5% Tax" value={quarterData[selectedQuarter].tax5} color="text-red-500" />
          <div className="border-t pt-2 flex justify-between text-sm font-bold text-blue-700">
            <span>Net Pay</span>
            <span>₱{quarterData[selectedQuarter].net.toLocaleString()}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PayRow({ label, value, color = 'text-gray-700' }: { label: string; value: number; color?: string }) {
  return (
    <div className={`flex justify-between text-sm ${color}`}>
      <span>{label}</span>
      <span>₱{value.toLocaleString()}</span>
    </div>
  );
}
