import { GoogleGenAI, Type } from "@google/genai";
import { PortfolioData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const portfolioSchema = {
  type: Type.OBJECT,
  properties: {
    hero: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, title: { type: Type.STRING }, description: { type: Type.STRING }, cta: { type: Type.STRING } }, required: ["name", "title", "description", "cta"] },
    about: { type: Type.OBJECT, properties: { text: { type: Type.STRING } }, required: ["text"] },
    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
    projects: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING }, tags: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["title", "description", "tags"] } },
    experience: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { role: { type: Type.STRING }, company: { type: Type.STRING }, period: { type: Type.STRING }, description: { type: Type.STRING } }, required: ["role", "company", "period", "description"] } },
    contact: { type: Type.OBJECT, properties: { email: { type: Type.STRING }, socials: { type: Type.OBJECT, properties: { github: { type: Type.STRING }, linkedin: { type: Type.STRING }, twitter: { type: Type.STRING } } } }, required: ["email", "socials"] }
  },
  required: ["hero", "about", "skills", "projects", "experience", "contact"]
};

export const generatePortfolio = async (prompt: string): Promise<PortfolioData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate professional portfolio data for: "${prompt}"`,
    config: { responseMimeType: "application/json", responseSchema: portfolioSchema },
  });
  return JSON.parse(response.text || '{}');
};
