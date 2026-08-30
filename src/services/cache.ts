import { getFromStorage, saveToStorage } from '@/utils/storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const DEFAULT_TTL = 15 * 60 * 1000; // 15 minutes

export function getCached<T>(key: string): T | null {
  const entry = getFromStorage<CacheEntry<T>>(`cache_${key}`);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) return null;
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttlMs,
  };
  saveToStorage(`cache_${key}`, entry);
}

export function getCacheTimestamp(key: string): string | null {
  const entry = getFromStorage<CacheEntry<unknown>>(`cache_${key}`);
  return entry ? new Date(entry.timestamp).toISOString() : null;
}
