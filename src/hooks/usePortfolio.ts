import { useState, useCallback, useEffect } from 'react';
import { PortfolioTrade } from '@/types';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import { generateId } from '@/utils/format';

const STORAGE_KEY = 'tradewise_portfolio';

export function usePortfolio() {
  const [trades, setTrades] = useState<PortfolioTrade[]>(() => {
    return getFromStorage<PortfolioTrade[]>(STORAGE_KEY) || [];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, trades);
  }, [trades]);

  const addTrade = useCallback(
    (trade: Omit<PortfolioTrade, 'id'>) => {
      const newTrade: PortfolioTrade = { ...trade, id: generateId() };
      setTrades((prev) => [newTrade, ...prev]);
    },
    [],
  );

  const removeTrade = useCallback((id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const totalInvestedUSD = trades
    .filter((t) => t.currency === 'USD')
    .reduce((sum, t) => sum + t.buyPrice * t.quantity, 0);

  const totalInvestedNGN = trades
    .filter((t) => t.currency === 'NGN')
    .reduce((sum, t) => sum + t.buyPrice * t.quantity, 0);

  const uniqueSymbols = [...new Set(trades.map((t) => t.symbol))];

  const exportPortfolio = useCallback(() => {
    const blob = new Blob([JSON.stringify(trades, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tradewise-portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [trades]);

  const importPortfolio = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string) as PortfolioTrade[];
        setTrades(imported);
      } catch {
        alert('Invalid portfolio file');
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    trades,
    addTrade,
    removeTrade,
    totalInvestedUSD,
    totalInvestedNGN,
    uniqueSymbols,
    exportPortfolio,
    importPortfolio,
  };
}
