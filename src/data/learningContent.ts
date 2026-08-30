import { LearningTopic } from '@/types';

export const learningTopics: LearningTopic[] = [
  {
    id: 'what-are-stocks',
    title: 'What Are Stocks?',
    icon: '📊',
    description: 'The basics of stock ownership and how the market works.',
    content: `A **stock** (also called a share or equity) represents partial ownership in a company. When you buy a stock, you own a tiny piece of that business.

**How it works:** Companies sell shares to raise money for growth. As the company grows and becomes more profitable, its stock price typically rises — meaning your shares become more valuable.

**Two ways to profit:**
- **Capital gains** — Buy low, sell high. If you buy a stock at $10 and it rises to $15, you profit $5 per share.
- **Dividends** — Some companies pay cash directly to shareholders, usually quarterly.

**Stock exchanges** are marketplaces where stocks are bought and sold:
- **NYSE & NASDAQ** — The two major US exchanges
- **NGX (Nigerian Exchange)** — Nigeria's stock exchange, based in Lagos`,
    budgetExample: 'With $5/day, you can buy fractional shares on apps like Robinhood or Webull. For example, you could own 0.03 shares of Apple ($170) or 2-3 full shares of a penny stock.',
  },
  {
    id: 'order-types',
    title: 'Order Types Explained',
    icon: '🎯',
    description: 'Market orders, limit orders, and when to use each.',
    content: `When you want to buy or sell a stock, you place an **order**. The two main types:

**Market Order** — Buy/sell immediately at the current price. Fast but you might pay slightly more/less than expected.
- ✅ Best for: Liquid stocks (Apple, Google) where the price doesn't jump around much
- ❌ Avoid for: Volatile penny stocks where prices can swing wildly

**Limit Order** — Buy/sell only at a specific price or better. You set your price.
- ✅ Best for: Getting a good entry price, volatile stocks
- ❌ Downside: Your order might not execute if the price never reaches your limit

**Stop-Loss Order** — Automatically sells if a stock drops to a certain price. This protects you from big losses.
- Example: Buy stock at $10, set stop-loss at $8. If it drops to $8, it auto-sells — limiting your loss to 20%.`,
    budgetExample: 'With $5 trades, use market orders for simplicity. As your portfolio grows, learn to use limit orders to get better prices on your buys.',
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    icon: '🛡️',
    description: 'How to protect your money while still growing it.',
    content: `The #1 rule of investing: **never invest money you can't afford to lose.**

**Key principles:**

**1. Diversification** — Don't put all your eggs in one basket. Spread across different stocks, sectors, and markets (US + Nigeria).

**2. Position sizing** — No single stock should be more than 10-20% of your total portfolio. With $5/day, this happens naturally as you buy different stocks over time.

**3. The 1% rule** — Never risk losing more than 1-2% of your total portfolio on a single trade.

**4. Dollar-Cost Averaging (DCA)** — Invest the same amount ($5) regularly regardless of price. Some days you buy high, some days low — it averages out and removes emotion from the equation.

**5. Have an exit plan** — Before buying, decide:
- At what price will you sell for profit? (Target price)
- At what price will you cut losses? (Stop-loss)`,
    budgetExample: 'Your $5/day budget is PERFECT for dollar-cost averaging. Investing $5 every day into an S&P 500 ETF (like SPY) over a year = $1,825 invested with natural price averaging.',
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    icon: '🔍',
    description: 'How to evaluate if a company is worth investing in.',
    content: `Fundamental analysis means evaluating a company's financial health to determine if its stock is a good buy.

**Key metrics to check:**

**P/E Ratio (Price-to-Earnings)** — Stock price ÷ earnings per share. Lower = potentially cheaper.
- Under 15: Potentially undervalued
- 15-25: Fairly valued
- Over 25: Potentially overvalued (or high growth expected)

**Revenue Growth** — Is the company making more money each year? Look for consistent 10%+ annual growth.

**Profit Margin** — What percentage of revenue is actual profit? Higher = more efficient business.

**Debt-to-Equity** — How much debt vs. shareholder equity? Lower is generally safer. Under 1.0 is ideal.

**Dividend Yield** — Annual dividend ÷ stock price. Nigerian banks like GTCO and Zenith often have yields of 8-12%+.

**Where to find this info:** Yahoo Finance, Google Finance, or ask our AI Chat!`,
    budgetExample: 'On the NGX, banks like GTCO (₦40-50) and Zenith Bank (₦35-45) are affordable with high dividend yields. With ₦7,500/day (≈$5), you can buy multiple shares.',
  },
  {
    id: 'technical-basics',
    title: 'Technical Analysis Basics',
    icon: '📈',
    description: 'Reading charts and spotting trends like a trader.',
    content: `Technical analysis uses price charts and patterns to predict future movements.

**Key concepts for beginners:**

**Trend** — The general direction of a stock price:
- **Uptrend** — Higher highs and higher lows (bullish 🟢)
- **Downtrend** — Lower highs and lower lows (bearish 🔴)
- **Sideways** — Price bouncing between levels (neutral)

**Moving Averages** — Smooth out price data to show the trend:
- **50-day MA** — Short-term trend
- **200-day MA** — Long-term trend
- When 50-day crosses ABOVE 200-day → "Golden Cross" (bullish signal)
- When 50-day crosses BELOW 200-day → "Death Cross" (bearish signal)

**RSI (Relative Strength Index)** — Measures if a stock is overbought or oversold (0-100):
- Over 70: Overbought (might drop soon)
- Under 30: Oversold (might bounce back)

**Support & Resistance** — Price levels where stocks tend to bounce (support) or reverse (resistance).`,
    budgetExample: 'Don\'t overthink technicals with $5 trades. Focus on buying quality stocks in uptrends and using dollar-cost averaging. The AI Chat can help you check basic technicals for any stock.',
  },
  {
    id: 'nigerian-market',
    title: 'Investing in the Nigerian Market (NGX)',
    icon: '🇳🇬',
    description: 'Everything you need to know about the Nigerian Stock Exchange.',
    content: `The **Nigerian Exchange (NGX)** is Africa's largest stock exchange by market cap, based in Lagos.

**Key sectors:**
- **Banking** — GTCO, Zenith, Access, UBA (high dividends, affordable shares)
- **Consumer goods** — Nestlé Nigeria, Dangote Sugar, BUA Foods
- **Industrial** — Dangote Cement, BUA Cement (infrastructure plays)
- **Telecom** — MTN Nigeria, Airtel Africa (growing mobile money)
- **Oil & Gas** — Seplat, Oando, TotalEnergies Nigeria

**Why invest in NGX?**
- Many quality stocks are very affordable (₦1-50 per share)
- High dividend yields (Nigerian banks often pay 8-15%)
- Growing economy and young population
- Currency diversification from USD

**Challenges:**
- Naira volatility against the dollar
- Lower liquidity than US markets
- Fewer fractional share options
- Trading hours: 10am-2:30pm WAT (Monday-Friday)

**How to invest:** Open an account with a Nigerian stockbroker (e.g., Bamboo, Chaka, or through a traditional broker). Some apps now allow diaspora investing.`,
    budgetExample: 'With ₦7,500/day (≈$5), you can buy 150+ shares of GTCO at ~₦50 each. Over a month, that builds to 3,000+ shares. The dividends alone could be ₦15,000-20,000/year.',
  },
];
