// services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateSummary(transcript, prompt) {
  try {
    const fullPrompt = `${prompt}\n\nTranscript:\n${transcript}`;
    const result = await model.generateContent(fullPrompt);
    let summary = result.response?.text() || "";

    // Remove bold/italic markdown but keep bullets and numbering
    summary = summary.replace(/\*\*(.*?)\*\*/g, "$1"); 
    summary = summary.replace(/(?<!^)\*(.*?)\*/g, "$1"); 

    // Optional: trim extra spaces
    summary = summary.trim();

    return summary;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate summary");
  }
}

module.exports = { generateSummary };
