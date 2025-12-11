import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ModuleView } from './components/ModuleView';
import { generateStudyGuide } from './services/geminiService';
import { StudyGuide, AppStatus } from './types';
import { BookOpen, Loader2, Download, RefreshCcw } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleFilesSelected = async (files: File[]) => {
    setStatus(AppStatus.UPLOADING);
    try {
      setStatus(AppStatus.GENERATING);
      const data = await generateStudyGuide(files);
      setStudyGuide(data);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const reset = () => {
    setStudyGuide(null);
    setStatus(AppStatus.IDLE);
    setErrorMsg('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header - Hidden on Print */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 no-print shadow-sm">
        <div className="flex items-center gap-2 text-brand-700">
          <div className="bg-brand-600 p-2 rounded-lg text-white">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">ExamPrep<span className="text-brand-600">.AI</span></h1>
        </div>
        
        {status === AppStatus.SUCCESS && (
          <div className="flex gap-3">
             <button 
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              New Study Guide
            </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              Save as PDF / Print
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-50 p-4 md:p-8">
        
        {/* State: IDLE / UPLOADING */}
        {(status === AppStatus.IDLE || status === AppStatus.UPLOADING) && (
           <div className="h-full flex flex-col items-center justify-center">
             <div className="text-center mb-8 max-w-lg">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Master Your Material in Record Time.</h2>
                <p className="text-slate-600 leading-relaxed">
                  Upload your course PDFs. Our AI analyzes the content, breaks it down into key definitions and concepts, and creates custom quizzes to ensure you are ready for your exams on the 12th & 13th.
                </p>
             </div>
             <FileUpload onFilesSelected={handleFilesSelected} isProcessing={status === AppStatus.UPLOADING} />
           </div>
        )}

        {/* State: GENERATING */}
        {status === AppStatus.GENERATING && (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-brand-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Loader2 className="w-6 h-6 text-brand-600 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-slate-800">Generating Study Guide...</h3>
              <p className="text-slate-500 max-w-md">This might take a minute depending on the size of your documents. We are extracting definitions, analyzing concepts, and generating quiz questions.</p>
            </div>
          </div>
        )}

        {/* State: ERROR */}
        {status === AppStatus.ERROR && (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-center max-w-md">
              <h3 className="text-red-800 font-bold text-lg mb-2">Generation Failed</h3>
              <p className="text-red-600 mb-6">{errorMsg}</p>
              <button 
                onClick={reset}
                className="px-6 py-2 bg-white border border-red-200 text-red-700 font-medium rounded-lg hover:bg-red-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* State: SUCCESS (Study Guide Display) */}
        {status === AppStatus.SUCCESS && studyGuide && (
          <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden min-h-screen">
            {/* Guide Header */}
            <div className="bg-slate-900 text-white p-8 md:p-12 print:bg-white print:text-black print:border-b-2 print:border-black">
               <div className="uppercase tracking-widest text-xs font-bold text-brand-400 mb-4">Comprehensive Review</div>
               <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">{studyGuide.title}</h1>
               <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl border-l-4 border-brand-500 pl-6 print:text-black print:border-black">
                 {studyGuide.description}
               </p>
            </div>

            {/* Modules List */}
            <div className="p-8 md:p-12 space-y-16">
              {studyGuide.modules.map((module) => (
                <ModuleView key={module.id} module={module} />
              ))}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-8 text-center text-slate-400 text-sm no-print">
              Generated by ExamPrep AI • Good luck on your exams!
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;