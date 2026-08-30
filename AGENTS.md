# AGENTS.md

## Cursor Cloud specific instructions

**ExamPrep AI** is a client-only React + TypeScript SPA built with Vite. There is no backend server or database.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000, host 0.0.0.0) |
| Production build | `npm run build` |
| Type check | `npx tsc --noEmit` |

### Notes

- No ESLint or test framework is configured. Use `npx tsc --noEmit` for static analysis.
- The app calls the Google Gemini API client-side. To test the full AI flow, create `.env.local` with `GEMINI_API_KEY=<your-key>`. Without it, the UI still loads and renders, but study guide generation will fail.
- Tailwind CSS is loaded via CDN in `index.html`, not installed as a local dependency.
- The `index.css` file referenced in `index.html` does not exist; Vite warns about this at build time but it is harmless.
- **Model deprecation (Aug 2026):** The `gemini-2.5-flash` model in `services/geminiService.ts` has been deprecated by Google. The API returns a 404 suggesting `gemini-3.6-flash`. Update the model string in `geminiService.ts` to restore study guide generation.
