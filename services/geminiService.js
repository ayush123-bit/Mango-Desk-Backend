// services/geminiService.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in .env file");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateSummary(transcript, prompt) {
  try {
    console.log("✅ Inside generateSummary function");
    console.log("📌 Prompt received:", prompt);
    console.log("📌 Transcript length:", transcript?.length || 0);

    const fullPrompt = `${prompt}\n\nTranscript:\n${transcript}`;
    console.log("📌 Sending request to Gemini API...");

    const result = await model.generateContent(fullPrompt);

    console.log("✅ Gemini API response received");

    let summary = result.response?.text() || "";
    console.log("📌 Raw summary from Gemini:", summary);

    // Remove bold/italic markdown but keep bullets and numbering
    summary = summary.replace(/\*\*(.*?)\*\*/g, "$1");
    summary = summary.replace(/(?<!^)\*(.*?)\*/g, "$1");

    // Optional: trim extra spaces
    summary = summary.trim();

    console.log("✅ Final cleaned summary:", summary);
    return summary || "⚠️ No summary generated.";
  } catch (error) {
    console.error("❌ Gemini API error:", error.message || error);

    // Return a safe fallback message for testing
    return "⚠️ Error while generating summary. Check server logs.";
  }
}

module.exports = { generateSummary };
