if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
