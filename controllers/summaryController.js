// controllers/summaryController.js
const { generateSummary: geminiGenerate } = require("../services/geminiService");

async function getSummary(req, res) {
  const { prompt } = req.body;
  let transcript = "";

  // If a file was uploaded, read from memory buffer
  if (req.file) {
    transcript = req.file.buffer.toString("utf-8");
  } else if (req.body.transcript) {
    transcript = req.body.transcript;
  }

  if (!transcript || !prompt) {
    return res.status(400).json({ error: "Transcript and prompt are required" });
  }

  try {
    const summary = await geminiGenerate(transcript, prompt);
    res.json({ summary });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
}

module.exports = { getSummary };
