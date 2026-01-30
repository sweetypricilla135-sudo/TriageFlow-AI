
import React, { useState } from 'react';
import { Email } from '../types';
import { Icons } from '../constants';

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
  onExecuteRouting?: (emailId: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onBack, onExecuteRouting }) => {
  const [activeTab, setActiveTab] = useState<'insight' | 'suggest'>('insight');
  const [isExecuting, setIsExecuting] = useState(false);
  const [routed, setRouted] = useState(email.status === 'ROUTED');

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate industrial system processing
    setTimeout(() => {
      setIsExecuting(false);
      setRouted(true);
      if (onExecuteRouting) onExecuteRouting(email.id);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-transparent hover:border-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h3 className="text-lg font-bold text-slate-800">In-Depth AI Analysis</h3>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
              Ref: {email.id} <span className="text-slate-300">•</span> 
              <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase tracking-tighter font-bold">Model Confidence: {(email.confidence * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            disabled={routed || isExecuting}
            className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-200 transition-colors uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
          >
            Manual Override
          </button>
          <button 
            onClick={handleExecute}
            disabled={routed || isExecuting}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-3 ${
              routed ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            } disabled:cursor-not-allowed`}
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Transmitting Data...
              </>
            ) : routed ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Routed to {email.department}
              </>
            ) : (
              <>Confirm Routing & Execute</>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Content: Email Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
            {routed && (
              <div className="absolute top-8 right-8 rotate-12 border-4 border-emerald-500 text-emerald-500 px-4 py-2 rounded font-black uppercase tracking-[0.2em] opacity-40 select-none pointer-events-none">
                ROUTED SUCCESS
              </div>
            )}
            
            <div className="mb-8 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Header</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{email.subject}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white text-xl shadow-xl">
                    {email.sender[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 tracking-tight">{email.sender}</p>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">To: Central Triage Hub (Global)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{new Date(email.timestamp).toLocaleDateString()}</p>
                  <p className="text-xs text-slate-500 font-medium">{new Date(email.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50/50 rounded-2xl p-8 border border-slate-100">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Original Communication Body</div>
               <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                {email.content}
               </div>
            </div>

            {/* Simulated Attachment Section */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-slate-900 uppercase tracking-widest">valve_inspection_report_v2.pdf</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">2.4 MB • OCR Analysis Complete (100%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Explainability Panel */}
        <div className="w-[440px] bg-white border-l border-slate-200 flex flex-col shadow-2xl relative z-10">
          <div className="p-6 border-b border-slate-100">
            <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 shadow-inner">
              <button 
                onClick={() => setActiveTab('insight')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'insight' ? 'bg-white text-blue-600 shadow-lg ring-1 ring-slate-200' : 'text-slate-500'}`}
              >
                <Icons.Why />
                Logic Matrix
              </button>
              <button 
                onClick={() => setActiveTab('suggest')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'suggest' ? 'bg-white text-blue-600 shadow-lg ring-1 ring-slate-200' : 'text-slate-500'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                AI Auto-Reply
              </button>
            </div>

            {activeTab === 'insight' ? (
              <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Context Summary</h4>
                    <span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Transformer V2</span>
                  </div>
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl shadow-sm">
                    <p className="text-[12px] text-slate-800 leading-relaxed font-bold italic">"{email.summary}"</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Routing Recommendation</h4>
                    <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span className="text-[10px] text-emerald-700 font-black uppercase tracking-widest">Direct Route Valid</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-white/5 group transition-all hover:bg-slate-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Target Department</span>
                      <span className="text-xs font-black text-white">97% Match</span>
                    </div>
                    <p className="text-lg font-black tracking-tight mb-2">{email.department}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                      Matched with <span className="text-white">API-607 Fire-Safe Protocol</span> cluster in QA database.
                    </p>
                  </div>

                  {/* Explainability Breakdown */}
                  <div className="space-y-3">
                    {[
                      { label: 'Priority Logic', value: email.aiRationale.priority, score: 95 },
                      { label: 'Intent Extraction', value: email.aiRationale.intent, score: 91 },
                      { label: 'SLA Risk Factor', value: email.aiRationale.sla, score: 99 },
                    ].map((item, idx) => (
                      <div key={idx} className="border border-slate-100 bg-white p-4 rounded-xl hover:border-blue-200 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{item.label}</span>
                          <span className="text-[10px] font-black text-blue-600">{item.score}%</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Generative Draft</h4>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ready for Transmit</span>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl min-h-[300px] shadow-inner font-medium text-slate-700 text-sm leading-relaxed">
                  <p className="whitespace-pre-wrap">{email.suggestedReply}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="w-full py-3.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    Apply & Transmit
                  </button>
                  <button className="w-full py-3.5 border border-slate-200 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl bg-white hover:bg-slate-50 transition-all text-slate-600">
                    Edit Document
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-auto p-6 bg-slate-50 border-t border-slate-200">
             <div className="flex items-center gap-3 mb-2 justify-center">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inference Hub Coimbatore-Node</span>
             </div>
             <p className="text-[9px] text-slate-400 font-bold leading-relaxed text-center uppercase tracking-tight">
               AI suggestions are probabilistic. Execute only after human verification of technical compliance.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
