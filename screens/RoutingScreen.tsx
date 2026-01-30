
import React from 'react';
import { routingRules } from '../services/mockData';
import { Icons } from '../constants';

const RoutingScreen: React.FC = () => {
  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Smart Routing Governance</h2>
        <p className="text-slate-500 text-sm mt-2 font-medium">
          Global distribution logic for L&T Valves communication nodes. AI determines the <span className="text-blue-600 font-bold">Optimal Functional Destination</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Active Routing Protocols</h3>
              <button className="text-[10px] font-bold text-blue-600 uppercase border border-blue-200 px-3 py-1 rounded-lg hover:bg-blue-50 transition-all">Add Rule</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Intent</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Routing</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Escalation Path</th>
                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {routingRules.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <span className="text-xs font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 uppercase tracking-tight">
                          {rule.intent}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-xs font-bold text-slate-700">{rule.primaryDept}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs text-slate-400 font-medium italic">{rule.secondaryDept}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className={`w-10 h-5 rounded-full p-1 transition-colors ${rule.autoExecute ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${rule.autoExecute ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-4">Inference Logic Visualization</h4>
               <p className="text-sm text-slate-300 leading-relaxed mb-6">
                 Routing is determined using a <span className="text-white font-bold">Softmax Probability Vector</span>. If the top-tier department confidence falls below 
                 <span className="text-blue-400 font-bold px-1.5">70%</span>, the message is held for manual triage node validation.
               </p>
               <div className="flex gap-4">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="flex-1 h-20 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-all cursor-crosshair">
                      <div className="text-center">
                        <div className="w-1 h-1 rounded-full bg-blue-500 mx-auto mb-1 group-hover:scale-150 transition-transform"></div>
                        <span className="text-[8px] font-black opacity-30 uppercase">Node {i}</span>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Departmental Load Balancing</h3>
            <div className="space-y-6">
              {[
                { name: 'Sales & Estimations', load: 78, status: 'HIGH' },
                { name: 'Quality Assurance', load: 42, status: 'NORMAL' },
                { name: 'After-Market Spares', load: 92, status: 'CRITICAL' },
                { name: 'Engineering', load: 15, status: 'LOW' },
              ].map((dept, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{dept.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{dept.status} VOLUME</p>
                    </div>
                    <span className="text-xs font-black text-slate-900">{dept.load}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      className={`h-full transition-all duration-1000 ${dept.load > 80 ? 'bg-rose-500' : dept.load > 50 ? 'bg-amber-500' : 'bg-blue-500'}`} 
                      style={{ width: `${dept.load}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Icons.Why />
              <h4 className="text-[10px] font-black uppercase tracking-widest">Routing Optimizer</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed opacity-90">
              The AI has suggested a rule update: 74% of documentation queries are actually hidden RFQs. 
              Move <span className="underline decoration-white/40 underline-offset-4 font-black">Logistics</span> docs to <span className="underline decoration-white/40 underline-offset-4 font-black">Spares</span> primary?
            </p>
            <button className="mt-6 w-full py-3 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all">Review AI Proposal</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutingScreen;
