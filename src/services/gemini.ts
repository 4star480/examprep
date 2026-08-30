import { GoogleGenAI } from '@google/genai';
import { TradeRecommendation, ChatMessage } from '@/types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const MODEL = 'gemini-3.6-flash';

function getAI() {
  if (!API_KEY) throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to .env.local');
  return new GoogleGenAI({ apiKey: API_KEY });
}

export async function generateDailyPicks(
  budget: number,
  exchangeRate: number,
  existingPortfolio: string[],
): Promise<TradeRecommendation[]> {
  const ai = getAI();

  const prompt = `You are an expert stock market analyst advising a beginner investor with a daily budget of $${budget} USD.
The current USD to NGN exchange rate is approximately ${exchangeRate}.
The investor already holds: ${existingPortfolio.length > 0 ? existingPortfolio.join(', ') : 'nothing yet'}.

Generate exactly 6 stock trade recommendations — 3 from the US market and 3 from the Nigerian Stock Exchange (NGX).

For US stocks, focus on:
- Fractional shares of quality companies affordable at $${budget} or less
- Include a mix: 1 growth stock, 1 value/dividend stock, 1 ETF

For Nigerian stocks, focus on:
- Stocks trading on the NGX that are affordable (under ₦${Math.round(budget * exchangeRate)})
- Include a mix of banking, consumer goods, and industrial stocks
- Popular NGX tickers include: DANGCEM, GTCO, ZENITHBA, MTNN, BUACEMENT, NESTLE, AIRTELAFRI, ACCESSCORP, UBA, SEPLAT

Return ONLY valid JSON array with this exact structure (no markdown, no code fences):
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 178.50,
    "market": "US",
    "currency": "USD",
    "action": "BUY",
    "confidence": "High",
    "reason": "Strong earnings, growing services revenue, good entry point for fractional shares",
    "suggestedAmount": 5.00,
    "suggestedShares": 0.028
  }
]

Be specific with current approximate prices. Give actionable, educational reasons.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  const text = response.text?.trim() || '[]';
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  const picks = JSON.parse(cleaned) as Array<{
    symbol: string;
    name: string;
    price: number;
    market: 'US' | 'NGX';
    currency: 'USD' | 'NGN';
    action: 'BUY' | 'HOLD' | 'SELL';
    confidence: 'Low' | 'Medium' | 'High';
    reason: string;
    suggestedAmount: number;
    suggestedShares: number;
  }>;

  return picks.map((p) => ({
    stock: {
      symbol: p.symbol,
      name: p.name,
      price: p.price,
      change: 0,
      changePercent: 0,
      market: p.market,
      currency: p.currency,
      lastUpdated: new Date().toISOString(),
    },
    action: p.action,
    confidence: p.confidence,
    reason: p.reason,
    suggestedAmount: p.suggestedAmount,
    suggestedShares: p.suggestedShares,
  }));
}

export async function analyzeStock(symbol: string, market: 'US' | 'NGX'): Promise<string> {
  const ai = getAI();

  const prompt = `You are a friendly stock market expert explaining to a beginner investor.

Analyze the stock ${symbol} (${market} market) and provide:

1. **Company Overview** — What does this company do? (2-3 sentences)
2. **Recent Performance** — How has the stock been performing recently?
3. **Key Strengths** — 2-3 bullet points
4. **Key Risks** — 2-3 bullet points
5. **Recommendation** — Should a beginner with a $5/day budget buy, hold, or avoid? Why?
6. **Budget Tip** — How to invest in this stock with just $5

Keep it beginner-friendly. Use simple language. Be balanced — mention both opportunities and risks.

⚠️ End with a disclaimer that this is educational content, not financial advice.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text || 'Unable to generate analysis.';
}

export async function chatWithAdvisor(
  messages: ChatMessage[],
  userMessage: string,
): Promise<string> {
  const ai = getAI();

  const history = messages
    .slice(-10)
    .map((m) => `${m.role === 'user' ? 'User' : 'Advisor'}: ${m.content}`)
    .join('\n');

  const prompt = `You are TradeWise AI, a friendly and knowledgeable stock market advisor for beginners.
The user has a daily budget of $5 USD and is interested in both US and Nigerian (NGX) stock markets.

Conversation history:
${history}

User: ${userMessage}

Respond helpfully and concisely. Use simple language suitable for a beginner investor.
If asked about specific stocks, provide balanced analysis with both opportunities and risks.
If asked for recommendations, suggest specific tickers with approximate prices and reasoning.
Always remind users this is educational content, not financial advice, when giving specific recommendations.
Format your response with markdown for readability.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
}
