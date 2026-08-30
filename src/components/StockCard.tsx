import React from 'react';
import { TradeRecommendation } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/format';
import { TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';

interface StockCardProps {
  rec: TradeRecommendation;
  isDark: boolean;
  onAnalyze?: (symbol: string, market: 'US' | 'NGX') => void;
}

const actionColors = {
  BUY: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  SELL: 'bg-red-500/10 text-red-400 border-red-500/30',
  HOLD: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

const actionColorsLight = {
  BUY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  SELL: 'bg-red-50 text-red-700 border-red-200',
  HOLD: 'bg-amber-50 text-amber-700 border-amber-200',
};

const confidenceColors = {
  High: 'text-emerald-400',
  Medium: 'text-amber-400',
  Low: 'text-red-400',
};

export const StockCard: React.FC<StockCardProps> = ({ rec, isDark, onAnalyze }) => {
  const { stock, action, confidence, reason, suggestedAmount, suggestedShares } = rec;
  const isPositive = stock.changePercent >= 0;
  const colors = isDark ? actionColors : actionColorsLight;

  return (
    <div className={`rounded-xl border p-4 animate-fade-in transition-all hover:scale-[1.01] ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{stock.symbol}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[action]}`}>
              {action}
            </span>
          </div>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{stock.name}</p>
        </div>
        <div className="text-right">
          <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {formatCurrency(stock.price, stock.currency)}
          </p>
          <p className={`text-xs flex items-center justify-end gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : stock.changePercent === 0 ? <Minus className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {formatPercent(stock.changePercent)}
          </p>
        </div>
      </div>

      <p className={`text-sm mb-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
        {reason}
      </p>

      <div className={`flex items-center justify-between text-xs ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
        <div className="flex items-center gap-3">
          <span>Confidence: <span className={confidenceColors[confidence]}>{confidence}</span></span>
          <span>{stock.market === 'US' ? '🇺🇸' : '🇳🇬'} {stock.market}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{formatCurrency(suggestedAmount, stock.currency)} · {suggestedShares} shares</span>
          {onAnalyze && (
            <button
              onClick={() => onAnalyze(stock.symbol, stock.market)}
              className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 transition"
            >
              Analyze <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
