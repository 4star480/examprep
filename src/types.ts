export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  market: 'US' | 'NGX';
  currency: 'USD' | 'NGN';
  lastUpdated: string;
}

export interface TradeRecommendation {
  stock: StockQuote;
  action: 'BUY' | 'HOLD' | 'SELL';
  confidence: 'Low' | 'Medium' | 'High';
  reason: string;
  suggestedAmount: number;
  suggestedShares: number;
}

export interface PortfolioTrade {
  id: string;
  symbol: string;
  name: string;
  market: 'US' | 'NGX';
  quantity: number;
  buyPrice: number;
  currency: 'USD' | 'NGN';
  date: string;
  notes?: string;
}

export interface PortfolioHolding extends PortfolioTrade {
  currentPrice?: number;
  gainLoss?: number;
  gainLossPercent?: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  market: 'US' | 'NGX';
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface ExchangeRateData {
  usdToNgn: number;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: string;
  budgetExample?: string;
}

export interface TraderStrategy {
  id: string;
  trader: string;
  name: string;
  philosophy: string;
  keyPrinciples: string[];
  budgetApplication: string;
}

export type Page = 'dashboard' | 'picks' | 'portfolio' | 'learn' | 'chat';
