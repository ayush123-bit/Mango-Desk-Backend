// services/geminiService.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();  // load .env only in local dev
}

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Debug log (just once, careful not to log the full key in production)
console.log("🔑 GEMINI_API_KEY present?", !!process.env.GEMINI_API_KEY);

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing (check Railway Variables or .env file)");
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

    // Remove markdown but keep numbering/bullets
    summary = summary.replace(/\*\*(.*?)\*\*/g, "$1").replace(/(?<!^)\*(.*?)\*/g, "$1").trim();

    console.log("✅ Final cleaned summary:", summary);
    return summary || "⚠️ No summary generated.";
  } catch (error) {
    console.error("❌ Gemini API error:", error.message || error);
    return "⚠️ Error while generating summary. Check server logs.";
  }
}

module.exports = { generateSummary };
