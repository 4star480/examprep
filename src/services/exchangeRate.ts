import { ExchangeRateData } from '@/types';
import { getCached, setCache } from './cache';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_KEY || '';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function getExchangeRate(): Promise<ExchangeRateData> {
  const cacheKey = 'usd_ngn_rate';
  const cached = getCached<ExchangeRateData>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/USD/NGN`
    );
    if (!res.ok) throw new Error(`ExchangeRate API error: ${res.status}`);
    const data = await res.json();

    if (data.result !== 'success') {
      throw new Error(data['error-type'] || 'Unknown error');
    }

    const result: ExchangeRateData = {
      usdToNgn: data.conversion_rate,
      lastUpdated: new Date().toISOString(),
    };
    setCache(cacheKey, result, CACHE_TTL);
    return result;
  } catch {
    if (cached) return cached;
    return { usdToNgn: 1550, lastUpdated: new Date().toISOString() };
  }
}

export function convertUsdToNgn(usd: number, rate: number): number {
  return usd * rate;
}

export function convertNgnToUsd(ngn: number, rate: number): number {
  return ngn / rate;
}
