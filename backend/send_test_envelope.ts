import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

async function sendHiEmail() {
  const recipient = "priyanshusharma442004@gmail.com";
  console.log(`Attempting to send test email via Port ${process.env.SMTP_PORT} (Secure: ${process.env.SMTP_SECURE})...`);
  console.log("From:", process.env.SMTP_FROM);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: recipient,
      subject: "Test from Fixr - Envelope Test",
      text: "This is a test email.",
      envelope: {
          from: "info@fixerlocal.com", // Try raw email
          to: recipient
      }
    });
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

sendHiEmail();
