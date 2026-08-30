import { StockQuote } from '@/types';

export const popularNGXStocks: StockQuote[] = [
  { symbol: 'DANGCEM', name: 'Dangote Cement Plc', price: 290.00, change: 4.50, changePercent: 1.58, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'MTNN', name: 'MTN Nigeria Comm Plc', price: 195.00, change: -2.00, changePercent: -1.02, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'GTCO', name: 'Guaranty Trust Holding', price: 48.50, change: 1.20, changePercent: 2.54, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'ZENITHBA', name: 'Zenith Bank Plc', price: 39.80, change: 0.85, changePercent: 2.18, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'AIRTELAFRI', name: 'Airtel Africa Plc', price: 1650.00, change: -15.00, changePercent: -0.90, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'BUACEMENT', name: 'BUA Cement Plc', price: 97.00, change: 2.30, changePercent: 2.43, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'ACCESSCORP', name: 'Access Holdings Plc', price: 19.50, change: 0.45, changePercent: 2.36, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'UBA', name: 'United Bank for Africa', price: 22.00, change: -0.30, changePercent: -1.35, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'NESTLE', name: 'Nestlé Nigeria Plc', price: 900.00, change: 10.00, changePercent: 1.12, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'SEPLAT', name: 'Seplat Energy Plc', price: 2800.00, change: 50.00, changePercent: 1.82, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'BUAFOOD', name: 'BUA Foods Plc', price: 145.00, change: 3.50, changePercent: 2.47, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
  { symbol: 'STANBIC', name: 'Stanbic IBTC Holdings', price: 62.00, change: 1.00, changePercent: 1.64, market: 'NGX', currency: 'NGN', lastUpdated: new Date().toISOString() },
];

export const ngxIndices = [
  { name: 'NGX All-Share', symbol: 'NGXASI', value: 98750, change: 450, changePercent: 0.46, market: 'NGX' as const },
  { name: 'NGX 30', symbol: 'NGX30', value: 3245, change: 18, changePercent: 0.56, market: 'NGX' as const },
];
