import React, { useState } from 'react';
import { QuizQuestion, ShortAnswerQuestion } from '../types';
import { CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface QuizSectionProps {
  mcQuestions: QuizQuestion[];
  saQuestions: ShortAnswerQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ mcQuestions, saQuestions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  const [expandedSA, setExpandedSA] = useState<Record<string, boolean>>({});

  const handleOptionSelect = (qId: string, optId: string) => {
    if (selectedAnswers[qId]) return; // Prevent changing answer after selection
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const toggleSA = (id: string) => {
    setExpandedSA(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mt-8 space-y-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6 no-print">
      <div className="border-b border-slate-100 pb-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-brand-600" />
          Test Your Knowledge
        </h3>
        <p className="text-slate-500 text-sm mt-1">Practice questions generated from the material.</p>
      </div>

      {/* Multiple Choice Section */}
      <div className="space-y-8">
        {mcQuestions.map((q, idx) => {
          const isAnswered = !!selectedAnswers[q.id];
          const isCorrect = selectedAnswers[q.id] === q.correctOptionId;

          return (
            <div key={q.id} className="space-y-3">
              <p className="font-medium text-slate-800">
                <span className="text-slate-400 mr-2">{idx + 1}.</span>
                {q.question}
              </p>
              
              <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
                {q.options.map((opt) => {
                  let btnClass = "w-full text-left p-3 rounded-lg border text-sm transition-all ";
                  
                  if (isAnswered) {
                    if (opt.id === q.correctOptionId) {
                       btnClass += "bg-green-50 border-green-200 text-green-800 font-medium";
                    } else if (selectedAnswers[q.id] === opt.id) {
                       btnClass += "bg-red-50 border-red-200 text-red-800";
                    } else {
                       btnClass += "bg-gray-50 border-gray-100 text-gray-400";
                    }
                  } else {
                    btnClass += "bg-white border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-700";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(q.id, opt.id)}
                      disabled={isAnswered}
                      className={btnClass}
                    >
                      <span className="font-bold mr-2 opacity-60">{opt.id}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              {showExplanation[q.id] && (
                <div className={`mt-2 text-sm p-3 rounded-md flex items-start gap-2 ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {isCorrect ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <XCircle className="w-5 h-5 flex-shrink-0" />}
                  <div>
                    <span className="font-bold block mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <hr className="border-slate-100" />

      {/* Short Answer Section */}
      <div>
        <h4 className="font-semibold text-slate-700 mb-4">Short Answer / Essay Practice</h4>
        <div className="space-y-4">
          {saQuestions.map((sa, idx) => (
            <div key={sa.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleSA(sa.id)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors"
              >
                <span className="font-medium text-slate-800 text-sm">
                   <span className="text-brand-600 font-bold mr-2">Q{idx + 1}:</span>
                   {sa.question}
                </span>
                {expandedSA[sa.id] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {expandedSA[sa.id] && (
                <div className="p-4 bg-white border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Model Answer</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{sa.sampleAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};