
import React from 'react';
import { ScreenState } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  activeScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate }) => {
  const navItems: { id: ScreenState; label: string; icon: React.ReactNode }[] = [
    { id: 'TRIAGE', label: 'Priority Inbox', icon: <Icons.Inbox /> },
    { id: 'ANALYTICS', label: 'KPI Dashboard', icon: <Icons.Analytics /> },
    { id: 'ROUTING', label: 'Smart Routing', icon: <Icons.Routing /> },
    { id: 'VALIDATION', label: 'AI Accuracy', icon: <Icons.Accuracy /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">T</div>
          <h1 className="text-xl font-bold text-white tracking-tight">TRIAGE<span className="text-blue-500">FLOW</span></h1>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeScreen === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="text-xs">
            <p className="text-slate-100 font-semibold">System Online</p>
            <p className="text-slate-500">BERT Engine v2.4</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
