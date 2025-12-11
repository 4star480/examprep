import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StudyGuide } from "../types";

const STUDY_GUIDE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Overall title of the study guide based on uploaded documents" },
    description: { type: Type.STRING, description: "A brief motivational intro and summary of the materials." },
    modules: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          topics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                definition: { type: Type.STRING, description: "Clear, academic definition of the concept." },
                criticalAnalysis: { type: Type.STRING, description: "Critical perspective, pros/cons, or theoretical implications." },
                realWorldExample: { type: Type.STRING, description: "Concrete application in business, sociology, or psychology." },
              },
              required: ["title", "definition", "criticalAnalysis", "realWorldExample"],
            },
          },
          multipleChoiceQuiz: {
            type: Type.ARRAY,
            description: "3-5 multiple choice questions for this module.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING, description: "e.g., A, B, C, D" },
                      text: { type: Type.STRING },
                    },
                    required: ["id", "text"]
                  }
                },
                correctOptionId: { type: Type.STRING },
                explanation: { type: Type.STRING, description: "Why the answer is correct." }
              },
              required: ["id", "question", "options", "correctOptionId", "explanation"]
            }
          },
          shortAnswerQuiz: {
            type: Type.ARRAY,
            description: "1-2 short answer/essay style questions.",
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                sampleAnswer: { type: Type.STRING, description: "A model answer for the student to compare against." }
              },
              required: ["id", "question", "sampleAnswer"]
            }
          }
        },
        required: ["id", "title", "topics", "multipleChoiceQuiz", "shortAnswerQuiz"]
      }
    }
  },
  required: ["title", "description", "modules"]
};

export const generateStudyGuide = async (files: File[]): Promise<StudyGuide> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set REACT_APP_GEMINI_API_KEY or process.env.API_KEY");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Convert files to base64 parts
  const fileParts = await Promise.all(
    files.map(async (file) => {
      const base64Data = await fileToGenerativePart(file);
      return {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      };
    })
  );

  const prompt = `
    Act as a world-class academic tutor. 
    The user is preparing for an exam on the 12th and 13th of this month.
    Create a comprehensive, high-quality study guide based on the attached PDF course materials.
    
    The guide should be structured by logical Modules found in the texts (e.g., Statistics, Research Methods, Psychology Fundamentals, Sociology, Politics).
    
    For each module, extract key topics and provide:
    1. A clear Definition.
    2. A Critical Analysis (deep dive into meaning, constraints, or importance).
    3. A Real-World Application Example (practical usage).
    
    Also generate a Quiz for each module to test retention:
    - 3-5 Multiple Choice Questions (challenging but realistic).
    - 1-2 Short Answer Questions with model answers.
    
    Optimize for rapid learning and retention.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [...fileParts, { text: prompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: STUDY_GUIDE_SCHEMA,
        systemInstruction: "You are an expert tutor helping a student cram for exams efficiently. Be concise but thorough.",
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response generated");
    }
    
    return JSON.parse(text) as StudyGuide;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

const fileToGenerativePart = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};