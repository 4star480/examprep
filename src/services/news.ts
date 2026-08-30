import { NewsArticle } from '@/types';
import { getCached, setCache } from './cache';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
const BASE_URL = 'https://newsapi.org/v2';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

export async function getMarketNews(): Promise<NewsArticle[]> {
  const cacheKey = 'market_news';
  const cached = getCached<NewsArticle[]>(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/top-headlines?category=business&country=us&pageSize=10&apiKey=${API_KEY}`
    );
    if (!res.ok) throw new Error(`NewsAPI error: ${res.status}`);
    const data = await res.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'NewsAPI error');
    }

    const articles: NewsArticle[] = (data.articles || [])
      .filter((a: Record<string, unknown>) => a.title && a.title !== '[Removed]')
      .map((a: Record<string, string>) => ({
        title: a.title,
        description: a.description || '',
        url: a.url,
        source: (a.source as unknown as { name: string })?.name || 'Unknown',
        publishedAt: a.publishedAt,
        imageUrl: a.urlToImage || undefined,
      }));

    setCache(cacheKey, articles, CACHE_TTL);
    return articles;
  } catch {
    return cached ?? [];
  }
}
