import { StockQuote, MarketIndex } from '@/types';
import { getCached, setCache } from './cache';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY || '';
const BASE_URL = 'https://www.alphavantage.co/query';

const CACHE_TTL = 30 * 60 * 1000; // 30 min — preserve scarce daily quota

async function fetchAV(params: Record<string, string>): Promise<Record<string, unknown>> {
  const url = new URL(BASE_URL);
  url.searchParams.set('apikey', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Alpha Vantage error: ${res.status}`);
  const data = await res.json();
  if (data['Note'] || data['Information']) {
    throw new Error('Alpha Vantage rate limit reached. Using cached data.');
  }
  return data;
}

export async function getStockQuote(symbol: string): Promise<StockQuote | null> {
  const cacheKey = `quote_${symbol}`;
  const cached = getCached<StockQuote>(cacheKey);
  if (cached) return cached;

  try {
    const data = await fetchAV({ function: 'GLOBAL_QUOTE', symbol });
    const q = data['Global Quote'] as Record<string, string> | undefined;
    if (!q || !q['05. price']) return null;

    const quote: StockQuote = {
      symbol: q['01. symbol'],
      name: symbol,
      price: parseFloat(q['05. price']),
      change: parseFloat(q['09. change']),
      changePercent: parseFloat(q['10. change percent']?.replace('%', '') || '0'),
      volume: parseInt(q['06. volume'] || '0'),
      high: parseFloat(q['03. high'] || '0'),
      low: parseFloat(q['04. low'] || '0'),
      previousClose: parseFloat(q['08. previous close'] || '0'),
      market: 'US',
      currency: 'USD',
      lastUpdated: new Date().toISOString(),
    };
    setCache(cacheKey, quote, CACHE_TTL);
    return quote;
  } catch {
    return cached ?? null;
  }
}

export async function getTopGainersLosers(): Promise<{
  gainers: StockQuote[];
  losers: StockQuote[];
} | null> {
  const cacheKey = 'top_gainers_losers';
  const cached = getCached<{ gainers: StockQuote[]; losers: StockQuote[] }>(cacheKey);
  if (cached) return cached;

  try {
    const data = await fetchAV({ function: 'TOP_GAINERS_LOSERS' });
    const parse = (items: Record<string, string>[]): StockQuote[] =>
      (items || []).slice(0, 5).map((item) => ({
        symbol: item.ticker,
        name: item.ticker,
        price: parseFloat(item.price),
        change: parseFloat(item.change_amount),
        changePercent: parseFloat(item.change_percentage?.replace('%', '') || '0'),
        volume: parseInt(item.volume || '0'),
        market: 'US' as const,
        currency: 'USD' as const,
        lastUpdated: new Date().toISOString(),
      }));

    const result = {
      gainers: parse(data.top_gainers as Record<string, string>[]),
      losers: parse(data.top_losers as Record<string, string>[]),
    };
    setCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch {
    return cached ?? null;
  }
}

export const US_MARKET_INDICES: MarketIndex[] = [
  { name: 'S&P 500', symbol: 'SPY', value: 0, change: 0, changePercent: 0, market: 'US' },
  { name: 'NASDAQ', symbol: 'QQQ', value: 0, change: 0, changePercent: 0, market: 'US' },
  { name: 'Dow Jones', symbol: 'DIA', value: 0, change: 0, changePercent: 0, market: 'US' },
];

export async function getMarketIndices(): Promise<MarketIndex[]> {
  const cacheKey = 'market_indices';
  const cached = getCached<MarketIndex[]>(cacheKey);
  if (cached) return cached;

  const indices = [...US_MARKET_INDICES];
  for (const idx of indices) {
    try {
      const quote = await getStockQuote(idx.symbol);
      if (quote) {
        idx.value = quote.price;
        idx.change = quote.change;
        idx.changePercent = quote.changePercent;
      }
    } catch {
      // leave defaults
    }
  }
  if (indices.some((i) => i.value > 0)) {
    setCache(cacheKey, indices, CACHE_TTL);
  }
  return indices;
}
