export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
}

export interface Topic {
  title: string;
  definition: string;
  criticalAnalysis: string;
  realWorldExample: string;
}

export interface Module {
  id: string;
  title: string;
  topics: Topic[];
  multipleChoiceQuiz: QuizQuestion[];
  shortAnswerQuiz: ShortAnswerQuestion[];
}

export interface StudyGuide {
  title: string;
  description: string;
  modules: Module[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING', // Reading files
  GENERATING = 'GENERATING', // Calling AI
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}