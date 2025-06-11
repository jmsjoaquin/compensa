'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModernNetPayCard() {
  const [currentCutoff, setCurrentCutoff] = useState<'first' | 'second'>('first');

  const data = {
    first: { gross: 26000, tax: 1300, philhealth: 500, net: 23000 },
    second: { gross: 28000, tax: 1400, philhealth: 600, net: 24600 },
  };

  return (
     <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 space-y-6 max-w-sm">
      <h3 className="text-center text-gray-900 font-semibold text-sm mb-4">
        Net Pay – {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h3>

      {/* Cutoff Toggle */}
      <div className="flex justify-center gap-2 mb-4">
        {(['first', 'second'] as const).map((cutoff) => (
          <button
            key={cutoff}
            onClick={() => setCurrentCutoff(cutoff)}
            className={`px-4 py-1.5 text-xs rounded-full font-medium transition 
              border shadow-sm
              ${
                currentCutoff === cutoff
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
          >
            {cutoff === 'first' ? '1st Cutoff (1–15)' : '2nd Cutoff (16–end)'}
          </button>
        ))}
      </div>

      {/* Animated Pay Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCutoff}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 bg-gray-50 p-4 rounded-xl border"
        >
          <PayRow label="Gross Pay" value={data[currentCutoff].gross} />
          <PayRow label="5% Tax" value={data[currentCutoff].tax} color="text-red-500" />
          <PayRow label="PhilHealth" value={data[currentCutoff].philhealth} color="text-red-500" />

          <div className="border-t pt-2 flex justify-between text-sm font-bold text-blue-700">
            <span>Net Pay</span>
            <span>₱{data[currentCutoff].net.toLocaleString()}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PayRow({ label, value, color = 'text-gray-700' }) {
  return (
    <div className={`flex justify-between text-sm ${color}`}>
      <span>{label}</span>
      <span>₱{value.toLocaleString()}</span>
    </div>
  );
}
