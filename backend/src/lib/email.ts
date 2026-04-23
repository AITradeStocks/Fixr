import nodemailer from "nodemailer";

const port = parseInt(process.env.SMTP_PORT || "587");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: port,
  secure: false, // Port 587 uses STARTTLS, so secure should be false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Sends a professional verification email to contractors.
 */
export async function sendVerificationEmail(email: string, code: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 28px; font-weight: 900; color: #059669; letter-spacing: -0.025em; }
          .content { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 24px; padding: 40px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          .title { font-size: 24px; font-weight: 800; color: #111827; margin-top: 0; }
          .otp-container { background: #f9fafb; border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; border: 1px dashed #d1d5db; }
          .otp-code { font-size: 48px; font-weight: 900; letter-spacing: 0.25em; color: #059669; font-family: 'Roboto Mono', monospace; }
          .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #6b7280; }
          .button { display: inline-block; padding: 12px 24px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">FIXR <span style="color: #111827">ELITE</span></div>
          </div>
          <div class="content">
            <h1 class="title">Security Verification</h1>
            <p>To finalize your contractor registration and access the Fixr Elite network, please enter the following 6-digit verification code:</p>
            
            <div class="otp-container">
              <div class="otp-code">${code}</div>
            </div>
            
            <p><strong>Note:</strong> This code is valid for the next 10 minutes. If you did not request this verification, please ignore this email or contact our security team.</p>
            
            <p style="margin-top: 32px;">Welcome to the next level of property maintenance.</p>
            <p>Best regards,<br>The Fixr Security Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Fixr Global. All rights reserved.</p>
            <p>Secure Enterprise Property Maintenance Intelligence</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: `[FIXR] Verification Code: ${code}`,
    html,
  });
}
