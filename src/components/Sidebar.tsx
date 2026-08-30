import React from 'react';
import { LayoutDashboard, TrendingUp, Briefcase, GraduationCap, MessageCircle, Sun, Moon } from 'lucide-react';
import { Page } from '@/types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { page: 'picks', label: 'Daily Picks', icon: <TrendingUp className="w-5 h-5" /> },
  { page: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-5 h-5" /> },
  { page: 'learn', label: 'Learn', icon: <GraduationCap className="w-5 h-5" /> },
  { page: 'chat', label: 'AI Chat', icon: <MessageCircle className="w-5 h-5" /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, theme, onToggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <aside className={`w-64 flex flex-col border-r shrink-0 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
      <div className={`p-5 border-b ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <div>
            <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Trade<span className="text-emerald-500">Wise</span>
            </h1>
            <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>Smart Trading Advisor</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ page, label, icon }) => {
          const active = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                  : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </nav>

      <div className={`p-3 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <button
          onClick={onToggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
            ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div className={`mt-3 px-3 py-2 rounded-lg text-xs ${isDark ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
          ⚠️ Educational only. Not financial advice.
        </div>
      </div>
    </aside>
  );
};
