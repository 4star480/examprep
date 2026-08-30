import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCcw } from 'lucide-react';
import { TradeRecommendation, Page } from '@/types';
import { generateDailyPicks } from '@/services/gemini';
import { StockCard } from '@/components/StockCard';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { timeAgo } from '@/utils/format';

interface DailyPicksProps {
  isDark: boolean;
  exchangeRate: number;
  portfolioSymbols: string[];
  onNavigate: (page: Page) => void;
}

interface SavedPicks {
  picks: TradeRecommendation[];
  timestamp: string;
}

export const DailyPicks: React.FC<DailyPicksProps> = ({ isDark, exchangeRate, portfolioSymbols, onNavigate }) => {
  const [picks, setPicks] = useState<TradeRecommendation[]>(() => {
    const saved = getFromStorage<SavedPicks>('tradewise_daily_picks');
    return saved?.picks || [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated] = useState(() => {
    const saved = getFromStorage<SavedPicks>('tradewise_daily_picks');
    return saved?.timestamp || '';
  });

  const fetchPicks = async () => {
    setLoading(true);
    setError('');
    try {
      const recommendations = await generateDailyPicks(5, exchangeRate, portfolioSymbols);
      setPicks(recommendations);
      saveToStorage('tradewise_daily_picks', {
        picks: recommendations,
        timestamp: new Date().toISOString(),
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to generate picks';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = (symbol: string) => {
    onNavigate('chat');
    saveToStorage('tradewise_pending_analysis', symbol);
  };

  const usPicks = picks.filter((p) => p.stock.market === 'US');
  const ngxPicks = picks.filter((p) => p.stock.market === 'NGX');
  const heading = isDark ? 'text-white' : 'text-gray-900';
  const label = isDark ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${heading}`}>Daily Picks</h2>
          <p className={`text-sm ${label}`}>
            AI-powered trade recommendations for your $5 budget
            {lastUpdated && ` · Last updated ${timeAgo(lastUpdated)}`}
          </p>
        </div>
        <button
          onClick={fetchPicks}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-600/20"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : picks.length > 0 ? <RefreshCcw className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Generating...' : picks.length > 0 ? 'Refresh' : 'Generate Picks'}
        </button>
      </div>

      {error && (
        <div className={`p-4 rounded-lg border ${isDark ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
          {error}
        </div>
      )}

      {loading && picks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
          </div>
          <p className={label}>Analyzing markets and generating recommendations...</p>
          <p className={`text-xs ${label}`}>This may take 15-30 seconds</p>
        </div>
      )}

      {!loading && picks.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Sparkles className="w-12 h-12 text-emerald-500/50" />
          <p className={`text-lg font-medium ${heading}`}>Ready to get today's picks?</p>
          <p className={`text-sm ${label} max-w-md text-center`}>
            Our AI will analyze both US and Nigerian markets to find the best trades for your $5 daily budget.
          </p>
        </div>
      )}

      {usPicks.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${heading}`}>🇺🇸 US Market Picks</h3>
          <div className="space-y-3">
            {usPicks.map((rec, i) => (
              <StockCard key={i} rec={rec} isDark={isDark} onAnalyze={handleAnalyze} />
            ))}
          </div>
        </div>
      )}

      {ngxPicks.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-3 ${heading}`}>🇳🇬 Nigerian Market Picks</h3>
          <div className="space-y-3">
            {ngxPicks.map((rec, i) => (
              <StockCard key={i} rec={rec} isDark={isDark} onAnalyze={handleAnalyze} />
            ))}
          </div>
        </div>
      )}

      {picks.length > 0 && (
        <div className={`p-4 rounded-lg text-xs ${isDark ? 'bg-amber-900/20 text-amber-300' : 'bg-amber-50 text-amber-700'}`}>
          ⚠️ <strong>Disclaimer:</strong> These recommendations are AI-generated for educational purposes only.
          They do not constitute financial advice. Always do your own research before making investment decisions.
          Past performance does not guarantee future results.
        </div>
      )}
    </div>
  );
};
