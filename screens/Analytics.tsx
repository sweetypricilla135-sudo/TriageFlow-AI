
import React from 'react';
import { PerformanceMetric } from '../types';

const Analytics: React.FC = () => {
  const metrics: PerformanceMetric[] = [
    { label: 'Avg Triage Time', value: '42s', change: '-84%', trend: 'down' },
    { label: 'SLA Compliance', value: '99.4%', change: '+12%', trend: 'up' },
    { label: 'Auto-Routing Rate', value: '92.1%', change: '+65%', trend: 'up' },
    { label: 'Manual Overrides', value: '3.2%', change: '-18%', trend: 'down' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">System Analytics</h2>
        <p className="text-slate-500 text-sm">Quantifying the impact of TriageFlow AI on organizational efficiency.</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{m.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-slate-900">{m.value}</span>
              <span className={`text-xs font-bold mb-1 ${m.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Volume Distribution by Intent</h3>
          <div className="space-y-4">
            {[
              { label: 'RFQ', count: 450, percentage: 45, color: 'bg-blue-500' },
              { label: 'Inquiry', count: 250, percentage: 25, color: 'bg-emerald-500' },
              { label: 'Complaint', count: 180, percentage: 18, color: 'bg-rose-500' },
              { label: 'Escalation', count: 120, percentage: 12, color: 'bg-amber-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-400">{item.count} items ({item.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Response Time Reduction (SLA Improvement)</h3>
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-slate-100 rounded-lg">
             {/* Chart placeholder */}
             <div className="text-center">
                <p className="text-xs font-bold text-slate-400">Time Sequence Visualization</p>
                <div className="flex gap-2 items-end h-24 mt-4">
                  {[20, 35, 50, 45, 60, 75, 90, 85].map((v, i) => (
                    <div key={i} className="w-4 bg-blue-100 rounded-t hover:bg-blue-600 transition-colors" style={{ height: `${v}%` }}></div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-300 mt-2 italic">Aug &rarr; Sept &rarr; Oct (Active AI Training)</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
