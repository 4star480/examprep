import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { learningTopics } from '@/data/learningContent';
import { traderStrategies } from '@/data/tradingStrategies';

interface LearningCenterProps {
  isDark: boolean;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({ isDark }) => {
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [openStrategy, setOpenStrategy] = useState<string | null>(null);
  const [tab, setTab] = useState<'concepts' | 'strategies'>('concepts');

  const heading = isDark ? 'text-white' : 'text-gray-900';
  const label = isDark ? 'text-slate-400' : 'text-gray-500';
  const card = `rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className={`text-2xl font-bold ${heading}`}>Learning Center</h2>
        <p className={`text-sm ${label}`}>Master investing fundamentals and strategies from the greats</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('concepts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
            ${tab === 'concepts'
              ? 'bg-emerald-600 text-white'
              : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <BookOpen className="w-4 h-4" /> Concepts
        </button>
        <button
          onClick={() => setTab('strategies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
            ${tab === 'strategies'
              ? 'bg-emerald-600 text-white'
              : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          <Lightbulb className="w-4 h-4" /> Trader Strategies
        </button>
      </div>

      {/* Concepts */}
      {tab === 'concepts' && (
        <div className="space-y-3">
          {learningTopics.map((topic) => {
            const isOpen = openTopic === topic.id;
            return (
              <div key={topic.id} className={card}>
                <button
                  onClick={() => setOpenTopic(isOpen ? null : topic.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold ${heading}`}>{topic.title}</p>
                    <p className={`text-sm ${label}`}>{topic.description}</p>
                  </div>
                  {isOpen ? <ChevronDown className={`w-5 h-5 ${label}`} /> : <ChevronRight className={`w-5 h-5 ${label}`} />}
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                    <div className={`mt-4 text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      {topic.content.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className={heading}>{part}</strong> : <span key={i}>{part}</span>
                      )}
                    </div>
                    {topic.budgetExample && (
                      <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-emerald-900/20 border border-emerald-800/40' : 'bg-emerald-50 border border-emerald-200'}`}>
                        <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                          💰 $5/Day Budget Application
                        </p>
                        <p className={`text-sm ${isDark ? 'text-emerald-300/80' : 'text-emerald-600'}`}>{topic.budgetExample}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Strategies */}
      {tab === 'strategies' && (
        <div className="space-y-3">
          {traderStrategies.map((strategy) => {
            const isOpen = openStrategy === strategy.id;
            return (
              <div key={strategy.id} className={card}>
                <button
                  onClick={() => setOpenStrategy(isOpen ? null : strategy.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    {strategy.trader.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${heading}`}>{strategy.name}</p>
                    <p className={`text-sm ${label}`}>{strategy.trader}</p>
                  </div>
                  {isOpen ? <ChevronDown className={`w-5 h-5 ${label}`} /> : <ChevronRight className={`w-5 h-5 ${label}`} />}
                </button>
                {isOpen && (
                  <div className={`px-4 pb-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-100'}`}>
                    <p className={`mt-4 text-sm italic ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                      "{strategy.philosophy}"
                    </p>
                    <h4 className={`mt-4 text-sm font-semibold ${heading}`}>Key Principles:</h4>
                    <ul className="mt-2 space-y-1.5">
                      {strategy.keyPrinciples.map((p, i) => (
                        <li key={i} className={`text-sm flex gap-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                          <span className="text-emerald-500 shrink-0">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-emerald-900/20 border border-emerald-800/40' : 'bg-emerald-50 border border-emerald-200'}`}>
                      <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        💰 How to Apply with $5/Day
                      </p>
                      <p className={`text-sm ${isDark ? 'text-emerald-300/80' : 'text-emerald-600'}`}>{strategy.budgetApplication}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
