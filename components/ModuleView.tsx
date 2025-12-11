import React from 'react';
import { Module } from '../types';
import { QuizSection } from './QuizSection';
import { BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';

interface ModuleViewProps {
  module: Module;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module }) => {
  return (
    <div className="mb-12 print-break-before">
      <div className="border-b-2 border-slate-800 pb-2 mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-900">{module.title}</h2>
      </div>

      <div className="space-y-10">
        {module.topics.map((topic, idx) => (
          <div key={idx} className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="bg-slate-800 text-white w-6 h-6 rounded flex items-center justify-center text-sm">{idx + 1}</span>
              {topic.title}
            </h3>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Definition */}
              <div className="bg-blue-50/50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <h4>Definition</h4>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {topic.definition}
                </p>
              </div>

              {/* Critical Analysis */}
              <div className="bg-amber-50/50 p-5 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2 text-amber-700 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <h4>Critical Analysis</h4>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  {topic.criticalAnalysis}
                </p>
              </div>

              {/* Real World Example */}
              <div className="bg-emerald-50/50 p-5 rounded-lg border border-emerald-100">
                 <div className="flex items-center gap-2 mb-2 text-emerald-700 font-semibold">
                  <Lightbulb className="w-4 h-4" />
                  <h4>Application</h4>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {topic.realWorldExample}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quiz Section - Hidden in Print if user wants, but currently visible */}
      <QuizSection 
        mcQuestions={module.multipleChoiceQuiz} 
        saQuestions={module.shortAnswerQuiz} 
      />
    </div>
  );
};