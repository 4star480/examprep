# AGENTS.md

## Cursor Cloud specific instructions

**TradeWise** is a client-only React + TypeScript SPA built with Vite. It provides AI-powered stock trading advice for beginner investors with a $5/day budget, covering both US and Nigerian (NGX) markets. There is no backend server or database — all data persists in `localStorage`.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000, host 0.0.0.0) |
| Production build | `npm run build` |
| Type check | `npx tsc --noEmit` |

### API Keys (in `.env.local`)

The app requires these environment variables:

```
VITE_GEMINI_API_KEY=<Google Gemini API key>
VITE_ALPHA_VANTAGE_KEY=<Alpha Vantage key — 25 req/day free tier>
VITE_NEWS_API_KEY=<NewsAPI key — 100 req/day free tier>
VITE_EXCHANGE_RATE_KEY=<ExchangeRate-API key — 1500 req/month free tier>
```

Without API keys the UI still loads, but AI features (Daily Picks, AI Chat) and live data (news, exchange rates) will fail gracefully with cached/fallback data.

### Architecture notes

- Tailwind CSS v4 installed locally via `@tailwindcss/vite` plugin (not CDN).
- Gemini model: `gemini-3.6-flash` (the `gemini-2.5-flash` model was deprecated Aug 2026).
- No ESLint or test framework configured. Use `npx tsc --noEmit` for static analysis.
- Alpha Vantage has a very strict 25 calls/day free-tier limit. The app caches responses in `localStorage` for 30 minutes. Expect rate-limit errors if developing features that make many quote requests.
- NewsAPI free tier only works from `localhost` origins (CORS-restricted in production).
- Nigerian market data uses curated static data in `src/data/nigerianStocks.ts` since no free NGX API exists.
