import React from 'react'

/**
 * VisualizationGraph is a placeholder for future data visualizations (e.g., rainfall, risk trends).
 * Replace with a real chart (e.g., Chart.js, Recharts) when data is available.
 */
export default function VisualizationGraph() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col items-center justify-center min-h-[250px]">
      <h3 className="text-base font-bold text-slate-800 mb-2 w-full text-left flex items-center gap-2">
        <span>📈</span>
        <span>Visualization Graph</span>
      </h3>
      <div className="flex-1 flex items-center justify-center w-full h-32">
        {/* Placeholder graph (replace with real chart later) */}
        <svg width="100%" height="100" viewBox="0 0 300 100">
          <polyline
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
            points="0,80 40,60 80,65 120,20 160,40 200,10 240,50 280,30"
          />
          <circle cx="120" cy="20" r="5" fill="#0ea5e9" />
          <circle cx="200" cy="10" r="5" fill="#0ea5e9" />
        </svg>
      </div>
      <div className="text-xs text-slate-500 mt-2">(Sample data visualization. Replace with real data.)</div>
    </div>
  )
}
