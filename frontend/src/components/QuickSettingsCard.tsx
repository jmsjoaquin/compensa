'use client';

import { useState } from 'react';

interface Settings {
  withholdingTax: number;
  philHealth: number;
  sss: number;
  pagIbig: number;
  dailyRate: number;
}

export default function QuickSettingsCard({
  defaults,
  onSave,
}: {
  defaults: Settings;
  onSave: (newSettings: Settings) => void;
}) {
  const [settings, setSettings] = useState<Settings>(defaults);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-6 max-w-md">
      <h3 className="text-lg font-semibold text-gray-800">Quick Settings</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {([
          ['Withholding Tax (%)', 'withholdingTax'],
          ['PhilHealth (%)', 'philHealth'],
          ['SSS (%)', 'sss'],
          ['Pag-IBIG (%)', 'pagIbig'],
          ['Daily Rate (₱)', 'dailyRate'],
        ] as [string, keyof Settings][]).map(([label, key]) => (
          <div key={key} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="number"
              step="0.01"
              value={settings[key]}
              onChange={e =>
                setSettings(prev => ({
                  ...prev,
                  [key]: parseFloat(e.target.value) || 0,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => onSave(settings)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
