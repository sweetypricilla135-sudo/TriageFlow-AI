
import React from 'react';
// Fix: Added missing import for Icons
import { Icons } from '../constants';

const AIValidation: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">AI Accuracy & Validation</h2>
        <p className="text-slate-500 text-sm">Transparency in model evolution and active human feedback loop.</p>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Model Precision History</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Target: 98.5%</span>
          </div>
          <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
             {/* Large Trend Viz */}
             <div className="w-full h-40 flex items-end gap-1 mb-4">
                {Array.from({length: 30}).map((_, i) => (
                  <div key={i} className="flex-1 bg-slate-100 rounded-t relative group">
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t transition-all group-hover:bg-blue-600"
                      style={{ height: `${60 + Math.random() * 35}%` }}
                    ></div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between w-full text-[10px] font-bold text-slate-400">
                <span>OCT 01</span>
                <span>RETRAINED v2.4 (Oct 15)</span>
                <span>TODAY</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Feedback Loop Metrics</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-700">Total Validations</p>
                <p className="text-2xl font-bold text-slate-900">12,482</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg"><Icons.Accuracy /></div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-500 mb-2">Confidence Drift</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-emerald-500">+1.2%</span>
                <p className="text-[10px] text-slate-400 font-medium">Model is becoming more certain on specialized RFQ terms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">System explainability notice</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              All AI decisions are logged with BERT attention maps. If a human overrides a routing decision, 
              the model captures the context and updates the weights in the next training cycle (Scheduled: Sunday 02:00 AM).
            </p>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Review Pending Corrections
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AIValidation;
