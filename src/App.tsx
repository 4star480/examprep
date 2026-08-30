import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { DailyPicks } from '@/pages/DailyPicks';
import { Portfolio } from '@/pages/Portfolio';
import { LearningCenter } from '@/pages/LearningCenter';
import { AIChat } from '@/pages/AIChat';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useTheme } from '@/hooks/useTheme';
import { getExchangeRate } from '@/services/exchangeRate';
import { Menu, X } from 'lucide-react';
import type { Page } from '@/types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [exchangeRate, setExchangeRate] = useState(1550);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const portfolio = usePortfolio();
  const isDark = theme === 'dark';

  useEffect(() => {
    getExchangeRate().then((r) => setExchangeRate(r.usdToNgn)).catch(() => {});
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 md:static md:z-auto transition-transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentPage={currentPage} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className={`md:hidden flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={isDark ? 'text-white' : 'text-gray-900'}>
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Trade<span className="text-emerald-500">Wise</span>
          </h1>
          <div className="w-6" />
        </div>

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
          {currentPage === 'dashboard' && (
            <Dashboard
              isDark={isDark}
              onNavigate={navigate}
              totalInvestedUSD={portfolio.totalInvestedUSD}
              totalInvestedNGN={portfolio.totalInvestedNGN}
              tradeCount={portfolio.trades.length}
            />
          )}
          {currentPage === 'picks' && (
            <DailyPicks
              isDark={isDark}
              exchangeRate={exchangeRate}
              portfolioSymbols={portfolio.uniqueSymbols}
              onNavigate={navigate}
            />
          )}
          {currentPage === 'portfolio' && (
            <Portfolio
              isDark={isDark}
              trades={portfolio.trades}
              addTrade={portfolio.addTrade}
              removeTrade={portfolio.removeTrade}
              totalInvestedUSD={portfolio.totalInvestedUSD}
              totalInvestedNGN={portfolio.totalInvestedNGN}
              exportPortfolio={portfolio.exportPortfolio}
              importPortfolio={portfolio.importPortfolio}
            />
          )}
          {currentPage === 'learn' && <LearningCenter isDark={isDark} />}
          {currentPage === 'chat' && <AIChat isDark={isDark} />}
        </main>
      </div>
    </div>
  );
};

export default App;
