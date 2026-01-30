
import React from 'react';
import { Email, Priority, Intent } from '../types';
import { Icons } from '../constants';

interface TriageInboxProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
}

const TriageInbox: React.FC<TriageInboxProps> = ({ emails, onSelectEmail }) => {
  const getPriorityColor = (p: Priority) => {
    switch(p) {
      case Priority.CRITICAL: return 'bg-rose-100 text-rose-700 border-rose-200 shadow-sm';
      case Priority.HIGH: return 'bg-orange-100 text-orange-700 border-orange-200';
      case Priority.MEDIUM: return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getIntentColor = (i: Intent) => {
    switch(i) {
      case Intent.RFQ: return 'bg-blue-50 text-blue-600 border-blue-100';
      case Intent.COMPLAINT: return 'bg-purple-50 text-purple-600 border-purple-100';
      case Intent.ESCALATION: return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getSLABadge = (risk: number, time: string) => {
    if (risk > 80) return (
      <div className="flex flex-col items-center">
        <span className="flex items-center gap-1.5 text-rose-600 font-black text-xs animate-pulse">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
          {time}
        </span>
        <span className="text-[9px] font-black text-rose-400 uppercase tracking-tighter">IMMEDIATE ACTION</span>
      </div>
    );
    if (risk > 40) return (
      <div className="flex flex-col items-center">
        <span className="text-amber-600 font-black text-xs">{time}</span>
        <span className="text-[9px] font-black text-amber-400 uppercase tracking-tighter">MONITOR RISK</span>
      </div>
    );
    return (
      <div className="flex flex-col items-center">
        <span className="text-emerald-600 font-black text-xs">{time}</span>
        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">OPERATIONAL</span>
      </div>
    );
  };

  return (
    <div className="p-10 max-w-[1600px] mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Operational Triage Hub</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            AI-optimized classification for <span className="text-blue-600 font-bold">EPC Projects</span>, <span className="text-blue-600 font-bold">MRO Inquiries</span>, and <span className="text-blue-600 font-bold">Technical Compliance</span>.
          </p>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-end border-r border-slate-200 pr-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Queue Load</span>
            <span className="text-2xl font-black text-slate-900">Heavy</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Model</span>
            <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
              BERT-IND-V2.4
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden ring-1 ring-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Breach Timer</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Inquiry Rationale</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Intent Profile</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">Trust Score</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {emails.sort((a,b) => b.slaRisk - a.slaRisk).map((email) => (
              <tr 
                key={email.id} 
                className={`group transition-all cursor-pointer border-l-4 ${email.slaRisk > 80 ? 'border-l-rose-500 bg-rose-50/10' : 'border-l-transparent hover:bg-slate-50/80'}`} 
                onClick={() => onSelectEmail(email)}
              >
                <td className="px-8 py-8 text-center">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getPriorityColor(email.priority)}`}>
                    {email.priority}
                  </span>
                </td>
                <td className="px-8 py-8 border-x border-slate-50/50">
                   <div className="flex flex-col items-center gap-3">
                      {getSLABadge(email.slaRisk, email.timeRemaining)}
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-200/50">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${email.slaRisk > 80 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]' : email.slaRisk > 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${email.slaRisk}%` }}
                        ></div>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-8 max-w-xl">
                  <div className="flex flex-col gap-1.5">
                    <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight text-base tracking-tight">{email.subject}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 font-medium leading-relaxed">
                       <span className="text-blue-600 font-bold uppercase tracking-widest text-[9px] mr-2">AI Logic:</span>
                       {email.aiRationale.priority}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest">{email.id}</span>
                       <span className="text-[10px] font-bold text-slate-400">{email.sender}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8">
                  <div className="flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black border w-fit shadow-sm uppercase tracking-widest ${getIntentColor(email.intent)}`}>
                      {email.intent}
                    </span>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-0.5 bg-blue-500 rounded-full"></div>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em]">Certainty {(email.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-8 text-center">
                   <div className="inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-200 group-hover:bg-white group-hover:border-blue-300 transition-all shadow-sm">
                      <span className={`text-lg font-black leading-none ${email.confidence > 0.9 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {(email.confidence * 100).toFixed(0)}
                      </span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">PERCENT</span>
                   </div>
                </td>
                <td className="px-8 py-8 text-right">
                  <button className="bg-slate-900 text-white w-10 h-10 rounded-xl hover:bg-blue-600 transition-all shadow-xl group-hover:scale-105 active:scale-95 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-6 bg-slate-900 text-white rounded-3xl flex items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex gap-10 items-center">
          <div className="flex flex-col items-center justify-center border-r border-white/10 pr-10">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Shift Handover</span>
            <div className="flex gap-1.5">
              {[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-4 rounded-sm ${i <= 2 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]' : i === 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>)}
            </div>
          </div>
          <div className="max-w-xl">
            <p className="text-sm font-bold text-white mb-1 tracking-tight">Enterprise Operations Advisory</p>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Detected <span className="text-rose-400 font-black italic underline decoration-rose-500/50 underline-offset-4 decoration-2">2 Critical Bottlenecks</span> in EPC documentation flow for the Jamnagar project. QA team has been auto-escalated for immediate Fire-Safe certificate validation.
            </p>
          </div>
        </div>
        <div className="flex gap-3 relative z-10">
           <button className="px-6 py-3 bg-white/5 text-xs font-black uppercase tracking-widest border border-white/10 rounded-xl hover:bg-white/10 transition-all">Audit Trail</button>
           <button className="px-6 py-3 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">Operational Report</button>
        </div>
        {/* Abstract Gear background element */}
        <div className="absolute right-[-100px] top-[-100px] w-80 h-80 border-[40px] border-white/5 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default TriageInbox;
