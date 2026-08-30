import React, { useState } from 'react';
import { Plus, Trash2, Download, Upload, X } from 'lucide-react';
import { PortfolioTrade } from '@/types';
import { formatCurrency, formatDate } from '@/utils/format';

interface PortfolioProps {
  isDark: boolean;
  trades: PortfolioTrade[];
  addTrade: (trade: Omit<PortfolioTrade, 'id'>) => void;
  removeTrade: (id: string) => void;
  totalInvestedUSD: number;
  totalInvestedNGN: number;
  exportPortfolio: () => void;
  importPortfolio: (file: File) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  isDark, trades, addTrade, removeTrade,
  totalInvestedUSD, totalInvestedNGN,
  exportPortfolio, importPortfolio,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    symbol: '', name: '', market: 'US' as 'US' | 'NGX',
    quantity: '', buyPrice: '', date: new Date().toISOString().split('T')[0], notes: '',
  });

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const label = isDark ? 'text-slate-400' : 'text-gray-500';
  const card = `rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`;
  const input = `w-full px-3 py-2 rounded-lg border text-sm ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol || !form.quantity || !form.buyPrice) return;
    addTrade({
      symbol: form.symbol.toUpperCase(),
      name: form.name || form.symbol.toUpperCase(),
      market: form.market,
      quantity: parseFloat(form.quantity),
      buyPrice: parseFloat(form.buyPrice),
      currency: form.market === 'US' ? 'USD' : 'NGN',
      date: form.date,
      notes: form.notes || undefined,
    });
    setForm({ symbol: '', name: '', market: 'US', quantity: '', buyPrice: '', date: new Date().toISOString().split('T')[0], notes: '' });
    setShowForm(false);
  };

  const usTrades = trades.filter((t) => t.market === 'US');
  const ngxTrades = trades.filter((t) => t.market === 'NGX');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${heading}`}>Portfolio</h2>
          <p className={`text-sm ${label}`}>Track your trades and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportPortfolio} className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Export">
            <Download className="w-4 h-4" />
          </button>
          <label className={`p-2 rounded-lg transition cursor-pointer ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Import">
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" className="hidden" onChange={(e) => e.target.files?.[0] && importPortfolio(e.target.files[0])} />
          </label>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition"
          >
            <Plus className="w-4 h-4" /> Log Trade
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${card} p-5`}>
          <p className={`text-sm ${label}`}>US Portfolio</p>
          <p className={`text-2xl font-bold ${heading}`}>{formatCurrency(totalInvestedUSD)}</p>
          <p className={`text-xs ${label}`}>{usTrades.length} trade{usTrades.length !== 1 ? 's' : ''}</p>
        </div>
        <div className={`${card} p-5`}>
          <p className={`text-sm ${label}`}>NGX Portfolio</p>
          <p className={`text-2xl font-bold ${heading}`}>{formatCurrency(totalInvestedNGN, 'NGN')}</p>
          <p className={`text-xs ${label}`}>{ngxTrades.length} trade{ngxTrades.length !== 1 ? 's' : ''}</p>
        </div>
        <div className={`${card} p-5`}>
          <p className={`text-sm ${label}`}>Total Trades</p>
          <p className={`text-2xl font-bold ${heading}`}>{trades.length}</p>
          <p className={`text-xs ${label}`}>All markets</p>
        </div>
      </div>

      {/* Add Trade Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${card} p-6 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${heading}`}>Log a Trade</h3>
              <button onClick={() => setShowForm(false)} className={label}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${label}`}>Ticker Symbol *</label>
                  <input className={input} placeholder="e.g. AAPL" value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value })} required />
                </div>
                <div>
                  <label className={`text-xs ${label}`}>Market *</label>
                  <select className={input} value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value as 'US' | 'NGX' })}>
                    <option value="US">🇺🇸 US</option>
                    <option value="NGX">🇳🇬 NGX</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`text-xs ${label}`}>Company Name</label>
                <input className={input} placeholder="e.g. Apple Inc." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs ${label}`}>Quantity *</label>
                  <input className={input} type="number" step="any" min="0" placeholder="0.028" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
                </div>
                <div>
                  <label className={`text-xs ${label}`}>Buy Price ({form.market === 'US' ? '$' : '₦'}) *</label>
                  <input className={input} type="number" step="any" min="0" placeholder="178.50" value={form.buyPrice} onChange={(e) => setForm({ ...form, buyPrice: e.target.value })} required />
                </div>
              </div>
              <div>
                <label className={`text-xs ${label}`}>Date</label>
                <input className={input} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <label className={`text-xs ${label}`}>Notes</label>
                <input className={input} placeholder="Optional notes..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition">
                Add Trade
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trades Table */}
      {trades.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-4xl mb-3">📋</span>
          <p className={`font-medium ${heading}`}>No trades logged yet</p>
          <p className={`text-sm ${label}`}>Click "Log Trade" to record your first investment</p>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? 'bg-slate-800 text-slate-400' : 'bg-gray-50 text-gray-500'}>
                  <th className="text-left px-4 py-3 font-medium">Symbol</th>
                  <th className="text-left px-4 py-3 font-medium">Market</th>
                  <th className="text-right px-4 py-3 font-medium">Qty</th>
                  <th className="text-right px-4 py-3 font-medium">Buy Price</th>
                  <th className="text-right px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-center px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className={`border-t ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                    <td className={`px-4 py-3 font-medium ${heading}`}>
                      {trade.symbol}
                      {trade.name !== trade.symbol && (
                        <span className={`block text-xs ${label}`}>{trade.name}</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 ${label}`}>{trade.market === 'US' ? '🇺🇸' : '🇳🇬'} {trade.market}</td>
                    <td className={`px-4 py-3 text-right ${heading}`}>{trade.quantity}</td>
                    <td className={`px-4 py-3 text-right ${heading}`}>{formatCurrency(trade.buyPrice, trade.currency)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${heading}`}>
                      {formatCurrency(trade.buyPrice * trade.quantity, trade.currency)}
                    </td>
                    <td className={`px-4 py-3 ${label}`}>{formatDate(trade.date)}</td>
                    <td className="px-4 py-3 text-center">
                      <button onClick={() => removeTrade(trade.id)} className="text-red-400 hover:text-red-300 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
