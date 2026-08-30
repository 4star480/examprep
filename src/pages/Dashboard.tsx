import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Newspaper, RefreshCcw } from 'lucide-react';
import { ExchangeRateData, NewsArticle, MarketIndex } from '@/types';
import { getExchangeRate } from '@/services/exchangeRate';
import { getMarketNews } from '@/services/news';
import { ngxIndices } from '@/data/nigerianStocks';
import { formatCurrency, formatPercent, formatNumber, timeAgo } from '@/utils/format';

interface DashboardProps {
  isDark: boolean;
  onNavigate: (page: 'picks' | 'chat') => void;
  totalInvestedUSD: number;
  totalInvestedNGN: number;
  tradeCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ isDark, onNavigate, totalInvestedUSD, totalInvestedNGN, tradeCount }) => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const [rate, articles] = await Promise.all([
      getExchangeRate().catch(() => null),
      getMarketNews().catch(() => []),
    ]);
    if (rate) setExchangeRate(rate);
    setNews(articles);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const card = `rounded-xl border p-5 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`;
  const label = isDark ? 'text-slate-400' : 'text-gray-500';
  const heading = isDark ? 'text-white' : 'text-gray-900';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${heading}`}>Dashboard</h2>
          <p className={`text-sm ${label}`}>Your market overview at a glance</p>
        </div>
        <button onClick={loadData} className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`}>
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={card}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${label}`}>Daily Budget</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className={`text-2xl font-bold ${heading}`}>$5.00</p>
          <p className={`text-xs ${label}`}>
            {exchangeRate ? `≈ ${formatCurrency(5 * exchangeRate.usdToNgn, 'NGN')}` : '...'}
          </p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${label}`}>USD Invested</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className={`text-2xl font-bold ${heading}`}>{formatCurrency(totalInvestedUSD)}</p>
          <p className={`text-xs ${label}`}>{tradeCount} trade{tradeCount !== 1 ? 's' : ''} total</p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${label}`}>NGN Invested</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className={`text-2xl font-bold ${heading}`}>{formatCurrency(totalInvestedNGN, 'NGN')}</p>
          <p className={`text-xs ${label}`}>Nigerian market</p>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${label}`}>USD → NGN</span>
            <span className="text-lg">🇳🇬</span>
          </div>
          <p className={`text-2xl font-bold ${heading}`}>
            {exchangeRate ? `₦${formatNumber(exchangeRate.usdToNgn)}` : '...'}
          </p>
          <p className={`text-xs ${label}`}>
            {exchangeRate ? `Updated ${timeAgo(exchangeRate.lastUpdated)}` : 'Loading...'}
          </p>
        </div>
      </div>

      {/* Market Indices */}
      <div>
        <h3 className={`text-lg font-semibold mb-3 ${heading}`}>🇳🇬 Nigerian Market</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ngxIndices.map((idx) => (
            <div key={idx.symbol} className={card}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${label}`}>{idx.name}</p>
                  <p className={`text-xl font-bold ${heading}`}>{formatNumber(idx.value)}</p>
                </div>
                <div className={`text-right flex items-center gap-1 ${idx.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {idx.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="font-medium">{formatPercent(idx.changePercent)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('picks')}
          className="p-5 rounded-xl border-2 border-dashed border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/5 transition text-left"
        >
          <TrendingUp className="w-6 h-6 text-emerald-500 mb-2" />
          <p className={`font-semibold ${heading}`}>Get Today's Picks</p>
          <p className={`text-sm ${label}`}>AI-powered trade recommendations for US &amp; NGX markets</p>
        </button>
        <button
          onClick={() => onNavigate('chat')}
          className="p-5 rounded-xl border-2 border-dashed border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/5 transition text-left"
        >
          <span className="text-2xl mb-2 block">🤖</span>
          <p className={`font-semibold ${heading}`}>Ask the AI Advisor</p>
          <p className={`text-sm ${label}`}>Get personalized answers to your investing questions</p>
        </button>
      </div>

      {/* Market News */}
      {news.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${heading}`}>
            <Newspaper className="w-5 h-5" /> Market News
          </h3>
          <div className="space-y-3">
            {news.slice(0, 6).map((article, i) => (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-lg border p-4 transition hover:scale-[1.005] ${isDark ? 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/60' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm line-clamp-2 ${heading}`}>{article.title}</p>
                    <p className={`text-xs mt-1 ${label}`}>
                      {article.source} · {timeAgo(article.publishedAt)}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
