export interface StockEntry {
  symbol: string;
  name: string;
  price: number;
  market: 'US' | 'NGX';
  currency: 'USD' | 'NGN';
}

export const stockDirectory: StockEntry[] = [
  // US — Large Cap / Popular
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.50, market: 'US', currency: 'USD' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.00, market: 'US', currency: 'USD' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', price: 175.00, market: 'US', currency: 'USD' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 185.00, market: 'US', currency: 'USD' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 125.00, market: 'US', currency: 'USD' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 510.00, market: 'US', currency: 'USD' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.00, market: 'US', currency: 'USD' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway B', price: 420.00, market: 'US', currency: 'USD' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 200.00, market: 'US', currency: 'USD' },
  { symbol: 'V', name: 'Visa Inc.', price: 280.00, market: 'US', currency: 'USD' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 155.00, market: 'US', currency: 'USD' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 165.00, market: 'US', currency: 'USD' },
  { symbol: 'PG', name: 'Procter & Gamble Co.', price: 160.00, market: 'US', currency: 'USD' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 460.00, market: 'US', currency: 'USD' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 530.00, market: 'US', currency: 'USD' },
  { symbol: 'HD', name: 'Home Depot Inc.', price: 345.00, market: 'US', currency: 'USD' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 112.00, market: 'US', currency: 'USD' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 630.00, market: 'US', currency: 'USD' },
  { symbol: 'KO', name: 'Coca-Cola Co.', price: 62.00, market: 'US', currency: 'USD' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', price: 170.00, market: 'US', currency: 'USD' },
  { symbol: 'COST', name: 'Costco Wholesale', price: 740.00, market: 'US', currency: 'USD' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', price: 170.00, market: 'US', currency: 'USD' },
  { symbol: 'CRM', name: 'Salesforce Inc.', price: 265.00, market: 'US', currency: 'USD' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 160.00, market: 'US', currency: 'USD' },
  { symbol: 'INTC', name: 'Intel Corp.', price: 30.00, market: 'US', currency: 'USD' },
  { symbol: 'BA', name: 'Boeing Co.', price: 180.00, market: 'US', currency: 'USD' },
  { symbol: 'NKE', name: 'Nike Inc.', price: 95.00, market: 'US', currency: 'USD' },
  { symbol: 'SBUX', name: 'Starbucks Corp.', price: 98.00, market: 'US', currency: 'USD' },
  { symbol: 'T', name: 'AT&T Inc.', price: 17.50, market: 'US', currency: 'USD' },
  { symbol: 'VZ', name: 'Verizon Comm.', price: 40.00, market: 'US', currency: 'USD' },
  { symbol: 'PYPL', name: 'PayPal Holdings', price: 65.00, market: 'US', currency: 'USD' },
  { symbol: 'SQ', name: 'Block Inc. (Square)', price: 70.00, market: 'US', currency: 'USD' },
  { symbol: 'UBER', name: 'Uber Technologies', price: 72.00, market: 'US', currency: 'USD' },
  { symbol: 'SNAP', name: 'Snap Inc.', price: 12.00, market: 'US', currency: 'USD' },
  { symbol: 'PLTR', name: 'Palantir Technologies', price: 22.00, market: 'US', currency: 'USD' },
  { symbol: 'SOFI', name: 'SoFi Technologies', price: 8.50, market: 'US', currency: 'USD' },
  { symbol: 'F', name: 'Ford Motor Co.', price: 12.00, market: 'US', currency: 'USD' },
  { symbol: 'GM', name: 'General Motors Co.', price: 38.00, market: 'US', currency: 'USD' },
  { symbol: 'COIN', name: 'Coinbase Global', price: 180.00, market: 'US', currency: 'USD' },
  { symbol: 'SHOP', name: 'Shopify Inc.', price: 68.00, market: 'US', currency: 'USD' },

  // US — ETFs
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 510.00, market: 'US', currency: 'USD' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 470.00, market: 'US', currency: 'USD' },
  { symbol: 'QQQ', name: 'Invesco NASDAQ 100 ETF', price: 440.00, market: 'US', currency: 'USD' },
  { symbol: 'VTI', name: 'Vanguard Total Stock ETF', price: 260.00, market: 'US', currency: 'USD' },
  { symbol: 'SCHD', name: 'Schwab US Dividend ETF', price: 78.00, market: 'US', currency: 'USD' },
  { symbol: 'DIA', name: 'SPDR Dow Jones ETF', price: 390.00, market: 'US', currency: 'USD' },
  { symbol: 'IWM', name: 'iShares Russell 2000 ETF', price: 205.00, market: 'US', currency: 'USD' },
  { symbol: 'SPLG', name: 'SPDR Portfolio S&P 500', price: 58.00, market: 'US', currency: 'USD' },
  { symbol: 'VIG', name: 'Vanguard Dividend Apprec.', price: 175.00, market: 'US', currency: 'USD' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF', price: 48.00, market: 'US', currency: 'USD' },

  // NGX — Banking
  { symbol: 'GTCO', name: 'Guaranty Trust Holding', price: 48.50, market: 'NGX', currency: 'NGN' },
  { symbol: 'ZENITHBA', name: 'Zenith Bank Plc', price: 39.80, market: 'NGX', currency: 'NGN' },
  { symbol: 'ACCESSCORP', name: 'Access Holdings Plc', price: 19.50, market: 'NGX', currency: 'NGN' },
  { symbol: 'UBA', name: 'United Bank for Africa', price: 22.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'STANBIC', name: 'Stanbic IBTC Holdings', price: 62.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'FBNH', name: 'FBN Holdings Plc', price: 25.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'FCMB', name: 'FCMB Group Plc', price: 7.50, market: 'NGX', currency: 'NGN' },
  { symbol: 'FIDELITYBK', name: 'Fidelity Bank Plc', price: 11.50, market: 'NGX', currency: 'NGN' },
  { symbol: 'ETI', name: 'Ecobank Transnational', price: 18.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'WEMABANK', name: 'Wema Bank Plc', price: 6.80, market: 'NGX', currency: 'NGN' },

  // NGX — Industrial / Consumer
  { symbol: 'DANGCEM', name: 'Dangote Cement Plc', price: 290.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'BUACEMENT', name: 'BUA Cement Plc', price: 97.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'NESTLE', name: 'Nestlé Nigeria Plc', price: 900.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'BUAFOOD', name: 'BUA Foods Plc', price: 145.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'DANGSUGAR', name: 'Dangote Sugar Refinery', price: 32.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'FLOURMILL', name: 'Flour Mills of Nigeria', price: 42.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'NASCON', name: 'NASCON Allied Industries', price: 35.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'GUINNESS', name: 'Guinness Nigeria Plc', price: 85.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'NB', name: 'Nigerian Breweries Plc', price: 34.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'TRANSCORP', name: 'Transnational Corp. Plc', price: 8.50, market: 'NGX', currency: 'NGN' },

  // NGX — Telecom / Oil
  { symbol: 'MTNN', name: 'MTN Nigeria Comm Plc', price: 195.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'AIRTELAFRI', name: 'Airtel Africa Plc', price: 1650.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'SEPLAT', name: 'Seplat Energy Plc', price: 2800.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'OANDO', name: 'Oando Plc', price: 12.00, market: 'NGX', currency: 'NGN' },
  { symbol: 'TOTAL', name: 'TotalEnergies Mktg Nig.', price: 350.00, market: 'NGX', currency: 'NGN' },
];

export function searchStocks(query: string, market?: 'US' | 'NGX'): StockEntry[] {
  if (!query || query.length < 1) return [];
  const q = query.toUpperCase();
  return stockDirectory
    .filter((s) => {
      if (market && s.market !== market) return false;
      return s.symbol.includes(q) || s.name.toUpperCase().includes(q);
    })
    .slice(0, 8);
}
