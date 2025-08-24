import React, { useState } from 'react';

/**
 * WeeklyForecast component displays a styled weekly weather forecast for a user-entered location.
 * Uses mock data for demonstration. Color palette matches dashboard.
 */
const mockForecast = [
  { day: 'Today', desc: 'Moderate Rain', risk: 'medium' },
  { day: 'Tomorrow', desc: 'Heavy Rain', risk: 'high' },
  { day: 'Wed', desc: 'Partly Cloudy', risk: 'safe' },
  { day: 'Thu', desc: 'Sunny', risk: 'safe' },
  { day: 'Fri', desc: 'Light Rain', risk: 'medium' },
];

const riskMap = {
  safe: { label: 'Safe', color: 'bg-emerald-100 text-emerald-700', icon: '🛡️' },
  medium: { label: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
  high: { label: 'High Risk', color: 'bg-orange-100 text-orange-800', icon: '❗' },
};

export default function WeeklyForecast() {
  const [location, setLocation] = useState('Chennai');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📅</span>
        <h2 className="text-lg font-bold text-slate-800 flex-1">Weekly Forecast</h2>
        <input
          className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location"
          aria-label="Location"
          style={{ minWidth: 120 }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {mockForecast.map((f, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 bg-slate-50 hover:bg-slate-100 transition">
            <div>
              <div className="font-semibold text-slate-800">{f.day}</div>
              <div className="text-xs text-slate-500">{f.desc}</div>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1 rounded font-semibold text-xs ${riskMap[f.risk].color}`}>
              <span>{riskMap[f.risk].icon}</span>
              <span>{riskMap[f.risk].label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
