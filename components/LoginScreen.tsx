
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background Industrial Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="w-full max-w-md p-10 bg-white rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4 shadow-lg">
            <span className="text-white text-3xl font-black">T</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">
            TriageFlow <span className="text-blue-600 font-light">AI</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">Enterprise Industrial Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Staff Identifier</label>
            <input 
              type="text" 
              defaultValue="admin_coimbatore_04"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Security Token</label>
            <input 
              type="password" 
              defaultValue="••••••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" 
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Initialize Triage Node</>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Core V2.4 Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">FIPS Compliant</span>
          </div>
        </div>

        <p className="mt-10 text-[9px] text-slate-300 text-center leading-relaxed font-medium">
          Authorized personnel only. All access and AI interactions are logged under the L&T Engineering Governance Framework.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
