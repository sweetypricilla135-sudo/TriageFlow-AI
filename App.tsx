
import React, { useState } from 'react';
import { ScreenState, Email } from './types';
import { mockEmails as initialEmails } from './services/mockData';
import Sidebar from './components/Sidebar';
import TriageInbox from './screens/TriageInbox';
import EmailDetail from './screens/EmailDetail';
import Analytics from './screens/Analytics';
import AIValidation from './screens/AIValidation';
import RoutingScreen from './screens/RoutingScreen';
import LoginScreen from './components/LoginScreen';
import { Icons } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ScreenState>('TRIAGE');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>(initialEmails);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    setActiveScreen('DETAIL');
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
    setActiveScreen('TRIAGE');
  };

  const handleExecuteRouting = (emailId: string) => {
    setEmails(prev => prev.map(e => e.id === emailId ? { ...e, status: 'ROUTED' } : e));
    // After routing, user usually goes back to triage to handle next items
    // but we stay on detail for confirmation view.
  };

  const renderScreen = () => {
    switch(activeScreen) {
      case 'TRIAGE':
        // Only show pending items in the active triage inbox
        const pendingEmails = emails.filter(e => e.status === 'PENDING');
        return <TriageInbox emails={pendingEmails} onSelectEmail={handleSelectEmail} />;
      case 'DETAIL':
        return selectedEmail ? (
          <EmailDetail 
            email={emails.find(e => e.id === selectedEmail.id) || selectedEmail} 
            onBack={handleBackToInbox}
            onExecuteRouting={handleExecuteRouting}
          />
        ) : null;
      case 'ANALYTICS':
        return <Analytics />;
      case 'VALIDATION':
        return <AIValidation />;
      case 'ROUTING':
        return <RoutingScreen />;
      default:
        return <TriageInbox emails={emails.filter(e => e.status === 'PENDING')} onSelectEmail={handleSelectEmail} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar activeScreen={activeScreen} onNavigate={setActiveScreen} />
      
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Global Industrial Header */}
        <header className="h-14 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Operational Node</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                  L&T-VALVES-TRIAGE-PROD
                </span>
              </div>
            </div>
            
            <div className="hidden xl:flex items-center gap-8 border-l border-slate-100 pl-8">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">AI Inference</span>
                <span className="text-xs font-bold text-slate-700">14ms p99</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Model Stability</span>
                <span className="text-xs font-bold text-emerald-600">99.1% (Optimal)</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
              <Icons.Why />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-blue-600">Explainable AI Core Enabled</span>
            </div>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 leading-tight">M. Swaminathan</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Plant Operations Manager</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg border border-slate-700">
                MS
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50">
          {renderScreen()}
        </div>

        {/* Explainability Floating Hint */}
        {activeScreen === 'TRIAGE' && (
           <div className="fixed bottom-8 right-8 p-6 bg-slate-900 text-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800 max-w-sm z-30 ring-1 ring-white/10">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20 text-white">
                 <Icons.Why />
               </div>
               <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">XAI Trust Matrix</p>
             </div>
             <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
               This system utilizes <span className="text-white font-bold border-b border-blue-500">Local Industrial Transformers</span>. 
               Confidence scores represent multi-head attention correlation with L&T technical standard documents. 
             </p>
             <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Audit ID: 882-B-X</span>
                <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">Technical Specs &rarr;</button>
             </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default App;
