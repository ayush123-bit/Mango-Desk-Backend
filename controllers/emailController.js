const { sendEmail } = require("../services/emailService");
const { validateEmail } = require("../utils/validators");

async function sendSummary(req, res) {
  const { summary, recipients } = req.body;

  if (!summary || !recipients || !Array.isArray(recipients)) {
    return res.status(400).json({ error: "Summary and recipients are required" });
  }

  const invalidEmails = recipients.filter(email => !validateEmail(email));
  if (invalidEmails.length > 0) {
    return res.status(400).json({ error: `Invalid emails: ${invalidEmails.join(", ")}` });
  }

  try {
    await sendEmail(recipients, summary);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { sendSummary };
