const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require("../config/config");

async function sendEmail(recipients, summary) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use TLS
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"AyushRai-Lumio" <${emailUser}>`,
      to: recipients.join(", "),
      subject: "Mongo-Desk Summary",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4A90E2;">Meeting Summary</h2>
          <p>Dear Team,</p>
          <p>Here is the <strong>AI-generated summary</strong> of your recent meeting:</p>
          <div style="padding: 15px; background-color: #f4f4f4; border-radius: 8px; margin: 10px 0;">
            <pre style="white-space: pre-wrap; word-wrap: break-word; font-family: 'Courier New', monospace; font-size: 14px;">
${summary}
            </pre>
          </div>
          <p>Please review and take necessary actions as required.</p>
          <p style="margin-top: 20px;">Best regards,<br>
          <strong>AyushRai-Lumio</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999;">This is an automated email, please do not reply.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send email");
  }
}

module.exports = { sendEmail };
