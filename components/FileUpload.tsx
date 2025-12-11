import React, { useRef } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, isProcessing }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const handleDivClick = () => {
    if (!isProcessing) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <div 
        onClick={handleDivClick}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
          ${isProcessing 
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-70' 
            : 'border-brand-500 bg-brand-50 hover:bg-brand-100 hover:border-brand-600'
          }
        `}
      >
        <input 
          type="file" 
          multiple 
          accept="application/pdf"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${isProcessing ? 'bg-gray-200' : 'bg-white shadow-md'}`}>
            <Upload className={`w-8 h-8 ${isProcessing ? 'text-gray-400' : 'text-brand-600'}`} />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-slate-800">
              {isProcessing ? 'Processing Documents...' : 'Upload Course Materials'}
            </h3>
            <p className="text-slate-500 text-sm">
              {isProcessing 
                ? 'Our AI is reading your PDFs and creating a personalized study guide.' 
                : 'Select your PDF files (e.g., Statistics, Psychology).'}
            </p>
          </div>

          {!isProcessing && (
            <div className="flex gap-2 mt-4 text-xs text-slate-400 bg-white px-3 py-1 rounded-md shadow-sm border border-slate-100">
              <FileText className="w-4 h-4" />
              <span>Supports PDF</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>Tip:</strong> Uploading both "Business Statistics" and "Fundamentals of Psychology" together allows the AI to create a unified study plan for your upcoming exams on the 12th & 13th.
        </p>
      </div>
    </div>
  );
};