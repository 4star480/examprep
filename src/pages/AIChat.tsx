import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage } from '@/types';
import { chatWithAdvisor, analyzeStock } from '@/services/gemini';
import { generateId } from '@/utils/format';
import { getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';

interface AIChatProps {
  isDark: boolean;
}

const quickPrompts = [
  '🏁 What should a complete beginner buy first with $5?',
  '🇳🇬 Best Nigerian stocks under ₦100 for beginners?',
  '📊 Explain P/E ratio in simple terms',
  '💰 How does dollar-cost averaging work?',
  '🇺🇸 Best US ETFs for a $5/day investor?',
  '⚠️ What are the biggest mistakes beginner investors make?',
];

export const AIChat: React.FC<AIChatProps> = ({ isDark }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return getFromStorage<ChatMessage[]>('tradewise_chat_history') || [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    saveToStorage('tradewise_chat_history', messages);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const pendingSymbol = getFromStorage<string>('tradewise_pending_analysis');
    if (pendingSymbol) {
      removeFromStorage('tradewise_pending_analysis');
      handleAnalyze(pendingSymbol);
    }
  }, []);

  const handleAnalyze = async (symbol: string) => {
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: `Analyze ${symbol} stock for me`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const analysis = await analyzeStock(symbol, symbol.length > 4 ? 'NGX' : 'US');
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: analysis,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I had trouble analyzing that stock. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAdvisor([...messages, userMsg], messageText);
      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    removeFromStorage('tradewise_chat_history');
  };

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const label = isDark ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className={`text-2xl font-bold ${heading}`}>AI Trading Advisor</h2>
          <p className={`text-sm ${label}`}>Ask anything about stocks, markets, or investing strategies</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-500'}`} title="Clear chat">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto rounded-xl border p-4 space-y-4 ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center space-y-2">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className={`text-lg font-medium ${heading}`}>TradeWise AI Advisor</p>
              <p className={`text-sm ${label} max-w-md`}>
                I can help you understand stocks, analyze companies, and make informed decisions with your $5/day budget.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg w-full">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className={`text-left text-sm px-3 py-2 rounded-lg border transition
                    ${isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-gray-200 hover:bg-white text-gray-600'}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white'
                : isDark ? 'bg-slate-800 text-slate-200' : 'bg-white text-gray-700 border border-gray-200'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.content.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className={`rounded-xl px-4 py-3 flex items-center gap-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-gray-500 border border-gray-200'}`}>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="pt-4">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className={`flex items-center gap-2 p-2 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'}`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stocks, strategies, or markets..."
            className={`flex-1 px-3 py-2 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'}`}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
